'use strict';

exports.addPoll = function(args, res, next) {
  /**
   * Add a new poll
   * 
   *
   * body Body_1 Poll object that needs to be added
   * no response value expected for this operation
   **/
  res.end();
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
  res.end();
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
   * returns inline_response_200
   **/
  var examples = {};
  examples['application/json'] = {
  "created" : "2000-01-23T04:56:07.000+00:00",
  "id" : "aeiou",
  "title" : "aeiou",
  "updated" : "2000-01-23T04:56:07.000+00:00"
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.updatePoll = function(args, res, next) {
  /**
   * Update an existing poll
   * 
   *
   * body Body Poll object that needs to be updated
   * no response value expected for this operation
   **/
  res.end();
}

