const express = require('express');
const router = express.Router();
const ResponseSchema = require('../db/models/response-schema');
const QuizSchema = require('../db/models/quiz-schema');
const SessionSchema = require('../db/models/quiz-session-schema');
const UserSchema = require('../db/models/user-schema');
const StudentSchema = require('../db/models/student-schema');
const helpers = require('../helpers/user-validation');
const ResponseStatService = require('../services/stat/stat-response.service')(ResponseSchema);
const QuizStatService = require('../services/stat/stat-quiz.service')(QuizSchema);
const SessionStatService = require('../services/stat/stat-session.service')(SessionSchema);
const UserStatService = require('../services/stat/stat-user.service')(UserSchema)
const StudentStatService = require('../services/stat/stat-student.service')(StudentSchema)

router.get('/responses', helpers.validateUser, async function (req, res, next) {
    const creatorId = req.body.logged.userid;
    try {
        let response = await ResponseStatService.getAllResponsesByCreator(creatorId);
        res.json(response);
    } catch (error) {
        next(error);
    }
});

router.get('/student/:id', helpers.validateUser, async function (req, res, next) {
    let studentId = req.params.id;
    try {
        let response = await ResponseStatService.getAllResponsesByStudent(studentId);
        res.json(response);
    } catch (error) {
        next(error);
    }
});

router.get('/session/:id', helpers.validateUser, async function (req, res, next) {
    let sessionId = req.params.id;
    try {
        let response = await ResponseStatService.getAllResponsesBySession(sessionId);
        res.json(response);
    } catch (error) {
        next(error);
    }
});

router.get('/session/:sessionid/student/:studentid', helpers.validateUser, async function (req, res, next) {
    let sessionId = req.params.sessionid;
    let studentId = req.params.studentid;
    try {
        let response = await ResponseStatService.getAllResponsesBySessionByStudent(sessionId,studentId);
        res.json(response);
    } catch (error) {
        next(error);
    }
});

router.get('/dashboard', helpers.validateUser, async function (req, res, next) {
    const creatorId = req.body.logged.userid;
    try {
        let tmp = {};
        tmp.allQuizzesCount = await (await QuizStatService.getAllQuizzesCount()).payload;
        tmp.creatorQuizzesCount  = await (await QuizStatService.getQuizzesByCreatorCount(creatorId)).payload;
        tmp.allSessionsCount = await (await SessionStatService.getAllSessionsCount()).payload;
        tmp.creatorSessionsCount  = await (await SessionStatService.getSessionsByCreatorCount(creatorId)).payload;
        tmp.creatorsCount = await (await UserStatService.getCreatorsCount()).payload;
        tmp.allStudentsCount = await(await StudentStatService.getAllStudentsCount()).payload;
        tmp.creatorStudentsCount = await (await StudentStatService.getStudentsByCreatorCount(creatorId)).payload;
        res.json({
            status: "success",
            message: "Get Dashboard successfully",
            payload: tmp
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;