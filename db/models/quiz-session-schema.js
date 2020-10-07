const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Quiz = require('./quiz-schema');
const User = require('./user-schema');
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
        trim: true
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
        default: true
    },

    opendate: {
        type: Date,
        required: true
    },

    closedate: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

/*

QuizSessionSchema.pre('save', async function (next) {
    //if (!this.isModified('quizsessioncode')) {
     //  next();
    //}
    var code;
     while (true) {
        code = String(Math.round(Math.random(1) * 1000000));
        console.log("Code1 : ",code);
      if ( !isExist(code)) {
            break;
      }
    }
    console.log(code);
    this.quizsessioncode = code;

    next();

});
*/



module.exports = mongoose.model('QuizSession', QuizSessionSchema);