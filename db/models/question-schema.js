const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Quiz = require('./quiz-schema');
const { boolean } = require("joi");



const QuestionSchema = new Schema({
    quizId: {
        type: Schema.Types.ObjectId, 
        required: [true, 'Le texte de la question est obligatoire'],
        trim: true,
        ref:'Quiz'
    },
    questionText: {
        type: String,
        required: [true, 'Le texte de la question est obligatoire'],
        trim: true
    },
    question_type:{type:String,required:true}, // Must be in['QCM','QCU','ORDERING','INPUT']
    qcxResponse: [
        {
            label:{type:String},
            isValid:{type:Boolean}
        }
    ],
    orderingResponse:[
        {
            label:{type:String},
            order:{type:Number}
        }
    ],
    inputResponse:[
        {correctAnswer:{type:String,required:true}}
    ]
    
});


module.exports = mongoose.model('Question', QuestionSchema);