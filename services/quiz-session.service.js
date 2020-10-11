const openQuizSession = QuizSession => async (quizSession) => {
    const newQuizSession = new QuizSession(quizSession);
    try {
        let _code=await getCode(QuizSession);
        newQuizSession.quizsessioncode=_code;
        
        const save = await newQuizSession.save();
        if (save) {
            return ({
                status: "success",
                message: "Quiz Session added successfully",
                payload: {code:_code,session:save}
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

const closeQuizSession = QuizSession => async (id) => {

    try {
        let quizSession=await QuizSession.findById(id);
        quizSession.isOpen=false;
        let save = quizSession.save();

         if (save) {
            return ({
                status: "success",
                message: "Quiz session closed successfully",
                payload: save
            })
        }
    } catch (error) {
        return ({
            status: "error",
            message: "Unable to close Quiz Session",
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
            let quizSession = await QuizSession.findById(id);
            if (quizSession) {
                return ({
                    status: "success",
                    message: "success to get the Quiz Session",
                    payload: quiz
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


const getQuizSessionsByCreator = QuizSession => async (creatorId) => {
    if (creatorId === undefined) {
        return ({
            status: "error",
            message: `Unable get Quiz Sessions without Creator ref`,
            payload: null
        })
    } else {
        try {
            let quizSessions = await QuizSession.find({
                creator: creatorId
            });
            if (quizSessions) {
                return ({
                    status: "success",
                    message: "success to get the user Quiz Sessions",
                    payload: quizzes
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
async function getCode(QuizSession){
    let code;
        while (true) {
            code = String(Math.round(Math.random(1) * 1000000));
            let exist=await QuizSession.find({quizsessioncode:code,isopen:true});
console.log(code);
             if ((exist.length===0)&&(code.length===6)) {
                break;
          }
        }    
       return code;     
}

module.exports = (QuizSession) => {
    return {
        openQuizSession: openQuizSession(QuizSession),
        getQuizSessionById: getQuizSessionById(QuizSession),
        getQuizSessionsByCreator: getQuizSessionsByCreator(QuizSession),
        closeQuizSession: closeQuizSession(QuizSession),
    }
}