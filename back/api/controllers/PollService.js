'use strict';
var r = require('rethinkdb');

var pollLimit = 10;

exports.getPolls = function(args, res, next) {
  let page = args.page.value || 0;
  r.db('cameroon').table('polls').orderBy('created').skip(pollLimit * page).limit(pollLimit).run(global.connection, function(err, result) {
    if (err) {
      res.end(JSON.stringify(err));
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(result))
    }
  })
}

exports.addPoll = function(args, res, next) {
  /**
   * Add a new poll
   *
   *
   * body Poll Poll object that needs to be added
   * returns Poll
   **/

  delete args.body.value.id
  r.db('cameroon').table('polls').insert([args.body.value]).run(global.connection, function(err, result) {
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

exports.deletePoll = function(args, res, next) {
  /**
   * Deletes a poll
   *
   *
   * pollId String Poll id to delete
   * api_key String  (optional)
   * no response value expected for this operation
   **/
   r.db('cameroon').table('polls').get(args.pollId.value).delete().run(global.connection, function(err, result) {
     if (err) {
       res.end(JSON.stringify(err));
     } else {
       res.setHeader('Content-Type', 'application/json');
       res.end(JSON.stringify(result))
     }
   })
}

exports.getFullPollById = function(args, res, next) {
  /**
   * Find full poll by ID
   * Returns a single polls full data
   *
   * pollId String ID of poll to return
   * no response value expected for this operation
   **/
  res.end();
}

exports.getPollById = function(args, res, next) {
  /**
   * Find poll by ID
   * Returns a single poll
   *
   * pollId String ID of poll to return
   * returns Poll
   **/

   r.db('cameroon').table('polls').get(args.pollId.value).run(global.connection, function(err, result) {
     if (err) {
       res.end(JSON.stringify(err));
     } else {
       res.setHeader('Content-Type', 'application/json');
       res.end(JSON.stringify(result))
     }
   })
}

exports.updatePoll = function(args, res, next) {
  /**
   * Update an existing poll
   *
   *
   * body Poll Poll object that needs to be updated
   * returns Poll
   **/
   r.db('cameroon').table('polls').update(args.body.value).run(global.connection, function(err, result) {
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
