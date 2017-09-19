<template>
  <div id="app" class="container">
    <at-menu mode="horizontal" active-Name="1">
      <at-menu-item name="1" v-if="authenticated" class="pull-right"><span v-on:click="logout()"><i class="icon icon-home"></i>Logout</span></at-menu-item>
      <at-menu-item name="2" v-else class="pull-right"><span v-on:click="login()"><i class="icon icon-layers" ></i>Login</span></at-menu-item>
      <at-menu-item name="2" v-if="authenticated" class="pull-right"><span v-on:click="configureUser()"><i class="icon icon-user" ></i>Profile</span></at-menu-item>
      <at-menu-item name="4"><i class="icon icon-settings"></i>Polls</at-menu-item>
    </at-menu>
    <router-view
      class="margin-top"
      :auth="auth"
      :authenticated="authenticated"
    ></router-view>
    <UserRegistration
      :showModal="showUserRegistrationModal"
      :canClose="userRegistrationCanClose"
      :userId="userRegistrationUserId"
      @profileSaved="profileSaved"
    ></UserRegistration>
  </div>
</template>

<script>
import AuthService from './authService.js'
import UserRegistration from '@/components/userRegistration.vue'

const auth = new AuthService()
const { login, logout, authenticated, authNotifier } = auth

export default {
  name: 'app',
  components:{
    UserRegistration
  },
  data(){
    authNotifier.on('authChange', authState => {
      this.authenticated = authState.authenticated
    })
    return {
      auth,
      authenticated,
      showUserRegistrationModal: false,
      userRegistrationCanClose: true,
      userRegistrationUserId: '',

    }
  },
  computed: {
    isLoggedIn() {
      return authenticated
    }
  },
  methods: {
    login,
    logout,
    configureUser: function() {
      this.userRegistrationUserId = this.auth.getUserId();
      this.showUserRegistrationModal = true;
    },
    profileSaved: function(inst) {
      console.log(inst)
      this.showUserRegistrationModal = false;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 10px;
}
.pull-right {
  float: right;
}
.margin-top {
  margin-top: 30px;
}
hr {
	height: 5px;
	border: 0;
	box-shadow: 0 5px 5px -5px #8c8b8b inset;
}
</style>
