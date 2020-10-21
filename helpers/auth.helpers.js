const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = require('../config/credentials').secret_key;


function getToken(user) {
    return jwt.sign({
        id: user._id,
        email: user.email,
        role: user.role,
        isGranted: user.isGranted
    }, secretKey, {
        expiresIn: '365d'
    });
}


/*
* Token generator for student
*/
function getConsumerToken(student) {
    return jwt.sign({
        id: student._id,
        loginname: student.loginname,
        gender: student.gender
    }, secretKey, {
        expiresIn: '1d'
    });
}


function comparePassword(givenPassword, userPassword) {
    return bcrypt.compareSync(givenPassword, userPassword)
}

module.exports={
    getToken:getToken,
    comparePassword:comparePassword,
    getConsumerToken:getConsumerToken
}