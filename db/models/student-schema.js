const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require('./user-schema');
const Group = require('./student-group-schema')

const { boolean } = require("joi");



const StudentSchema = new Schema({
    firstname: {
        type: String,
        required: [true, 'Le Prénom de l\'Apprenant est obligatoire'],
        trim: true
    },
    lastname: {
        type: String,
        required: [true, 'Le Nom de l\'Apprenant est obligatoire'],
        trim: true
    },
    gender: {
        type: String,
        required: true,
        default: 'Homme',
        trim: true
    },
    loginname: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        required:true,
        type: String
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    group:{
        type:Schema.Types.ObjectId,ref:'Group'
    }

}, {
    timestamps: true
});


module.exports = mongoose.model('Student', StudentSchema);

