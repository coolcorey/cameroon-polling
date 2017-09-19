'use strict';
var r = require('rethinkdb');

exports.addChoice = function(args, res, next) {
  /**
   * Add a new choice
   *
   *
   * body Choice Choice object that needs to be added
   * returns Choice
   **/
   delete args.body.value.id
   r.db('cameroon').table('choices').insert([args.body.value]).run(global.connection, function(err, result) {
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

exports.deleteChoice = function(args, res, next) {
  /**
   * Deletes a choice
   *
   *
   * choiceId String Choice id to delete
   * api_key String  (optional)
   * no response value expected for this operation
   **/
   r.db('cameroon').table('choices').get(args.choiceId.value).delete().run(global.connection, function(err, result) {
     if (err) {
       res.end(JSON.stringify(err));
     } else {
       res.setHeader('Content-Type', 'application/json');
       res.end(JSON.stringify(result));
     }
   })
}

exports.getChoicesByPollId = function(args, res, next) {
  r.db('cameroon').table('choices').filter({'pollId': args.pollId.value}).run(global.connection, function(err, result) {
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

exports.getChoiceById = function(args, res, next) {
  /**
   * Find choice by ID
   * Returns a single choice
   *
   * choiceId String ID of choice to return
   * returns Choice
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
   * body Choice Choice object that needs to be updated
   * returns Choice
   **/
   r.db('cameroon').table('choices').update(args.body.value).run(global.connection, function(err, result) {
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
