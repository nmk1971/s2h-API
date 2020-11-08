function grade(questions) {
    let points = 0;
    questions = questions.map(quest => {
        if ((quest.question_type === 'QCM') || (quest.question_type === 'QCU')) {
            let gr = gradeQcx(quest.qcxResponse, quest.qcxCorrectResponse);
            if (gr === 1) {
                points = points + 1;
                quest.isCorrect = true;
            } else {
                quest.isCorrect = false;
            }
        } else if (quest.question_type === 'INPUT') {

        } else if (quest.question_type === 'ORDERING') {

        }
        return quest;
    });
    return points;
}

function gradeQcx(respArray, correctRespArray) {
    let result = respArray.map(function (resp) {
        let correctResp = correctRespArray.filter(corrResp => corrResp._id.toString() === resp._id)[0];
        if (resp.isValid === correctResp.isValid) {
            return true;
        }
        else {
            return false;
        }
    });
    if (result.some(elem => elem === false)) {
        return 0;
    } else {
        return 1;
    }
}
module.exports = {
    grade: grade,
    gradeQcx, gradeQcx
}