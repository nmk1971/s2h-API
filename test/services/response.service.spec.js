process.env.NODE_ENV = 'test';


const expect = require('chai').expect;
const ObjectId = require('mongoose').Types.ObjectId;


//connect to the files we are testing
const db = require('../../db/index');
const SessionModel = require('../../db/models/quiz-session-schema');
const ResponseModel =  require('../../db/models/response-schema');
const QuestionModel =  require('../../db/models/question-schema');
const ResponseService = require('../../services/response.service')(ResponseModel);

describe.only("Response Service Test suite", () => {
    before((done) => {
        db.connect()
            .then(() => {
                SessionModel.remove();
                ResponseModel.remove();
                QuestionModel.remove();
                done()
            })
            .catch((error) => done(error));
    })

    beforeEach((done) => {
        SessionModel.remove();
        ResponseModel.remove();
        QuestionModel.remove();
        done();
    })

    after((done) => {
        db.close()
            .then(() => {
                SessionModel.remove();
                ResponseModel.remove();
                QuestionModel.remove();
                done();
            })
            .catch((error) => done(error));
    })

    afterEach((done) => {
        SessionModel.remove();
        ResponseModel.remove();
        QuestionModel.remove();
            done()
        }

    )

    it('has a module', () => {
        expect(ResponseService).not.to.be.undefined;
    })

    // Test ResponseService.save()
    describe('ResponseService.save()', () => {
        it('Ok it Response saved when session isOpen and session is anonymous', async () => {
            let actualResponse =  {
                    "isAnonymous": false,
                    "isopen": true,
                    "createdate": "2020-10-14T22:54:35.330Z",
                    "_id": "5f8f523694d2290006f2b3df",
                    "evaluationType": "Evaluation des prérequis",
                    "group": {
                      "_id": "5f7f77fe8ea7e13628844bfc",
                      "label": "3ScExp Lycée Mahdia"
                    },
                    "creator": {
                      "_id": "5f4c01a8084aa596e0a800eb",
                      "fullusername": "Ferid Helali"
                    },
                    "idquiz": {
                      "theme": "Programmation",
                      "_id": "5f873a29510a874748d2e6bc",
                      "title": "Python",
                      "description": "Le langage de Programmation Python",
                      "isShared": false,
                      "creator": "5f4c01a8084aa596e0a800eb",
                      "dateCreated": "2020-10-14T17:49:29.686Z",
                      "cover": "assets/quiz.jpg",
                      "createdAt": "2020-10-14T17:49:29.720Z",
                      "updatedAt": "2020-10-29T10:26:40.713Z",
                      "__v": 25,
                      "questions": [
                        {
                          "_id": "5f873a93510a874748d2e6bd",
                          "quizId": "5f873a29510a874748d2e6bc",
                          "questionText": "Quels sont les modules python prédéfinis?",
                          "question_type": "QCM",
                          "orderingResponse": [],
                          "inputResponse": [],
                          "__v": 0,
                          "qcxResponse": [
                            {
                              "_id": "5f873a93510a874748d2e6be",
                              "label": "turtle",
                              "isValid": false
                            },
                            {
                              "_id": "5f873a93510a874748d2e6bf",
                              "label": "tortle",
                              "isValid": false
                            },
                            {
                              "_id": "5f873a93510a874748d2e6c0",
                              "label": "tortue",
                              "isValid": false
                            },
                            {
                              "_id": "5f873a93510a874748d2e6c1",
                              "label": "math",
                              "isValid": false
                            }
                          ],
                          "previous": null,
                          "next": "5f93396ab2df45000a348997",
                          "previousQuestionType": null,
                          "nextQuestionType": "QCU",
                          "routerLink": "qcm/5f873a93510a874748d2e6bd"
                        },
                        {
                          "_id": "5f93396ab2df45000a348997",
                          "quizId": "5f873a29510a874748d2e6bc",
                          "questionText": "Import should act as :",
                          "question_type": "QCU",
                          "orderingResponse": [],
                          "inputResponse": [],
                          "__v": 0,
                          "qcxResponse": [
                            {
                              "_id": "5f93396ab2df45000a348998",
                              "label": "declare a module",
                              "isValid": false
                            },
                            {
                              "_id": "5f93396ab2df45000a348999",
                              "label": "import a module to the current file",
                              "isValid": false
                            },
                            {
                              "_id": "5f93396ab2df45000a34899a",
                              "label": "import image to a document",
                              "isValid": false
                            }
                          ],
                          "previous": "5f873a93510a874748d2e6bd",
                          "next": "5f943e4fb2df45000a34899b",
                          "previousQuestionType": "QCM",
                          "nextQuestionType": "QCM",
                          "routerLink": "qcu/5f93396ab2df45000a348997"
                        },
                        {
                          "_id": "5f943e4fb2df45000a34899b",
                          "quizId": "5f873a29510a874748d2e6bc",
                          "questionText": "Quelles sont les structures itératives permises par Python",
                          "question_type": "QCM",
                          "orderingResponse": [],
                          "inputResponse": [],
                          "__v": 0,
                          "qcxResponse": [
                            {
                              "_id": "5f943e4fb2df45000a34899c",
                              "label": "for",
                              "isValid": false
                            },
                            {
                              "_id": "5f943e4fb2df45000a34899d",
                              "label": "repeat....until",
                              "isValid": false
                            },
                            {
                              "_id": "5f943e4fb2df45000a34899e",
                              "label": "while",
                              "isValid": false
                            }
                          ],
                          "previous": "5f93396ab2df45000a348997",
                          "next": "5f9720d082c8c100154acff8",
                          "previousQuestionType": "QCU",
                          "nextQuestionType": "QCU",
                          "routerLink": "qcm/5f943e4fb2df45000a34899b"
                        },
                        {
                          "_id": "5f9720d082c8c100154acff8",
                          "quizId": "5f873a29510a874748d2e6bc",
                          "questionText": "How to use math module?",
                          "question_type": "QCU",
                          "orderingResponse": [],
                          "inputResponse": [],
                          "__v": 0,
                          "qcxResponse": [
                            {
                              "_id": "5f9720d082c8c100154acff9",
                              "label": "from math import *",
                              "isValid": false
                            },
                            {
                              "_id": "5f9720d082c8c100154acffa",
                              "label": "using math.*",
                              "isValid": false
                            }
                          ],
                          "previous": "5f943e4fb2df45000a34899b",
                          "next": "5f9a946482c8c100154acffb",
                          "previousQuestionType": "QCM",
                          "nextQuestionType": "QCM",
                          "routerLink": "qcu/5f9720d082c8c100154acff8"
                        },
                        {
                          "_id": "5f9a946482c8c100154acffb",
                          "quizId": "5f873a29510a874748d2e6bc",
                          "questionText": "Question5",
                          "question_type": "QCM",
                          "orderingResponse": [],
                          "inputResponse": [],
                          "__v": 0,
                          "qcxResponse": [
                            {
                              "_id": "5f9a946482c8c100154acffc",
                              "label": "rep1",
                              "isValid": false
                            },
                            {
                              "_id": "5f9a946482c8c100154acffd",
                              "label": "rep2",
                              "isValid": false
                            }
                          ],
                          "previous": "5f9720d082c8c100154acff8",
                          "next": "5f9a947f82c8c100154acffe",
                          "previousQuestionType": "QCU",
                          "nextQuestionType": "QCU",
                          "routerLink": "qcm/5f9a946482c8c100154acffb"
                        },
                        {
                          "_id": "5f9a947f82c8c100154acffe",
                          "quizId": "5f873a29510a874748d2e6bc",
                          "questionText": "Question6",
                          "question_type": "QCU",
                          "orderingResponse": [],
                          "inputResponse": [],
                          "__v": 0,
                          "qcxResponse": [
                            {
                              "_id": "5f9a947f82c8c100154acfff",
                              "label": "rep1",
                              "isValid": false
                            },
                            {
                              "_id": "5f9a947f82c8c100154ad000",
                              "label": "rep2",
                              "isValid": false
                            },
                            {
                              "_id": "5f9a947f82c8c100154ad001",
                              "label": "rep3",
                              "isValid": false
                            }
                          ],
                          "previous": "5f9a946482c8c100154acffb",
                          "next": "5f9a949582c8c100154ad002",
                          "previousQuestionType": "QCM",
                          "nextQuestionType": "QCM",
                          "routerLink": "qcu/5f9a947f82c8c100154acffe"
                        },
                        {
                          "_id": "5f9a949582c8c100154ad002",
                          "quizId": "5f873a29510a874748d2e6bc",
                          "questionText": "Question7",
                          "question_type": "QCM",
                          "orderingResponse": [],
                          "inputResponse": [],
                          "__v": 0,
                          "qcxResponse": [
                            {
                              "_id": "5f9a949582c8c100154ad003",
                              "label": "Rep1",
                              "isValid": false
                            },
                            {
                              "_id": "5f9a949582c8c100154ad004",
                              "label": "rep2",
                              "isValid": false
                            }
                          ],
                          "previous": "5f9a947f82c8c100154acffe",
                          "next": "5f9a94b182c8c100154ad005",
                          "previousQuestionType": "QCU",
                          "nextQuestionType": "QCU",
                          "routerLink": "qcm/5f9a949582c8c100154ad002"
                        },
                        {
                          "_id": "5f9a94b182c8c100154ad005",
                          "quizId": "5f873a29510a874748d2e6bc",
                          "questionText": "Question8",
                          "question_type": "QCU",
                          "orderingResponse": [],
                          "inputResponse": [],
                          "__v": 0,
                          "qcxResponse": [
                            {
                              "_id": "5f9a94b182c8c100154ad006",
                              "label": "rep1",
                              "isValid": false
                            },
                            {
                              "_id": "5f9a94b182c8c100154ad007",
                              "label": "rep2",
                              "isValid": false
                            }
                          ],
                          "previous": "5f9a949582c8c100154ad002",
                          "next": "5f9a94cc82c8c100154ad008",
                          "previousQuestionType": "QCM",
                          "nextQuestionType": "QCM",
                          "routerLink": "qcu/5f9a94b182c8c100154ad005"
                        },
                        {
                          "_id": "5f9a94cc82c8c100154ad008",
                          "quizId": "5f873a29510a874748d2e6bc",
                          "questionText": "Question9",
                          "question_type": "QCM",
                          "orderingResponse": [],
                          "inputResponse": [],
                          "__v": 0,
                          "qcxResponse": [
                            {
                              "_id": "5f9a94cc82c8c100154ad009",
                              "label": "Rep1",
                              "isValid": false
                            },
                            {
                              "_id": "5f9a94cc82c8c100154ad00a",
                              "label": "Rep2",
                              "isValid": false
                            }
                          ],
                          "previous": "5f9a94b182c8c100154ad005",
                          "next": "5f9a94e182c8c100154ad00b",
                          "previousQuestionType": "QCU",
                          "nextQuestionType": "QCU",
                          "routerLink": "qcm/5f9a94cc82c8c100154ad008"
                        },
                        {
                          "_id": "5f9a94e182c8c100154ad00b",
                          "quizId": "5f873a29510a874748d2e6bc",
                          "questionText": "Question10",
                          "question_type": "QCU",
                          "orderingResponse": [],
                          "inputResponse": [],
                          "__v": 0,
                          "qcxResponse": [
                            {
                              "_id": "5f9a94e182c8c100154ad00c",
                              "label": "Rep1",
                              "isValid": false
                            },
                            {
                              "_id": "5f9a94e182c8c100154ad00d",
                              "label": "Rep2",
                              "isValid": false
                            }
                          ],
                          "previous": "5f9a94cc82c8c100154ad008",
                          "next": "5f9a94f182c8c100154ad00e",
                          "previousQuestionType": "QCM",
                          "nextQuestionType": "QCU",
                          "routerLink": "qcu/5f9a94e182c8c100154ad00b"
                        },
                        {
                          "_id": "5f9a94f182c8c100154ad00e",
                          "quizId": "5f873a29510a874748d2e6bc",
                          "questionText": "Question11",
                          "question_type": "QCU",
                          "orderingResponse": [],
                          "inputResponse": [],
                          "__v": 0,
                          "qcxResponse": [
                            {
                              "_id": "5f9a94f182c8c100154ad00f",
                              "label": "Rep1",
                              "isValid": false
                            },
                            {
                              "_id": "5f9a94f182c8c100154ad010",
                              "label": "Rep2",
                              "isValid": false
                            }
                          ],
                          "previous": "5f9a94e182c8c100154ad00b",
                          "next": "5f9a951482c8c100154ad011",
                          "previousQuestionType": "QCU",
                          "nextQuestionType": "QCU",
                          "routerLink": "qcu/5f9a94f182c8c100154ad00e"
                        },
                        {
                          "_id": "5f9a951482c8c100154ad011",
                          "quizId": "5f873a29510a874748d2e6bc",
                          "questionText": "Question12",
                          "question_type": "QCU",
                          "orderingResponse": [],
                          "inputResponse": [],
                          "__v": 0,
                          "qcxResponse": [
                            {
                              "_id": "5f9a951482c8c100154ad012",
                              "label": "Rep1",
                              "isValid": false
                            },
                            {
                              "_id": "5f9a951482c8c100154ad013",
                              "label": "Rep2",
                              "isValid": false
                            },
                            {
                              "_id": "5f9a951482c8c100154ad014",
                              "label": "Rep3",
                              "isValid": false
                            },
                            {
                              "_id": "5f9a951482c8c100154ad015",
                              "label": "Rep4",
                              "isValid": false
                            },
                            {
                              "_id": "5f9a951482c8c100154ad016",
                              "label": "Rep5",
                              "isValid": false
                            }
                          ],
                          "previous": "5f9a94f182c8c100154ad00e",
                          "next": "5f9a954b82c8c100154ad017",
                          "previousQuestionType": "QCU",
                          "nextQuestionType": "QCM",
                          "routerLink": "qcu/5f9a951482c8c100154ad011"
                        },
                        {
                          "_id": "5f9a954b82c8c100154ad017",
                          "quizId": "5f873a29510a874748d2e6bc",
                          "questionText": "Question13",
                          "question_type": "QCM",
                          "orderingResponse": [],
                          "inputResponse": [],
                          "__v": 0,
                          "qcxResponse": [
                            {
                              "_id": "5f9a954b82c8c100154ad018",
                              "label": "Rep1",
                              "isValid": false
                            },
                            {
                              "_id": "5f9a954b82c8c100154ad019",
                              "label": "Rep2",
                              "isValid": false
                            }
                          ],
                          "previous": "5f9a951482c8c100154ad011",
                          "next": "5f9a957082c8c100154ad01a",
                          "previousQuestionType": "QCU",
                          "nextQuestionType": "QCM",
                          "routerLink": "qcm/5f9a954b82c8c100154ad017"
                        },
                        {
                          "_id": "5f9a957082c8c100154ad01a",
                          "quizId": "5f873a29510a874748d2e6bc",
                          "questionText": "Question14",
                          "question_type": "QCM",
                          "orderingResponse": [],
                          "inputResponse": [],
                          "__v": 0,
                          "qcxResponse": [
                            {
                              "_id": "5f9a957082c8c100154ad01b",
                              "label": "Rep1",
                              "isValid": false
                            },
                            {
                              "_id": "5f9a957082c8c100154ad01c",
                              "label": "Rep2",
                              "isValid": false
                            }
                          ],
                          "previous": "5f9a954b82c8c100154ad017",
                          "next": "5f9a958382c8c100154ad01d",
                          "previousQuestionType": "QCM",
                          "nextQuestionType": "QCU",
                          "routerLink": "qcm/5f9a957082c8c100154ad01a"
                        },
                        {
                          "_id": "5f9a958382c8c100154ad01d",
                          "quizId": "5f873a29510a874748d2e6bc",
                          "questionText": "Question15",
                          "question_type": "QCU",
                          "orderingResponse": [],
                          "inputResponse": [],
                          "__v": 0,
                          "qcxResponse": [
                            {
                              "_id": "5f9a958382c8c100154ad01e",
                              "label": "Rep1",
                              "isValid": false
                            },
                            {
                              "_id": "5f9a958382c8c100154ad01f",
                              "label": "Rep2",
                              "isValid": false
                            }
                          ],
                          "previous": "5f9a957082c8c100154ad01a",
                          "next": "5f9a959382c8c100154ad020",
                          "previousQuestionType": "QCM",
                          "nextQuestionType": "QCU",
                          "routerLink": "qcu/5f9a958382c8c100154ad01d"
                        },
                        {
                          "_id": "5f9a959382c8c100154ad020",
                          "quizId": "5f873a29510a874748d2e6bc",
                          "questionText": "Question16",
                          "question_type": "QCU",
                          "orderingResponse": [],
                          "inputResponse": [],
                          "__v": 0,
                          "qcxResponse": [
                            {
                              "_id": "5f9a959382c8c100154ad021",
                              "label": "Rep1",
                              "isValid": false
                            },
                            {
                              "_id": "5f9a959382c8c100154ad022",
                              "label": "Rep2",
                              "isValid": false
                            }
                          ],
                          "previous": "5f9a958382c8c100154ad01d",
                          "next": "5f9a95b682c8c100154ad023",
                          "previousQuestionType": "QCU",
                          "nextQuestionType": "QCM",
                          "routerLink": "qcu/5f9a959382c8c100154ad020"
                        },
                        {
                          "_id": "5f9a95b682c8c100154ad023",
                          "quizId": "5f873a29510a874748d2e6bc",
                          "questionText": "Question17",
                          "question_type": "QCM",
                          "orderingResponse": [],
                          "inputResponse": [],
                          "__v": 0,
                          "qcxResponse": [
                            {
                              "_id": "5f9a95b682c8c100154ad024",
                              "label": "Choix1",
                              "isValid": false
                            },
                            {
                              "_id": "5f9a95b682c8c100154ad025",
                              "label": "choix2",
                              "isValid": false
                            }
                          ],
                          "previous": "5f9a959382c8c100154ad020",
                          "next": "5f9a96d882c8c100154ad026",
                          "previousQuestionType": "QCU",
                          "nextQuestionType": "QCM",
                          "routerLink": "qcm/5f9a95b682c8c100154ad023"
                        },
                        {
                          "_id": "5f9a96d882c8c100154ad026",
                          "quizId": "5f873a29510a874748d2e6bc",
                          "questionText": "Question18",
                          "question_type": "QCM",
                          "orderingResponse": [],
                          "inputResponse": [],
                          "__v": 0,
                          "qcxResponse": [
                            {
                              "_id": "5f9a96d882c8c100154ad027",
                              "label": "rep1",
                              "isValid": false
                            },
                            {
                              "_id": "5f9a96d882c8c100154ad028",
                              "label": "rep2",
                              "isValid": false
                            }
                          ],
                          "previous": "5f9a95b682c8c100154ad023",
                          "next": "5f9a980b82c8c100154ad029",
                          "previousQuestionType": "QCM",
                          "nextQuestionType": "QCM",
                          "routerLink": "qcm/5f9a96d882c8c100154ad026"
                        },
                        {
                          "_id": "5f9a980b82c8c100154ad029",
                          "quizId": "5f873a29510a874748d2e6bc",
                          "questionText": "Question19",
                          "question_type": "QCM",
                          "orderingResponse": [],
                          "inputResponse": [],
                          "__v": 0,
                          "qcxResponse": [
                            {
                              "_id": "5f9a980b82c8c100154ad02a",
                              "label": "rep1",
                              "isValid": false
                            },
                            {
                              "_id": "5f9a980b82c8c100154ad02b",
                              "label": "rep2",
                              "isValid": false
                            }
                          ],
                          "previous": "5f9a96d882c8c100154ad026",
                          "next": "5f9a982282c8c100154ad02c",
                          "previousQuestionType": "QCM",
                          "nextQuestionType": "QCU",
                          "routerLink": "qcm/5f9a980b82c8c100154ad029"
                        },
                        {
                          "_id": "5f9a982282c8c100154ad02c",
                          "quizId": "5f873a29510a874748d2e6bc",
                          "questionText": "Question20",
                          "question_type": "QCU",
                          "orderingResponse": [],
                          "inputResponse": [],
                          "__v": 0,
                          "qcxResponse": [
                            {
                              "_id": "5f9a982282c8c100154ad02d",
                              "label": "choix1",
                              "isValid": false
                            },
                            {
                              "_id": "5f9a982282c8c100154ad02e",
                              "label": "choix2",
                              "isValid": false
                            }
                          ],
                          "previous": "5f9a980b82c8c100154ad029",
                          "next": "5f9a983882c8c100154ad02f",
                          "previousQuestionType": "QCM",
                          "nextQuestionType": "QCM",
                          "routerLink": "qcu/5f9a982282c8c100154ad02c"
                        },
                        {
                          "_id": "5f9a983882c8c100154ad02f",
                          "quizId": "5f873a29510a874748d2e6bc",
                          "questionText": "Question21",
                          "question_type": "QCM",
                          "orderingResponse": [],
                          "inputResponse": [],
                          "__v": 0,
                          "qcxResponse": [
                            {
                              "_id": "5f9a983882c8c100154ad030",
                              "label": "1",
                              "isValid": false
                            },
                            {
                              "_id": "5f9a983882c8c100154ad031",
                              "label": "2",
                              "isValid": false
                            }
                          ],
                          "previous": "5f9a982282c8c100154ad02c",
                          "next": "5f9a986a82c8c100154ad032",
                          "previousQuestionType": "QCU",
                          "nextQuestionType": "QCM",
                          "routerLink": "qcm/5f9a983882c8c100154ad02f"
                        },
                        {
                          "_id": "5f9a986a82c8c100154ad032",
                          "quizId": "5f873a29510a874748d2e6bc",
                          "questionText": "Question22",
                          "question_type": "QCM",
                          "orderingResponse": [],
                          "inputResponse": [],
                          "__v": 0,
                          "qcxResponse": [
                            {
                              "_id": "5f9a986a82c8c100154ad033",
                              "label": "rep1",
                              "isValid": false
                            },
                            {
                              "_id": "5f9a986a82c8c100154ad034",
                              "label": "rep2",
                              "isValid": false
                            }
                          ],
                          "previous": "5f9a983882c8c100154ad02f",
                          "next": "5f9a988f82c8c100154ad035",
                          "previousQuestionType": "QCM",
                          "nextQuestionType": "QCM",
                          "routerLink": "qcm/5f9a986a82c8c100154ad032"
                        },
                        {
                          "_id": "5f9a988f82c8c100154ad035",
                          "quizId": "5f873a29510a874748d2e6bc",
                          "questionText": "Question23",
                          "question_type": "QCM",
                          "orderingResponse": [],
                          "inputResponse": [],
                          "__v": 0,
                          "qcxResponse": [
                            {
                              "_id": "5f9a988f82c8c100154ad036",
                              "label": "re1",
                              "isValid": false
                            },
                            {
                              "_id": "5f9a988f82c8c100154ad037",
                              "label": "re2",
                              "isValid": false
                            }
                          ],
                          "previous": "5f9a986a82c8c100154ad032",
                          "next": "5f9a98c282c8c100154ad03a",
                          "previousQuestionType": "QCM",
                          "nextQuestionType": "QCU",
                          "routerLink": "qcm/5f9a988f82c8c100154ad035"
                        },
                        {
                          "_id": "5f9a98c282c8c100154ad03a",
                          "quizId": "5f873a29510a874748d2e6bc",
                          "questionText": "Question24",
                          "question_type": "QCU",
                          "orderingResponse": [],
                          "inputResponse": [],
                          "__v": 0,
                          "qcxResponse": [
                            {
                              "_id": "5f9a98c282c8c100154ad03b",
                              "label": "1",
                              "isValid": false
                            },
                            {
                              "_id": "5f9a98c282c8c100154ad03c",
                              "label": "2",
                              "isValid": false
                            }
                          ],
                          "previous": "5f9a988f82c8c100154ad035",
                          "next": "5f9a98e082c8c100154ad03d",
                          "previousQuestionType": "QCM",
                          "nextQuestionType": "QCU",
                          "routerLink": "qcu/5f9a98c282c8c100154ad03a"
                        },
                        {
                          "_id": "5f9a98e082c8c100154ad03d",
                          "quizId": "5f873a29510a874748d2e6bc",
                          "questionText": "Question25",
                          "question_type": "QCU",
                          "orderingResponse": [],
                          "inputResponse": [],
                          "__v": 0,
                          "qcxResponse": [
                            {
                              "_id": "5f9a98e082c8c100154ad03e",
                              "label": "oui",
                              "isValid": false
                            },
                            {
                              "_id": "5f9a98e082c8c100154ad03f",
                              "label": "non",
                              "isValid": false
                            }
                          ],
                          "previous": "5f9a98c282c8c100154ad03a",
                          "next": null,
                          "previousQuestionType": "QCU",
                          "nextQuestionType": null,
                          "routerLink": "qcu/5f9a98e082c8c100154ad03d"
                        }
                      ]
                    },
                    "createdAt": "2020-10-20T21:10:14.410Z",
                    "updatedAt": "2020-10-20T21:10:19.942Z",
                    "__v": 0,
                    "quizsessioncode": "228253",
                    "startdate": "2020-10-20T21:10:19.937Z",
                    "studentId": "5f7f77fe8ea7e13628844c02",
                    "student": {
                      "gender": "Homme",
                      "_id": "5f7f77fe8ea7e13628844c02",
                      "group": "5f7f77fe8ea7e13628844bfc",
                      "firstname": "Sami",
                      "lastname": "NASRALLAH",
                      "loginname": "SN007",
                      "creator": "5f4c01a8084aa596e0a800eb",
                      "createdAt": "2020-10-08T20:35:11.210Z",
                      "updatedAt": "2020-10-08T20:35:11.210Z",
                      "__v": 0,
                      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmN2Y3N2ZlOGVhN2UxMzYyODg0NGMwMiIsImxvZ2lubmFtZSI6IlNOMDA3IiwiZ2VuZGVyIjoiSG9tbWUiLCJncm91cCI6IjVmN2Y3N2ZlOGVhN2UxMzYyODg0NGJmYyIsImlhdCI6MTYwNDMxNDIxNSwiZXhwIjoxNjA0NDAwNjE1fQ.VI91eET2VpREOfgxVUDb7XwrMJ4oVNmYLwfRrSfcb2c"
                    },
                    "responseDateTime": "2020-11-02T10:50:21.719Z"
                }
                
            let result = await ResponseService.saveResponse(SessionModel)(QuestionModel)(actualResponse);
          
            expect(result).to.contain.property('status');
            expect(result).to.contain.property('message');
            expect(result).to.contain.property('payload');
            expect(result.status).to.equal('success');
            expect(result.message).to.equal('user registred succssfully!!!');
           console.log(result)

        })

       
    })

})