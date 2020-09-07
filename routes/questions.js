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
        let response = await QuestionService.addQuestion(QuizSchema)(question);
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
        let response = await QuestionService.getQuestionsByCreator(QuizSchema)(creator);
        if (response) {
            res.json(response)
        }
    } catch (error) {
        next(error)
    }
});


// Update a given Question

router.put('/update/:id', helpers.validateUser, async function (req, res, next) {
    let questionId = req.params.id;
    let question = {
      ...req.body
    };
  
    try {
      let response = await QuestionService.updateQuestion(questionId,question);
      if (response) {
        res.json(response);
      }
    } catch (error) {
      next(error);
    }
  });


  // remove a quiz
router.delete('/delete/:id', helpers.validateUser,  async function (req, res, next) {
    let questionId = req.params.id;
    try {
      let response = await QuestionService.removeQuestion(QuizSchema)(questionId, req.body.logged.userid);
      if (response) {
        res.json(response);
      }
    } catch (error) {
      next(error);
    }
  });



  

module.exports = router;