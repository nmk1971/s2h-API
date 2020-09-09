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

/*
// get all Quizzes
router.get('/', helpers.validateUser, helpers.isAdmin, async function (req, res, next) {
  try {
      let response = await QuizService.getAllQuizzes();
      if (response) {
          res.json(response)
      }
  } catch (error) {
      next(error)
  }
});
// get shared Quizzes
router.get('/shared', helpers.validateUser, async function (req, res, next) {
  try {
      let response = await QuizService.getSharedQuizzes();
      if (response) {
          res.json(response)
      }
  } catch (error) {
      next(error)
  }
});
*/
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

/*
// Update a given Quiz
router.put('/update/:id', helpers.validateUser, async function (req, res, next) {
    let quizId = req.params.id;
    let quiz = {
      ...req.body
    };
  
    try {
      let response = await QuizService.updateQuiz(quizId,quiz);
      if (response) {
        res.json(response);
      }
    } catch (error) {
      next(error);
    }
  });

*/
  // close a quiz session
  //TODO: to delete orpheline question of death Quiz
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