
const SessionSchema = require('../db/models/quiz-session-schema');
const QuizSchema = require('../db/models/quiz-schema');

var jwt = require('jsonwebtoken');
var secretKey = require('../config/credentials').secret_key;
module.exports = {
    validateStudent: async function (req, res, next) {
        const sessionid = req.body.sessionid;
        const session = await SessionSchema.findById(sessionid);
        if (session.isAnonymous === true) {
            next();
        }

        await jwt.verify(req.headers['x-access-token'], secretKey, function (err, decoded) {
            if (err) {
                res.json({
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
                if (session.group === decoded.group) {
                    req.body.session = session;
                    next();
                } else {
                    res.json({
                        status: "error",
                        message: "You are not allowed to this session",
                        payload: null
                    });
                }

            }
        });
    },

    isClosedSession: async function (req, res, next) {
        if (req.body.session.isOpen === false) {
            res.json({
                status: "error",
                message: "You try to respond to closed session",
                payload: null
            });
        }


        next();
    },

    yetAnswred: async function (req, res, next) {

        
    }


}