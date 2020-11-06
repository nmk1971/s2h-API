const { json } = require('express');
const express = require('express');
const router = express.Router();
const ResponseModel = require('../../db/models/response-schema');
const SessionModel = require('../../db/models/quiz-session-schema');
const QuestionModel = require('../../db/models/question-schema');
const ResponseService = require('../../services/response.service')(ResponseModel);
const validations = require('../../helpers/session-response-validation');

const QuizSessionService = require('../../services/quiz-session.service')(SessionModel)


router.get('/sessionbycode/:code', async function (req, res, next) {
  const code = req.params.code;
  try {
    let response = await QuizSessionService.getSessionByCode(code);
    if (response) {
      return res.json(response);
    }
  } catch (error) {
    next(error);
  }

});

//returns session with populated quiz and questions to consumer
router.get('/session/:sessionId', async function (req, res, next) {
  const sessionId = req.params.sessionId;
  try {
    let response = await QuizSessionService.getFullSessionById(sessionId);
    if (response) {
      return res.json(response);
    }
  } catch (error) {
    next(error);
  }

});


router.post('/session/finalresponse', [
  validations.isClosedSession,
  validations.validateStudent,
  validations.yetAnswred
], async function (req, res, next) {
  const sessionResponse = { ...req.body };
  try {
    let s_response = await ResponseService.saveResponse(SessionModel)(QuestionModel)(sessionResponse);
    res.json(s_response);
  } catch (error) {
    next(error);
  }

});
module.exports = router;