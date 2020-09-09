const express = require('express');
const router = express.Router();
const helpers = require('../helpers/user-validation');
const QuizSessionSchema = require('../db/models/quiz-session-schema');
const QuizSessionService = require('../services/quiz-session.service')(QuizSessionSchema)

// @ts-check
// Add a new Quiz session
router.post('/open', helpers.validateUser, async function (req, res, next) {
    let {
        ...quizSession
    } = req.body;
    try {
        let response = await QuizSessionService.openQuizSession(quizSession);
        res.json(response);
    } catch (error) {
        next(error);
    }


});

// get Quiz Session by ID 
router.get('/:id', helpers.validateUser,  async function (req, res, next) {
  let quizSessionId=req.params.id;
  try {
      let response = await QuizSessionService.getQuizSessionById(quizSessionId);
      if (response) {
          res.json(response)
      }
  } catch (error) {
      next(error)
  }
});

// Get Quiz Sessions By Creator
router.get('/creator/:userId', helpers.validateUser, async function (req, res, next) {
    let creator = req.params.userId;
    try {
        let response = await QuizSessionService.getQuizSessionsByCreator(creator);
        if (response) {
            res.json(response)
        }
    } catch (error) {
        next(error)
    }
});


  // close a quiz session
router.delete('/close/:id', helpers.validateUser,  async function (req, res, next) {
    let quizSessionId = req.params.id;
    try {
      let response = await QuizSessionService.closeQuizSession(quizSessionId,req.body.logged.userid);
      if (response) {
        res.json(response);
      }
    } catch (error) {
      next(error);
    }
  });



  

module.exports = router;