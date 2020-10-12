const express = require('express');
const router = express.Router();
const helpers = require('../helpers/user-validation');
const QuizSessionSchema = require('../db/models/quiz-session-schema');
const QuizSessionService = require('../services/quiz-session.service')(QuizSessionSchema)

// @ts-check
// Add a new Quiz session
router.post('/create', helpers.validateUser, async function (req, res, next) {
    let {
        ...quizSession
    } = req.body;
    try {
        let response = await QuizSessionService.createQuizSession(quizSession);
        res.json(response);
    } catch (error) {
        next(error);
    }


});

// Start Session Hndler
router.patch('/start/:id',helpers.validateUser,async function(req,res,next){
  let sessionId=req.params.id;
  try{
      let response = await QuizSessionService.startQuizSession(sessionId);
      res.json(response);
  }catch(error){
    next(error)
  }

});

// close Session Handler
router.patch('/close/:id',helpers.validateUser,async function(req,res,next){
  let sessionId=req.params.id;
  try{
      let response = await QuizSessionService.closeQuizSession(sessionId);
      res.json(response);
  }catch(error){
    next(error)
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
    let page = parseInt(req.query.page === undefined ? 0 : req.query.page);
    let limit = parseInt(req.query.limit === undefined ? 10 : req.query.limit);
    let offset=page*limit;
    let fieldToSort = req.query.sort === undefined ? 'createdate':req.query.sort;
    let direction = req.query.direction === undefined ? 'asc' :req.query.direction;
    let options={offset,limit,fieldToSort,direction};

    try {
        let response = await QuizSessionService.getQuizSessionsByCreator(creator,options);
        if (response) {
            res.json(response)
        }
    } catch (error) {
        next(error)
    }
});


  // close a quiz session
router.delete('/delete/:id', helpers.validateUser,  async function (req, res, next) {
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

//TODO: to Schedule update isOpen  with cron jobs by Agenda.js