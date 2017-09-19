'use strict';

exports.addQuestion = function(args, res, next) {
  /**
   * Add a new question
   * 
   *
   * body Question Question object that needs to be added
   * no response value expected for this operation
   **/
  res.end();
}

exports.deleteQuestion = function(args, res, next) {
  /**
   * Deletes a question
   * 
   *
   * questionId String Question id to delete
   * api_key String  (optional)
   * no response value expected for this operation
   **/
  res.end();
}

exports.getQuestionById = function(args, res, next) {
  /**
   * Find question by ID
   * Returns a single question
   *
   * questionId String ID of question to return
   * returns Question
   **/
  var examples = {};
  examples['application/json'] = {
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

exports.updateQuestion = function(args, res, next) {
  /**
   * Update an existing question
   * 
   *
   * body Question Question object that needs to be updated
   * no response value expected for this operation
   **/
  res.end();
}

