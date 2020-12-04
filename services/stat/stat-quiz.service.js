const utils=require('./stat.helpers');

const getQuizzesByCreatorCount = Quiz => async (creatorId) => {
    if (creatorId === undefined) {
        return ({
            status: "error",
            message: "Unable to get the Quizzes count",
            payload: null
        })
    }
    else{
       try {
           let count = await utils.countDocumentsByCreator(Quiz, creatorId);
            if (count){
                return ({
                    status: "success",
                    message: "get all Quizzes Count successfully",
                    payload: count
                })
            }
           
       } catch (error) {
        return ({
            status: "error",
            message: "Unable to get Quizzes Count !",
            payload: error
        })
       }
    }
}

const getAllQuizzesCount = Quiz => async () => {
       try {
           let count = await utils.countAllDocuments(Quiz);
            if (count){
                return ({
                    status: "success",
                    message: "get all Quizzes Count successfully",
                    payload: count
                })
            }
           
       } catch (error) {
        return ({
            status: "error",
            message: "Unable to get Quizzes Count !",
            payload: error
        })
       }
}

module.exports = (Quiz) => {
    return {
        getQuizzesByCreatorCount: getQuizzesByCreatorCount(Quiz),
        getAllQuizzesCount: getAllQuizzesCount(Quiz),
       
    }
}