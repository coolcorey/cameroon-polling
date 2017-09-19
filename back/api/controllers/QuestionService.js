'use strict';
var r = require('rethinkdb');

exports.addQuestion = function(args, res, next) {
  /**
   * Add a new question
   *
   *
   * body Question Question object that needs to be added
   * returns Question
   **/
   delete args.body.value.id
   r.db('cameroon').table('questions').insert([args.body.value]).run(global.connection, function(err, result) {
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

exports.deleteQuestion = function(args, res, next) {
  /**
   * Deletes a question
   *
   *
   * questionId String Question id to delete
   * api_key String  (optional)
   * no response value expected for this operation
   **/
   r.db('cameroon').table('questions').get(args.questionId.value).delete().run(global.connection, function(err, result) {
     if (err) {
       res.end(JSON.stringify(err));
     } else {
       res.setHeader('Content-Type', 'application/json');
       res.end(JSON.stringify(result))
     }
   })
}

exports.getQuestionsByPollId = function(args, res, next) {
  r.db('cameroon').table('questions').filter({'pollId': args.pollId.value}).run(global.connection, function(err, result) {
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
   * returns Question
   **/
   r.db('cameroon').table('questions').update(args.body.value).run(global.connection, function(err, result) {
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
