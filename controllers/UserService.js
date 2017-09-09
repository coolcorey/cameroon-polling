'use strict';

exports.createUser = function(args, res, next) {
  /**
   * Create user
   * This can only be done by the logged in user.
   *
   * body Body_8 Created user object
   * no response value expected for this operation
   **/
  res.end();
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

exports.getUserByName = function(args, res, next) {
  /**
   * Get user by user name
   * 
   *
   * username String The name that needs to be fetched. Use user1 for testing. 
   * returns inline_response_200_4
   **/
  var examples = {};
  examples['application/json'] = {
  "firstName" : "aeiou",
  "lastName" : "aeiou",
  "password" : "aeiou",
  "phone" : "aeiou",
  "created" : "2000-01-23T04:56:07.000+00:00",
  "id" : "aeiou",
  "updated" : "2000-01-23T04:56:07.000+00:00",
  "email" : "aeiou",
  "username" : "aeiou"
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
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
   * body Body_9 Updated user object
   * no response value expected for this operation
   **/
  res.end();
}

