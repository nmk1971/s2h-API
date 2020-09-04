const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require('./user-schema');
const { boolean } = require("joi");



const QuizSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Le titre du quiez est obligatoire'],
        trim: true
    },
    theme:{
        type:String,
        required:true,
        trim: true
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
        delfault: ''
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
    }

}, {
    timestamps: true
});


module.exports = mongoose.model('Quiz', QuizSchema);