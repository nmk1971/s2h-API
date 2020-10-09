const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require('./user-schema');

const { boolean } = require("joi");



const GroupSchema = new Schema({
    label: {
        type: String,
        required: [true, 'Le nom du groupe est obligatoire'],
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    owner: {
        type:Schema.Types.ObjectId,ref:'User',
        required: [true, 'le Createur du groupe est obligatoire'],
        trim: true
    },
    students:[{type:Schema.Types.ObjectId,ref:'Student'}]

}, {
    timestamps: true
});


module.exports = mongoose.model('Group', GroupSchema);