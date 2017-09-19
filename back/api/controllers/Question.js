'use strict';

var url = require('url');

var Question = require('./QuestionService');

module.exports.addQuestion = function addQuestion (req, res, next) {
  Question.addQuestion(req.swagger.params, res, next);
};

module.exports.deleteQuestion = function deleteQuestion (req, res, next) {
  Question.deleteQuestion(req.swagger.params, res, next);
};

module.exports.getQuestionsByPollId = function getQuestionsByPollId (req, res, next) {
  Question.getQuestionsByPollId(req.swagger.params, res, next);
};

module.exports.getQuestionById = function getQuestionById (req, res, next) {
  Question.getQuestionById(req.swagger.params, res, next);
};

module.exports.updateQuestion = function updateQuestion (req, res, next) {
  Question.updateQuestion(req.swagger.params, res, next);
};
