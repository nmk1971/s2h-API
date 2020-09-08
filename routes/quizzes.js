const express = require('express');
const router = express.Router();
const QuizSchema = require('../db/models/quiz-schema');
const helpers = require('../helpers/user-validation');
const QuizService = require('../services/quiz.service')(QuizSchema);


// @ts-check
// Add a new Quiz
router.post('/add', helpers.validateUser, async function (req, res, next) {
    let {
        ...quiz
    } = req.body;
    try {
        let response = await QuizService.addQuiz(quiz);
        res.json(response);
    } catch (error) {
        next(error);
    }


});


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

// get Quiz by ID 
router.get('/:id', helpers.validateUser,  async function (req, res, next) {
  let quizId=req.params.id;
  try {
      let response = await QuizService.getQuizById(quizId);
      if (response) {
          res.json(response)
      }
  } catch (error) {
      next(error)
  }
});

// Get Quizzes By Creator
router.get('/creator/:userId', helpers.validateUser, async function (req, res, next) {
    let creator = req.params.userId;
    try {
        let response = await QuizService.getQuizzesByCreator(creator);
        if (response) {
            res.json(response)
        }
    } catch (error) {
        next(error)
    }
});


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


  // remove a quiz
  //TODO: to delete orpheline question of death Quiz
router.delete('/delete/:id', helpers.validateUser,  async function (req, res, next) {
    let quizId = req.params.id;
    try {
      let response = await QuizService.removeQuiz(quizId,req.body.logged.userid);
      if (response) {
        res.json(response);
      }
    } catch (error) {
      next(error);
    }
  });



  

module.exports = router;