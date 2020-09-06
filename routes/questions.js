const express = require('express');
const router = express.Router();
const QuizSchema = require('../db/models/quiz-schema');
const QuestionSchema = require('../db/models/question-schema');
const helpers = require('../helpers/user-validation');
const QuestionService = require('../services/question.service')(QuestionSchema);


// @ts-check
// Add a new Question
router.post('/add', helpers.validateUser, async function (req, res, next) {
    let {
        ...question
    } = req.body;
    try {
        let response = await QuestionService.addQuestion(question);
        res.json(response);
    } catch (error) {
        next(error);
    }


});



// get Question by ID 
router.get('/:id', helpers.validateUser,  async function (req, res, next) {
  let questionId=req.params.id;
  try {
      let response = await QuestionService.getQuestionById(questionId);
      if (response) {
          res.json(response)
      }
  } catch (error) {
      next(error)
  }
});

// Get Questions By Creator
router.get('/creator/:userId', helpers.validateUser, async function (req, res, next) {
    let creator = req.params.userId;
    try {
        let response = await QuestionService(QuizSchema).getQuestionsByCreator(creator);
        if (response) {
            res.json(response)
        }
    } catch (error) {
        next(error)
    }
});


// Update a given Quiz
/*
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


*/
  

module.exports = router;