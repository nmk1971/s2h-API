const expect = require('chai').expect;
const { grade, gradeQcx } = require('../../helpers/calculate.grade');
const question = {
    'inputResponse': [],
    'next': "5f93396ab2df45000a348997",
    'nextQuestionType': "QCU",
    'orderingResponse': [],
    'previous': null,
    'previousQuestionType': null,
    'qcxCorrectResponse': [
        { _id: "5f873a93510a874748d2e6be", label: "turtle", isValid: true },
        { _id: "5f873a93510a874748d2e6bf", label: "tortle", isValid: false },
        { _id: "5f873a93510a874748d2e6c0", label: "tortue", isValid: false },
        { _id: "5f873a93510a874748d2e6c1", label: "math", isValid: true }
    ],
    'qcxResponse': [
        { _id: "5f873a93510a874748d2e6be", label: "turtle", isValid: true },
        { _id: "5f873a93510a874748d2e6bf", label: "tortle", isValid: false },
        { _id: "5f873a93510a874748d2e6c0", label: "tortue", isValid: false },
        { _id: "5f873a93510a874748d2e6c1", label: "math", isValid: true }
    ],
    'questionText': "Quels sont les modules python prédéfinis?",
    'question_type': "QCM",
    'quizId': "5f873a29510a874748d2e6bc",
    'routerLink': "qcm/5f873a93510a874748d2e6bd",
    '__v': 0,
    '_id': "5f873a93510a874748d2e6bd"
}

describe.only("Test Score Function Helpers", () => {
    it('qcxGrade Should succeed', function () {
        let result = gradeQcx(question.qcxResponse,question.qcxCorrectResponse);
        expect(result).to.equal(1);

    });
    it('qcxGrade Should fail', function () {
        let studentResponse= [
            { _id: "5f873a93510a874748d2e6be", label: "turtle", isValid: true },
            { _id: "5f873a93510a874748d2e6bf", label: "tortle", isValid: true },
            { _id: "5f873a93510a874748d2e6c0", label: "tortue", isValid: false },
            { _id: "5f873a93510a874748d2e6c1", label: "math", isValid: true }
        ];
        let result = gradeQcx(studentResponse,question.qcxCorrectResponse);
        expect(result).to.equal(0);

    });


});