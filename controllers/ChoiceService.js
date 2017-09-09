'use strict';

exports.addChoice = function(args, res, next) {
  /**
   * Add a new choice
   * 
   *
   * body Body_5 Choice object that needs to be added
   * no response value expected for this operation
   **/
  res.end();
}

exports.deleteChoice = function(args, res, next) {
  /**
   * Deletes a choice
   * 
   *
   * choiceId String Choice id to delete
   * api_key String  (optional)
   * no response value expected for this operation
   **/
  res.end();
}

exports.getChoiceById = function(args, res, next) {
  /**
   * Find choice by ID
   * Returns a single choice
   *
   * choiceId String ID of choice to return
   * returns inline_response_200_2
   **/
  var examples = {};
  examples['application/json'] = {
  "questionId" : "aeiou",
  "sources" : [ "aeiou" ],
  "created" : "2000-01-23T04:56:07.000+00:00",
  "pollId" : "aeiou",
  "description" : "aeiou",
  "id" : "aeiou",
  "text" : "aeiou",
  "updated" : "2000-01-23T04:56:07.000+00:00"
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.updateChoice = function(args, res, next) {
  /**
   * Update an existing choice
   * 
   *
   * body Body_4 Choice object that needs to be updated
   * no response value expected for this operation
   **/
  res.end();
}

