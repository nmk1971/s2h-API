const express = require('express');
const router = express.Router();
const GroupSchema = require('../db/models/student-group-schema');
const StudentSchema = require('../db/models/student-schema');
const helpers = require('../helpers/user-validation');
const StudentService = require('../services/student.service')(StudentSchema);


// @ts-check
// Add a new Student
router.post('/add', helpers.validateUser, async function (req, res, next) {
    let {
        ...student
    } = req.body;
//TODO :    student.creator=req.body.decoded.userId;
    try {
        let response = await StudentService.addStudent(GroupSchema)(student);
        res.json(response);
    } catch (error) {
        next(error);
    }


});



// get Student by ID 
router.get('/:id', helpers.validateUser,  async function (req, res, next) {
  let studentId=req.params.id;
  try {
      let response = await StudentService.getStudentById(studentId);
      if (response) {
          res.json(response)
      }
  } catch (error) {
      next(error)
  }
});

// Get Students By Creator
router.get('/creator/:userId', helpers.validateUser, async function (req, res, next) {
    let creator = req.params.userId;
    let page = parseInt(req.query.page === undefined ? 0 : req.query.page);
    let limit = parseInt(req.query.limit === undefined ? 10 : req.query.limit);
    let offset=page*limit;
    let fieldToSort = req.query.sort === undefined ? 'firstname':req.query.sort;
    let direction = req.query.direction === undefined ? 'asc' :req.query.direction;
    let options={offset,limit,fieldToSort,direction};
  
    console.log(options);

    try {
        let response = await StudentService.getStudentsByCreator(GroupSchema)(creator,options);
        if (response) {
            res.json(response)
        }
    } catch (error) {
        next(error)
    }
});


// Update a given Student

router.patch('/update/:id', helpers.validateUser, async function (req, res, next) {
    let studentId = req.params.id;
    let student = {
      ...req.body
    };
 //TODO:    delete student.group
  
    try {
      let response = await StudentService.updateStudent(studentId,student);
      if (response) {
        res.json(response);
      }
    } catch (error) {
      next(error);
    }
  });


  // remove a student
router.delete('/delete/:id', helpers.validateUser,  async function (req, res, next) {
  let studentId = req.params.id;
  try {
    let response = await StudentService.removeStudent(GroupSchema)(studentId, req.body.logged.userid);
    if (response) {
      res.json(response);
    }
  } catch (error) {
    next(error);
  }
});

 // Get Students by GroupId
 router.get('/group/:groupId', helpers.validateUser,  async function (req, res, next) {
  let groupId = req.params.groupId;
  try {
    let response = await StudentService.getStudentsByGroupId(groupId);
    if (response) {
      res.json(response);
    }
  } catch (error) {
    next(error);
  }
});



  

module.exports = router;