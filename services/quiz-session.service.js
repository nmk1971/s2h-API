const Group = require('../db/models/quiz-schema');
const Student = require('../db/models/student-schema');

/*
* Create new Session for a given Quiz whith isOpen = false
*/
const createQuizSession = QuizSession => async (quizSession) => {
    if (quizSession.isAnonymous) {
        quizSession.group = null;
    }
    const newQuizSession = new QuizSession(quizSession);
    try {
        const save = await newQuizSession.save();
        if (save) {
            return ({
                status: "success",
                message: "Quiz Session added successfully",
                payload: save
            })
        }
    } catch (error) {
        return ({
            status: "error",
            message: "Unable to add new Quiz Session",
            payload: error
        })
    }

}


/*
* start a given Session for a given Quiz whith isOpen = true
*/
const startQuizSession = QuizSession => async (quizSessionId) => {
    if (!quizSessionId) {
        return ({
            status: "error",
            message: "Unable to start unknown Session",
            payload: 'error'
        })
    }
    let theQuizSession = await QuizSession.findById(quizSessionId);

    if (theQuizSession.startdate !== undefined) {
        return ({
            status: "error",
            message: "Unable to restart closed Session",
            payload: 'Error'
        })
    }
    try {
      
        let code = await getCode(QuizSession);
        theQuizSession.quizsessioncode = code;
        theQuizSession.isopen = true;
        theQuizSession.startdate = new Date();
        const save = await theQuizSession.save();
        if (save) {
            return ({
                status: "success",
                message: "Quiz Session started successfully",
                payload: save
            })
        }
    } catch (error) {
        return ({
            status: "error",
            message: "Unable to start the Quiz Session",
            payload: error
        })
    }

}

/*
* Close a Session for a given Quiz whith isOpen = false
*/
const closeQuizSession = QuizSession => async (quizSessionId) => {
    if (!quizSessionId) {
        return ({
            status: "error",
            message: "Unable to close unknown Session",
            payload: error
        })
    }
    try {

        let theQuizSession = await QuizSession.findById(quizSessionId);
        theQuizSession.isopen = false;
        theQuizSession.closedate = new Date();

        const save = await theQuizSession.save();
        if (save) {
            return ({
                status: "success",
                message: "Quiz Session closed successfully",
                payload: save
            })
        }
    } catch (error) {
        return ({
            status: "error",
            message: "Unable to close the Quiz Session",
            payload: error
        })
    }

}

const getQuizSessionById = QuizSession => async (id) => {
    if (id === undefined) {
        return ({
            status: "error",
            message: `Cant't get a Quiz Session without id`,
            payload: null
        })
    } else {
        try {
            let quizSession = await QuizSession.findById(id)
                .populate('idquiz')
                .populate({
                    path:'group',
                    populate:(
                        {
                            path:'students'
                        })
                    });
            if (quizSession) {
                return ({
                    status: "success",
                    message: "success to get the Quiz Session",
                    payload: quizSession
                })
            }
        } catch (error) {
            return ({
                status: "error",
                message: "Unable to get the Quiz Session",
                payload: error
            })
        }
    }
}

/*
* getQuizSessions for a given Creator ordered by createdate
*/
const getQuizSessionsByCreator = QuizSession => async (creatorId, options) => {
    if (creatorId === undefined) {
        return ({
            status: "error",
            message: `Unable get Quiz Sessions without Creator ref`,
            payload: null
        })
    } else {
        try {
            let sort = {};
            sort[options.fieldToSort] = options.direction;
            let totalCount = await QuizSession.find({ creator: creatorId }).count();
            let quizSessions = await QuizSession.find({ creator: creatorId })
                .sort(sort)
                .skip(options.offset)
                .limit(options.limit).populate('idquiz').populate('group');
            if (quizSessions) {
                return ({
                    status: "success",
                    message: "success to get the user Quiz Sessions",
                    payload: {
                        totalCount: totalCount,
                        items: quizSessions
                    }

                })
            }
        } catch (error) {
            return ({
                status: "error",
                message: "Unable to get the Quiz Sessions",
                payload: error
            })
        }
    }
}


// getCode : get unique code session when open
async function getCode(QuizSession) {
    let code;
    while (true) {
        code = String(Math.round(Math.random(1) * 1000000));
        let exist = await QuizSession.find({ quizsessioncode: code, isopen: true });
        if ((exist.length === 0) && (code.length === 6)) {
            break;
        }
    }
    return code;
}

module.exports = (QuizSession) => {
    return {
        createQuizSession: createQuizSession(QuizSession),
        startQuizSession: startQuizSession(QuizSession),
        closeQuizSession: closeQuizSession(QuizSession),
        getQuizSessionById: getQuizSessionById(QuizSession),
        getQuizSessionsByCreator: getQuizSessionsByCreator(QuizSession)
    }
}