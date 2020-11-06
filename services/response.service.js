
// Save Student Response
const saveResponse = Response => Session => Question => async actualResponse => {
    const sessionIsOpen = await isOpen(Session, actualResponse._id);
    if (sessionIsOpen === false) {
        return ({
            status: "error",
            message: "Sorry, the session was closed",
            payload: null
        })
    }

    let exist = false;
    if (!actualResponse.isAnonymous) {
        exist = await isResponseExist(Response, actualResponse);
    }
    if (exist) {
        return ({
            status: "error",
            message: "Sorry, you can't respond twice",
            payload: null
        })
    }

    let newResponse = new Response(adaptResponse(actualResponse));
    let modifiedResp = await addCorrectResponses(Question, newResponse);
    try {
        let toSave=new Response(modifiedResp);
        const save = await toSave.save();
        if (save) {
            return ({
                status: "success",
                message: "Response saved successfully",
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

module.exports = (Response) => {
    return ({
        saveResponse: saveResponse(Response)
    });
}



function adaptResponse(actualResponse) {
    const newResponse = {};
    newResponse.sessionId = actualResponse._id;
    newResponse.studentId = actualResponse.studentId;
    newResponse.studentFullName = actualResponse.student.firstName + ' ' + actualResponse.student.lastName;
    newResponse.studentGendeer = actualResponse.student.gender;
    newResponse.isAnonymous = actualResponse.isAnonymous;
    newResponse.createdate = actualResponse.createdate;
    newResponse.creatorId = actualResponse.creator._id;
    newResponse.creatorName = actualResponse.creator.fullusername;
    newResponse.evaluationType = actualResponse.evaluationType;
    newResponse.groupId = actualResponse.group._id;
    newResponse.groupLabel = actualResponse.group.label;
    newResponse.idquiz = actualResponse.idquiz;
    newResponse.quizTitle = actualResponse.idquiz.title;
    newResponse.quizDescription = actualResponse.idquiz.description;
    newResponse.responseDateTime = actualResponse.responseDateTime;
    newResponse.startDate = actualResponse.startdate;
    newResponse.questions = [...actualResponse.idquiz.questions];

    return newResponse;

}

async function isResponseExist(Response, actualResponse) {
    const exist = await Response.findOne({ $and: [{ sessionId: actualResponse._id }, { studentId: actualResponse.studentId }] })
    if (exist) {
        return true
    }
    else {
        return false;
    }
}

async function isOpen(Session, sessionId) {
    const result = await Session.findById(sessionId);
    if (result && result.isopen === true) {
        return true;
    } else {
        return false;
    }
}

async function addCorrectResponses(Question, newResponse) {
    let tmpResp = { ...newResponse.toObject() };
    const correctQuestionResponse = await Question.find({ quizId: newResponse.idquiz });
    console.log(tmpResp);
    tmpResp.questions = tmpResp.questions.map( quest => {
        correctQuestionResponse.map(elem => {
            console.log('quest in first map:   ',quest);
            if (elem.id === quest._id) {
               return quest.qcxCorrectResponse = elem.qcxResponse.toObject();
            }
        });
        return quest;
    })
    return tmpResp;
}