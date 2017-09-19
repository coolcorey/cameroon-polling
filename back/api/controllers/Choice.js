'use strict';

var url = require('url');

var Choice = require('./ChoiceService');

module.exports.addChoice = function addChoice (req, res, next) {
  Choice.addChoice(req.swagger.params, res, next);
};

module.exports.deleteChoice = function deleteChoice (req, res, next) {
  Choice.deleteChoice(req.swagger.params, res, next);
};

module.exports.getChoicesByPollId = function getChoicesByPollId (req, res, next) {
  Choice.getChoicesByPollId(req.swagger.params, res, next);
};

module.exports.getChoiceById = function getChoiceById (req, res, next) {
  Choice.getChoiceById(req.swagger.params, res, next);
};

module.exports.updateChoice = function updateChoice (req, res, next) {
  Choice.updateChoice(req.swagger.params, res, next);
};
