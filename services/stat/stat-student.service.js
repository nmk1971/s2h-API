const utils=require('./stat.helpers');

const getStudentsByCreatorCount = Student => async (creatorId) => {
    if (creatorId === undefined) {
        return ({
            status: "error",
            message: "Unable to get the Students count",
            payload: null
        })
    }
    else {
        try {
            let count = await utils.countDocumentsByCreator(Student, creatorId);
            if (count!==undefined) {
                return ({
                    status: "success",
                    message: "get all Students Count successfully",
                    payload: count
                })
            }

        } catch (error) {
            return ({
                status: "error",
                message: "Unable to get Students Count !",
                payload: error
            })
        }
    }
}

const getAllStudentsCount = Student => async () => {

    try {
        let count = await utils.countAllDocuments(Student);
        if (count!==undefined) {
            return ({
                status: "success",
                message: "get all Students Count successfully",
                payload: count
            })
        }

    } catch (error) {
        return ({
            status: "error",
            message: "Unable to get Sessions Count !",
            payload: error
        })
    }

}
module.exports = (Student) => {
    return {
        getAllStudentsCount: getAllStudentsCount(Student),
        getStudentsByCreatorCount: getStudentsByCreatorCount(Student)

    }
}