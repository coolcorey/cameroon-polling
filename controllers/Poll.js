'use strict';

var url = require('url');

var Poll = require('./PollService');

module.exports.addPoll = function addPoll (req, res, next) {
  Poll.addPoll(req.swagger.params, res, next);
};

module.exports.deletePoll = function deletePoll (req, res, next) {
  Poll.deletePoll(req.swagger.params, res, next);
};

module.exports.getFullPollById = function getFullPollById (req, res, next) {
  Poll.getFullPollById(req.swagger.params, res, next);
};

module.exports.getPollById = function getPollById (req, res, next) {
  Poll.getPollById(req.swagger.params, res, next);
};

module.exports.updatePoll = function updatePoll (req, res, next) {
  Poll.updatePoll(req.swagger.params, res, next);
};
