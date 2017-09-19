import auth0 from 'auth0-js'
//import { AUTH_CONFIG } from './auth0-variables'
import EventEmitter from 'EventEmitter'
import router from './router'

var AUTH_CONFIG = {
  clientId: '-O6vPaDfg14Soa0gymp1voJNt2LGpfJx',
  domain: 'cameroonpolling.auth0.com',
  callbackUrl: 'http://localhost:8080/',
  apiUrl: '{API_IDENTIFIER}'
}

export default class AuthService {
  authenticated = this.isAuthenticated()
  authNotifier = new EventEmitter()
  defaultRedirectPath = '/';

  constructor () {
    this.login = this.login.bind(this)
    this.setSession = this.setSession.bind(this)
    this.logout = this.logout.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
  }

  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    audience: `https://${AUTH_CONFIG.domain}/userinfo`,
    responseType: 'token id_token',
    scope: 'openid'
  })

  clearRedirect () {
    localStorage.removeItem('nextRedirect')
  }

  storeRedirect (url) {
    localStorage.setItem('nextRedirect', url)
  }

  login () {
    this.auth0.authorize()
  }

  handleAuthentication () {
    this.auth0.parseHash(window.location.hash, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.auth0.client.userInfo(authResult.accessToken, (err, user) => {
          // Now you have the user's information
          this.setUserProfile(user);
        });
        this.setSession(authResult)
        this.authenticated = this.isAuthenticated();
        router.replace(localStorage.getItem('nextRedirect') || this.defaultRedirectPath)
      } else if (err) {
        router.replace(localStorage.getItem('nextRedirect') || this.defaultRedirectPath)
        console.log(err)
        alert(`Error: ${err.error}. Check the console for further details.`)
      }
    })
  }

  setUserProfile (user) {
    localStorage.setItem('user_profile', JSON.stringify(user))
  }

  setSession (authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    )
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)
    this.authNotifier.emit('authChange', { authenticated: true })
  }

  logout () {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    localStorage.removeItem('user_profile')
    this.userProfile = null
    this.authNotifier.emit('authChange', false)
    this.authenticated = this.isAuthenticated();
    // navigate to the home route
    router.replace('/')
  }

  isAuthenticated () {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }

  getUserId () {
    let profile = JSON.parse(localStorage.getItem('user_profile'))
    return profile.sub;
  }

  getUserProfile () {
    let profile = JSON.parse(localStorage.getItem('user_profile'))
    return profile;
  }
}
