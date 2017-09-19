'use strict';
var r = require('rethinkdb');

exports.createUser = function(args, res, next) {
  /**
   * Create user
   * This can only be done by the logged in user.
   *
   * body User Created user object
   * no response value expected for this operation
   **/
   r.db('cameroon').table('users').insert([args.body.value]).run(global.connection, function(err, result) {
     if (err) {
       res.end(JSON.stringify(err));
     } else {
       res.setHeader('Content-Type', 'application/json');
       res.end();
     }
   })
}

exports.deleteUser = function(args, res, next) {
  /**
   * Delete user
   * This can only be done by the logged in user.
   *
   * username String The name that needs to be deleted
   * no response value expected for this operation
   **/
  res.end();
}

exports.getUserById = function(args, res, next) {
  /**
   * Get user by user name
   *
   *
   * username String The name that needs to be fetched. Use user1 for testing.
   * returns User
   **/
   r.db('cameroon').table('users').get(args.userId.value).run(global.connection, function(err, result) {
     if (err) {
       res.end(JSON.stringify(err));
     } else {
       res.setHeader('Content-Type', 'application/json');
       res.end(JSON.stringify(result))
     }
   })
}

exports.loginUser = function(args, res, next) {
  /**
   * Logs user into the system
   *
   *
   * username String The user name for login
   * password String The password for login in clear text
   * returns String
   **/
  var examples = {};
  examples['application/json'] = "aeiou";
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.logoutUser = function(args, res, next) {
  /**
   * Logs out current logged in user session
   *
   *
   * no response value expected for this operation
   **/
  res.end();
}

exports.updateUser = function(args, res, next) {
  /**
   * Updated user
   * This can only be done by the logged in user.
   *
   * username String name that need to be updated
   * body User Updated user object
   * no response value expected for this operation
   **/
   r.db('cameroon').table('users').update(args.body.value).run(global.connection, function(err, result) {
     if (err) {
       res.end(JSON.stringify(err));
     } else {
       res.setHeader('Content-Type', 'application/json');
       res.end(JSON.stringify({
         id: args.body.value.id
       }))
     }
   })
}
