'use strict';
var r = require('rethinkdb');

exports.getAnswersByUserIdAndPollId = function(args, res, next) {
  r.db('cameroon').table('answers').filter({'pollId': args.pollId.value, 'userId': args.userId.value}).run(global.connection, function(err, result) {
    if (err) {
      res.end(JSON.stringify(err));
    } else {
      res.setHeader('Content-Type', 'application/json');
      result.toArray().then((results) => {
        res.end(JSON.stringify(results))
      })
    }
  })
}

exports.addAnswer = function(args, res, next) {
  /**
   * Add a new answer
   *
   *
   * body Answer Answer object that needs to be added
   * returns Answer
   **/

  delete args.body.value.id
  r.db('cameroon').table('answers').insert([args.body.value]).run(global.connection, function(err, result) {
    if (err) {
      res.end(JSON.stringify(err));
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({
        id: result.generated_keys[0]
      }))
    }
  })
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

exports.getAnswerByQuestionId = function(args, res, next) {
  /**
   * Find answer by question ID
   * Returns answers for a question
   *
   * questionId String ID of question answers to return
   * returns List
   **/
  var examples = {};
  examples['application/json'] = [ {
  "choiceId" : "aeiou",
  "count" : 0
} ];
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
