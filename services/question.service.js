const addQuestion = Question => async (question) => {
    const newQuestion = new Question(question)
    try {
        const save = await newQuestion.save();//TODO: Update Quiz questions array once question added
        if (save) {
            return ({
                status: "success",
                message: "Question added successfully",
                payload: save
            })
        }
    } catch (error) {
        return ({
            status: "error",
            message: "Unable to add new Question",
            payload: error
        })
    }

}



const getQuestionById = Question => async (id) => {
    if (id === undefined) {
        return ({
            status: "error",
            message: `Cant't get a Question without id`,
            payload: null
        })
    } else {
        try {
            let question = await Quiz.findById(id);
            if (question) {
                return ({
                    status: "success",
                    message: "success to get the Question",
                    payload: question
                })
            }
        } catch (error) {
            return ({
                status: "error",
                message: "Unable to get the Question",
                payload: error
            })
        }
    }
}

const getQuestionsByCreator =  Question => Quiz => async (creatorId) => {
    if (creatorId === undefined) {
        return ({
            status: "error",
            message: `Unable get Questions without Creator ref`,
            payload: null
        })
    } else { // TODO: fix problem 500
        try {
            let quizzes = await Quiz.find({creator:creatorId}).populate('questions');
            const questions =[];
            for(let q in quizzes){
                questions.push(q.questions);
            }
            questions=questions.flatMap(x=>x);
        // quizzes.map(q=>q.questions);
            if (questions) {
                return ({
                    status: "success",
                    message: "success to get the user Questions",
                    payload: questions
                })
            }
        } catch (error) {
            return ({
                status: "error",
                message: "Unable to get the Questions",
                payload: error
            })
        }
    }
}

const updateQuestion = Question => async (id, question) => {
    if (id === undefined || question === undefined || JSON.stringify(question) === "{}") {
        return ({
            status: "error",
            message: "Unable to update Question",
            payload: null
        })
    }
    try {
        let updatedQuestion = await Question.findByIdAndUpdate(id, question);
        if (updatedQuestion) {
            return ({
                status: "success",
                message: "Question updated successfully",
                payload: await Question.findById(id)
            });
        }
    } catch (error) {
        return ({
            status: "error",
            message: "Update Question is failed",
            payload: error
        })
    }
}

const removeQuestion = Question => Quiz => async (questionId,quizId,creatorId) => {
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
            message: "Your are not allowed to remove Question",
            payload: null
        })
    } else {
      
        try {
            let question = await Question.deleteOne({
                _id: questionId
            });
            let updatedQuiz=Quiz.findById(quizId);
            updatedQuiz.questions=updatedQuiz.questions.filter(qid=>qid !== questionId);
            await updatedQuiz.save();
            if (question) {
                return ({
                    status: "success",
                    message: `Question removed successfully`,
                    payload: question
                });
            }


        } catch (error) {
            return ({
                status: "error",
                message: "Removing Question is failed",
                payload: error
            })
        }
    }
}


module.exports = (Question) => {
    return {
        addQuestion: addQuestion(Question),
        getQuestionById: getQuestionById(Question),
        getQuestionsByCreator: getQuestionsByCreator(Question),
        updateQuestion: updateQuestion(Question),
        removeQuestion: removeQuestion(Question)
    }
}