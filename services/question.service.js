const addQuestion = Question => Quiz => async (question) => {
    const newQuestion = new Question(question);
    const quizId=question.quizId;

    try {
        const save = await newQuestion.save();
        let quiz=await Quiz.findById(quizId);
        quiz.questions.push(save._id);
        quiz.save();

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
            let question = await Question.findById(id);
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

const getQuestionsByCreator =  Question  => Quiz => async (creatorId) => {
    if (creatorId === undefined) {
        return ({
            status: "error",
            message: `Unable get Questions without Creator ref`,
            payload: null
        })
    } else { 
        try {
            let quizzes = await Quiz.find({creator:creatorId}).populate('questions');
            let questions =[];
            for(let q of quizzes){
                questions.push(q.questions);
            }
            questions=questions.flatMap(x=>x);

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

let removeQuestion = Question => Quiz =>  async (questionId, creator) => {
    const concernedQuestion = await Question.findById(questionId);
    quizId = concernedQuestion.quizId;
    let concernedQuiz = await Quiz.findById(quizId);
    const actualCreator = concernedQuiz.creator;
    if (questionId === undefined) {
        return ({
            status: "error",
            message: "Unable to remove Question",
            payload: null
        });
    };
    if (String(actualCreator) !== creator) {
        return ({
            status: "error",
            message: "Your are not allowed to remove Question",
            payload: null
        });
    }
    else {

        try {
            let question = await Question.deleteOne({
                _id: questionId
            });
            concernedQuiz.questions = concernedQuiz.questions.filter(qid => String(qid) !== String(questionId));
            //console.log(typeof(qid),'    ',typeof(questionId),' ',qid,questionId);
            await concernedQuiz.save();


            if (question) {
                return ({
                    status: "success",
                    message: `Question removed successfully`,
                    payload: question
                });
            }


        }
        catch (error) {
            return ({
                status: "error",
                message: "Removing Question is failed",
                payload: error
            });
        }
    }
}

/*
* getQuestionByQuizId : return an array of questions for given quizId
* @param Question
* @param quizId
*/
const getQuestionsByQuizId = Question => async (quizId) => {
    if (quizId === undefined) {
        return ({
            status: "error",
            message: `Cant't get Questions without quiz Id`,
            payload: null
        })
    } else {
        try {
            let questions = await Question.find({quizId:quizId});
            if (questions) {
                return ({
                    status: "success",
                    message: "success to get the Questions for this Quiz",
                    payload: questions
                })
            }
        } catch (error) {
            return ({
                status: "error",
                message: "Unable to get the Questions for this Quiz",
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
        removeQuestion: removeQuestion(Question),
        getQuestionsByQuizId: getQuestionsByQuizId(Question)
    }
}