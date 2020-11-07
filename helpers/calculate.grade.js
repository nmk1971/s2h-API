module.exports = {
    grade: function grade(questions) {
        let points = 0;
        questions.map(quest => {
            if ((quest.questionType === 'QCM') || (quest.questionType === 'QCU')) {
                points = points + gradeQcx(quest.qcxResponse, quest.qcxCorrectResponse);
            } else if (quest.questionType === 'INPUT') {

            } else if (quest.questionType === 'ORDERING') {

            }
        })
    },

    gradeQcx: function gradeQcx(respArray, correctRespArray) {
        let result = respArray.map(function (resp) {
            if (resp.isValid === correctRespArray.filter(corrResp => corrResp._id === resp._id)[0].isValid) {
                return true;
            }
            else {
                return false;
            }
        }); 
        if (result.some(elem=>elem===false)){
            return 0;
        }else{
            return 1;
        }
    }
}