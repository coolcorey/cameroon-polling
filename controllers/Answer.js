'use strict';

var url = require('url');

var Answer = require('./AnswerService');

module.exports.addAnswer = function addAnswer (req, res, next) {
  Answer.addAnswer(req.swagger.params, res, next);
};

module.exports.deleteAnswer = function deleteAnswer (req, res, next) {
  Answer.deleteAnswer(req.swagger.params, res, next);
};

module.exports.getAnswerById = function getAnswerById (req, res, next) {
  Answer.getAnswerById(req.swagger.params, res, next);
};

module.exports.updateAnswer = function updateAnswer (req, res, next) {
  Answer.updateAnswer(req.swagger.params, res, next);
};
