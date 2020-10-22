const express = require('express');
const router = express.Router();
const StudentSchema = require('../../db/models/student-schema');
const StudentService = require('../../services/student.service')(StudentSchema);
const {validationResult} = require('express-validator');


// POST /authenticate studen as consumer
router.post('/authenticate', async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({
        status: "error",
        message: errors.array(),
        payload: null
      });
    } else {
      try {
        let { loginname,password,groupid } = req.body;
        let result=await StudentService.authenticateStudent(loginname, password,groupid)
        if(result){
            res.json(result);
        }
       
      } catch (error) {
        next(error)
      }
    }
  });


module.exports = router;