const { grade } = require('../helpers/calculate.grade');
// Save Student Response
const saveResponse = Response => Session => Question => async actualResponse => {

    let newResponse = new Response(adaptResponse(actualResponse));
    let modifiedResp = await addCorrectResponses(Question, newResponse);
    modifiedResp.score = grade(modifiedResp.questions) / modifiedResp.questions.length;
    try {
        let toSave = new Response(modifiedResp);
        const save = await toSave.save();
        if (save) {
            if (save.returnCorrectResponse === false) {
                return ({
                    status: "success",
                    message: "Response saved successfully",
                    payload: save.score
                })
            } else {
                return ({
                    status: "success",
                    message: "Response saved successfully",
                    payload: save
                })
            }
        }
    } catch (error) {
        return ({
            status: "error",
            message: "Unable to save your response",
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
    if (actualResponse.hasOwnProperty('studentId')) {
        newResponse.studentId = actualResponse.studentId;
        newResponse.studentFullName = actualResponse.student.firstname + ' ' + actualResponse.student.lastname;
        newResponse.studentGendeer = actualResponse.student.gender;
        newResponse.groupId = actualResponse.group._id;
        newResponse.groupLabel = actualResponse.group.label;
    }
    newResponse.isAnonymous = actualResponse.isAnonymous;
    newResponse.returnCorrectResponse = actualResponse.returnCorrectResponse;
    newResponse.createdate = actualResponse.createdate;
    newResponse.creatorId = actualResponse.creator._id;
    newResponse.creatorName = actualResponse.creator.fullusername;
    newResponse.evaluationType = actualResponse.evaluationType;
    newResponse.idquiz = actualResponse.idquiz;
    newResponse.quizTitle = actualResponse.idquiz.title;
    newResponse.quizDescription = actualResponse.idquiz.description;
    newResponse.responseDateTime = actualResponse.responseDateTime;
    newResponse.startDate = actualResponse.startdate;
    newResponse.questions = [...actualResponse.idquiz.questions];

    return newResponse;

}


async function addCorrectResponses(Question, newResponse) {
    let tmpResp = { ...newResponse.toObject() };
    const correctQuestionResponse = await Question.find({ quizId: newResponse.idquiz });

    tmpResp.questions = tmpResp.questions.map(quest => {
        correctQuestionResponse.map(elem => {

            if (elem.id === quest._id) {
                return quest.qcxCorrectResponse = elem.qcxResponse.toObject();
            }
        });
        return quest;
    })
    return tmpResp;
}

