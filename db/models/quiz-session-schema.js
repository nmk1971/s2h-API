const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Quiz = require('./quiz-schema');
const User = require('./user-schema');
const Group = require('./student-group-schema')
const { boolean } = require("joi");




const QuizSessionSchema = new Schema({
    idquiz: {
        type: Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true,
        trim: true
    },
    
    evaluationType: {
        type: String,
        required : true,
        trim: true
    },

    isAnonymous: {
        type: Boolean,
        required: true,
        default: true
    },
    
    returnCorrectResponse: {
        type: Boolean,
        required: true,
        default: true
    },

    group: {
        type: Schema.Types.ObjectId,
        ref: "Group",
        required: false
    },

    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    quizsessioncode: {
        type: String,
        trim: true
    },

    isopen: {
        type: Boolean,
        required: true,
        default: false
    },

    createdate: {
        type: Date,
        required: true,
        default : Date.now()
    },

   startdate: {
        type: Date
    },
    
    closedate: {
        type: Date
    }
}, {
    timestamps: true
});




module.exports = mongoose.model('QuizSession', QuizSessionSchema);