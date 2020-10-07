const express = require('express');
const router = express.Router();
const GroupSchema = require('../db/models/student-group-schema');
const helpers = require('../helpers/user-validation');
const GroupService = require('../services/group.service')(GroupSchema);
const Student = require('../db/models/student-schema');



// Add a new Group
router.post('/add', helpers.validateUser, async function (req, res, next) {
    let {
        ...group
    } = req.body;
    try {
        let response = await GroupService.addGroup(group);
        res.json(response);
    } catch (error) {
        next(error);
    }


});


// get Group by ID 
router.get('/:id', helpers.validateUser,  async function (req, res, next) {
  let groupId=req.params.id;
  try {
      let response = await GroupService.getGroupById(groupId);
      if (response) {
          res.json(response)
      }
  } catch (error) {
      next(error)
  }
});

// Get Groups By Creator
router.get('/creator/:userId', helpers.validateUser, async function (req, res, next) {
    let creator = req.params.userId;
    try {
        let response = await GroupService.getGroupsByCreator(creator);
        if (response) {
            res.json(response)
        }
    } catch (error) {
        next(error)
    }
});


// Update a given Group
router.patch('/update/:id', helpers.validateUser, async function (req, res, next) {
    let groupId = req.params.id;
    let group = {
      ...req.body
    };
  
    try {
      let response = await GroupService.updateGroup(groupId,group);
      if (response) {
        res.json(response);
      }
    } catch (error) {
      next(error);
    }
  });

  

  // remove a Group
 
router.delete('/delete/:id', helpers.validateUser,  async function (req, res, next) {
    let groupId = req.params.id;
    try {
      let response = await GroupService.removeGroup(Student)(groupId,req.body.logged.userid);
      if (response) {
        res.json(response);
      }
    } catch (error) {
      next(error);
    }
  });

module.exports = router;