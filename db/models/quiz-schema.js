const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require('./user-schema');
const Question = require('./question-schema');
const { boolean } = require("joi");



const QuizSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Le titre du quiz est obligatoire'],
        trim: true
    },
    theme:{
        type:String,
        required:true,
        trim: true,
        default:'Général'
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    dateCreated: {
        type: Date,
        required: true,
        trim: true
    },
    cover: {
        required:false,
        type: String,
        delfault: 'assets/quiz.jpg'
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    isShared: {
        required:true,
        type: Boolean,
        delfault: false
    },
    questions:[{type:Schema.Types.ObjectId,ref:'Question'}]

}, {
    timestamps: true
});


module.exports = mongoose.model('Quiz', QuizSchema);