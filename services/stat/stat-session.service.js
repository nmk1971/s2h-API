const utils=require('./stat.helpers');

const getSessionsByCreatorCount = Session => async (creatorId) => {
    if (creatorId === undefined) {
        return ({
            status: "error",
            message: "Unable to get the Sessions count",
            payload: null
        })
    }
    else {
        try {
            let count = await utils.countDocumentsByCreator(Session, creatorId);
            if (count!==undefined) {
                return ({
                    status: "success",
                    message: "get all Sessions Count successfully",
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
}

const getAllSessionsCount = Session => async () => {

    try {
        let count = await utils.countAllDocuments(Session);
            if (count!==undefined) {
            return ({
                status: "success",
                message: "get all Sessions Count successfully",
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
module.exports = (Session) => {
    return {
        getAllSessionsCount: getAllSessionsCount(Session),
        getSessionsByCreatorCount: getSessionsByCreatorCount(Session)

    }
}

