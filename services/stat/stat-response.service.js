const getAllResponsesByCreator = Response => async (creatorId) => {
    if (creatorId === undefined) {
        return ({
            status: "error",
            message: "Unable to get Responses",
            payload: null
        })
    }
    else{
       try {
           const result = await Response.find({creatorId:creatorId}).exec();
           let tmp =[...result];
           tmp = tmp.map(r=>{
               let tmpR = r.toObject();
               delete tmpR.questions;
               return tmpR;
            }
               );

            if (result){
                return ({
                    status: "success",
                    message: "get all Responses successfully",
                    payload: tmp
                })
            }
           
       } catch (error) {
        return ({
            status: "error",
            message: "Unable to get Responses !",
            payload: error
        })
       }
    }
}

const getAllResponsesByStudent = Response => async (studentId) => {
    if (studentId === undefined) {
        return ({
            status: "error",
            message: "Unable to get Responses",
            payload: null
        })
    }
    else{
       try {
           const result = await Response.find({studentId:studentId}).exec();
           let tmp =[...result];
           tmp = tmp.map(r=>{
               let tmpR = r.toObject();
               delete tmpR.questions;
               return tmpR;
            }
               );

            if (result){
                return ({
                    status: "success",
                    message: "get Student Responses successfully",
                    payload: tmp
                })
            }
           
       } catch (error) {
        return ({
            status: "error",
            message: "Unable to get Responses !",
            payload: error
        })
       }
    }
}

const getAllResponsesBySession = Response => async (sessionId) => {
    if (sessionId === undefined) {
        return ({
            status: "error",
            message: "Unable to get Responses",
            payload: null
        })
    }
    else{
       try {
           const result = await Response.find({sessionId:sessionId}).exec();
            if (result){
                return ({
                    status: "success",
                    message: "get Session Responses successfully",
                    payload: result
                })
            }
           
       } catch (error) {
        return ({
            status: "error",
            message: "Unable to get Responses !",
            payload: error
        })
       }
    }
}

const getAllResponsesBySessionByStudent = Response => async (sessionId, studentId) => {
    if (sessionId === undefined || studentId === undefined) {
        return ({
            status: "error",
            message: "Unable to get Responses",
            payload: null
        })
    }
    else{
       try {
           const result = await Response.find({sessionId:sessionId, studentId:studentId}).exec();
            if (result){
                return ({
                    status: "success",
                    message: "get Session Responses successfully",
                    payload: result
                })
            }
           
       } catch (error) {
        return ({
            status: "error",
            message: "Unable to get Responses !",
            payload: error
        })
       }
    }
}

module.exports = (Response) => {
    return {
        getAllResponsesByCreator: getAllResponsesByCreator(Response),
        getAllResponsesByStudent: getAllResponsesByStudent(Response),
        getAllResponsesBySession: getAllResponsesBySession(Response),
        getAllResponsesBySessionByStudent: getAllResponsesBySessionByStudent(Response)
        
    }
}