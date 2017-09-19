'use strict';

exports.addAnswer = function(args, res, next) {
  /**
   * Add a new answer
   * 
   *
   * body Answer Answer object that needs to be added
   * no response value expected for this operation
   **/
  res.end();
}

exports.deleteAnswer = function(args, res, next) {
  /**
   * Deletes a answer
   * 
   *
   * answerId String Answer id to delete
   * api_key String  (optional)
   * no response value expected for this operation
   **/
  res.end();
}

exports.getAnswerById = function(args, res, next) {
  /**
   * Find answer by ID
   * Returns a single answer
   *
   * answerId String ID of answer to return
   * returns Answer
   **/
  var examples = {};
  examples['application/json'] = {
  "choiceId" : "aeiou",
  "questionId" : "aeiou",
  "created" : "2000-01-23T04:56:07.000+00:00",
  "pollId" : "aeiou",
  "id" : "aeiou",
  "userId" : "aeiou",
  "updated" : "2000-01-23T04:56:07.000+00:00"
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.updateAnswer = function(args, res, next) {
  /**
   * Update an existing answer
   * 
   *
   * body Answer Answer object that needs to be updated
   * no response value expected for this operation
   **/
  res.end();
}

