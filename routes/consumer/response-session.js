const express = require('express');
const router = express.Router();
const QuizSessionSchema = require('../../db/models/quiz-session-schema');
const QuizSessionService = require('../../services/quiz-session.service')(QuizSessionSchema)


router.get('/sessionbycode/:code',async function(req,res,next){
  const code=req.params.code;
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
router.get('/session/:sessionId',async function(req,res,next){
  const sessionId=req.params.sessionId;
  try {
   let response = await QuizSessionService.getFullSessionById(sessionId);
   if (response) {
     return res.json(response);
   }
 } catch (error) {
   next(error);
 }

});

module.exports = router;