const { string, number } = require('joi');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ResponseSchema = new Schema({
    sessionId: {
        type: String,
        required: true
    },
    studentId: {
        type: String
    },
    studentFullName: {
        type: String
    },
    studentGender: {
        type: String
    },
   
    isAnonymous: {
        type: Boolean,
        required: true
    }, 
    
    returnCorrectResponse: {
        type: Boolean,
        required: true
    },
    createdate: {
        type: Date,
        required: true
    },
    creatorId: {
        type: String,
        required: true
    },
    creatorName: {
        type: String,
        required: true
    },
    evaluationType: {
        type: String,
        required: true
    },
    groupId: {
        type: String,
        required: false
    },
    groupLabel: {
        type: String
    },
    idquiz: {
        type: String,
        required: true
    },
    quizTitle: {
        type: String
    },
    quizDescription: {
        type: String,
    },
    questions: [],
    responseDateTime: Date,
    startdate: Date,
    score: Number
})

module.exports = mongoose.model('Response', ResponseSchema);