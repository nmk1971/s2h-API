const utils=require('./stat.helpers');

const getCreatorsCount = User => async () => {

        try {
            let count = await utils.countAllDocuments(User);
            if (count!==undefined) {
                return ({
                    status: "success",
                    message: "get creators Count successfully",
                    payload: count
                })
            }

        } catch (error) {
            return ({
                status: "error",
                message: "Unable to get creators Count !",
                payload: error
            })
        }
    }



module.exports = (User) => {
    return {
        getCreatorsCount: getCreatorsCount(User),
    }
}