
const SessionSchema = require('../db/models/quiz-session-schema');
const QuizSchema = require('../db/models/quiz-schema');
const Response = require('../db/models/response-schema');

var jwt = require('jsonwebtoken');
var secretKey = require('../config/credentials').secret_key;

module.exports = {
    validateStudent: async function (req, res, next) {
        const session = await SessionSchema.findById(req.body._id).exec();
        if (session.isAnonymous === true) {
            next();
        }

        await jwt.verify(req.headers['x-access-token'], secretKey, function (err, decoded) {
            if (err) {
                res.status(403).json({
                    status: "error",
                    message: err.message,
                    payload: null
                });
            } else {

                req.body.logged = {
                    studentid: decoded.id,
                    loginname: decoded.loginname,
                    gender: decoded.gender,
                    group: decoded.group
                }
                const storedGroupId = session.group._id.toString();
                if (storedGroupId === decoded.group) {
                    next();
                } else {
                    res.status(403).json({
                        status: "error",
                        message: "You are not allowed to this session",
                        payload: null
                    });
                }

            }
        });
    },

    isClosedSession: async function (req, res, next) {
        const session = await SessionSchema.findById(req.body._id).exec();
        if (session.isopen === false) {
            return res.status(403).json({
                status: "error",
                message: "You try to respond to closed session",
                payload: null
            });
        }
            next();
        
    },

    yetAnswred: async function (req, res, next) {
        const exist = await Response.findOne({ $and: [{ sessionId: req.body._id }, { studentId: req.body.logged.studentid }] })
        if (exist) {
            res.status(403).json({
                status: "error",
                message: "You can not respond twice :(",
                payload: null
            })
        }
        else {
           next();
        }
        
    }


}