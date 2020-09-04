const addQuiz = Quiz => async (quiz) => {
    const newQuiz = new Quiz(quiz)
    try {
        const save = await newQuiz.save();
        if (save) {
            return ({
                status: "success",
                message: "Quiz added successfully",
                payload: save
            })
        }
    } catch (error) {
        return ({
            status: "error",
            message: "Unable to add new Quiz",
            payload: error
        })
    }

}

const getAllQuizzes = Quiz => async () => {
    try {
        let quizzes = await Quiz.find({})
            .populate({
                path: 'creator'
            });

        if (quizzes) {
            return ({
                status: "success",
                message: "Get All Quizzes",
                payload: quizzes
            })
        }
    } catch (error) {
        return ({
            status: "error",
            message: "Unable to get all Quizzes",
            payload: error
        })
    }
}
const getSharedQuizzes = Quiz => async () => {
    try {
        let quizzes = await Quiz.find({isShared:true})
            .populate({
                path: 'creator'
            });

        if (quizzes) {
            return ({
                status: "success",
                message: "Get Shared Quizzes",
                payload: quizzes
            })
        }
    } catch (error) {
        return ({
            status: "error",
            message: "Unable to get Shared Quizzes",
            payload: error
        })
    }
}

const getQuizById = Quiz => async (id) => {
    if (id === undefined) {
        return ({
            status: "error",
            message: `Cant't get a Quiz without id`,
            payload: null
        })
    } else {
        try {
            let quiz = await Quiz.findById(id).populate('creator');
            if (quiz) {
                return ({
                    status: "success",
                    message: "success to get the Quiz",
                    payload: quiz
                })
            }
        } catch (error) {
            return ({
                status: "error",
                message: "Unable to get the Quiz",
                payload: error
            })
        }
    }
}

const getQuizzesByCreator = Quiz => async (creatorId) => {
    if (creatorId === undefined) {
        return ({
            status: "error",
            message: `Unable get Quizzes without Creator ref`,
            payload: null
        })
    } else {
        try {
            let quizzes = await Quiz.find({
                creator: creatorId
            }).populate('creator');
            if (quizzes) {
                return ({
                    status: "success",
                    message: "success to get the user Quizzes",
                    payload: quizzes
                })
            }
        } catch (error) {
            return ({
                status: "error",
                message: "Unable to get the Quizzes",
                payload: error
            })
        }
    }
}

const updateQuiz = Quiz => async (id, quiz) => {
    if (id === undefined || quiz === undefined || JSON.stringify(quiz) === "{}") {
        return ({
            status: "error",
            message: "Unable to update Quiz",
            payload: null
        })
    }
    try {
        let updatedQuiz = await Quiz.findByIdAndUpdate(id, quiz);
        if (updatedQuiz) {
            return ({
                status: "success",
                message: "Quiz updated successfully",
                payload: await Quiz.findById(id)
            });
        }
    } catch (error) {
        return ({
            status: "error",
            message: "Update Quiz is failed",
            payload: error
        })
    }
}

const removeQuiz = Quiz => async (id,creator) => {
    const query=await Quiz.findById(id);
    const actualCreator=query.creator;
    if (id === undefined) {
        return ({
            status: "error",
            message: "Unable to remove Quiz",
            payload: null
        })
    } ;
    if(String(actualCreator)!==creator){
         return ({
            status: "error",
            message: "Your are not allowed to remove Quiz",
            payload: null
        })
    } else{
      
        try {
            let quiz = await Quiz.deleteOne({
                _id: id
            });
            if (quiz) {
                return ({
                    status: "success",
                    message: `Quiz removed successfully`,
                    payload: quiz
                });
            }


        } catch (error) {
            return ({
                status: "error",
                message: "Removing Quiz is failed",
                payload: error
            })
        }
    }
}


module.exports = (Quiz) => {
    return {
        addQuiz: addQuiz(Quiz),
        getAllQuizzes: getAllQuizzes(Quiz),
        getQuizById: getQuizById(Quiz),
        getQuizzesByCreator: getQuizzesByCreator(Quiz),
        updateQuiz: updateQuiz(Quiz),
        removeQuiz: removeQuiz(Quiz),
        getSharedQuizzes:getSharedQuizzes(Quiz)
    }
}