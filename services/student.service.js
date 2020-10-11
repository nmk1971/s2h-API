const addStudent = Student => Group => async (student) => {
    const newStudent = new Student(student);
    const groupId = student.group;
    const groupCreator = (await Group.findById(groupId)).toObject();
    const creatorId= String(groupCreator.owner);

    if (creatorId !== student.creator) {
        return ({
            status: "error",
            message: "You are not allowed to add Student, group conflict",
            payload: newStudent
        })
    }

    try {
        const save = await newStudent.save();
        let group = await Group.findById(groupId);
        group.students.push(save._id);
        group.save();

        if (save) {
            return ({
                status: "success",
                message: "Student added successfully",
                payload: save
            });
        }
    } catch (error) {
        return ({
            status: "error",
            message: "Unable to add new Student",
            payload: error
        })
    }

}



const getStudentById = Student => async (id) => {
    if (id === undefined) {
        return ({
            status: "error",
            message: `Cant't get a Student without id`,
            payload: null
        })
    } else {
        try {
            let student = await Student.findById(id);
            if (student) {
                return ({
                    status: "success",
                    message: "success to get the Student",
                    payload: student
                })
            }
        } catch (error) {
            return ({
                status: "error",
                message: "Unable to get the Student",
                payload: error
            })
        }
    }
}

const getStudentsByCreator = Student => Group => async (creatorId,options) => {
    if (creatorId === undefined) {
        return ({
            status: "error",
            message: `Unable get Students without Creator ref`,
            payload: null
        })
    } else {
        try {
             let sort={};
            sort[options.fieldToSort]=options.direction;
            let totalCount =  await Student.find({ creator: creatorId }).count();
            let students = await Student.find({ creator: creatorId })
                                        .sort(sort)
                                      .skip(options.offset)
                                      .limit(options.limit);
                                      
        
            if (students) {
                return ({
                    status: "success",
                    message: "success to get the user Students",
                    payload: {totalCount:totalCount,
                         items:students}
                    })
            }
        } catch (error) {
            return ({
                status: "error",
                message: "Unable to get the Students",
                payload: error
            })
        }
    }
}

const updateStudent = Student => async (id, student) => {
    if (id === undefined || student === undefined || JSON.stringify(student) === "{}") {
        return ({
            status: "error",
            message: "Unable to update Student",
            payload: null
        })
    }
    //TODO: Verify that the Student belongs to Creator 
    try {
        let updatedStudent = await Student.findByIdAndUpdate(id, student);
        if (updatedStudent) {
            return ({
                status: "success",
                message: "Student updated successfully",
                payload: await Student.findById(id)
            });
        }
    } catch (error) {
        return ({
            status: "error",
            message: "Update Student is failed",
            payload: error
        })
    }
}

const removeStudent = Student => Group => async (studentId, creator) => {
    const concernedStudent = await Student.findById(studentId);
    groupId = concernedStudent.group;
    let concernedGroup = await Group.findById(groupId);
    const actualCreator = concernedGroup.owner;
    if (studentId === undefined) {
        return ({
            status: "error",
            message: "Unable to remove Student",
            payload: null
        });
    };
    if (String(actualCreator) !== creator) {
        return ({
            status: "error",
            message: "Your are not allowed to remove Student",
            payload: null
        });
    }
    else {

        try {
            let student = await Student.deleteOne({
                _id: studentId
            });
            concernedGroup.students = concernedGroup.students.filter(qid => String(qid) !== String(studentId));

            await concernedGroup.save();


            if (student) {
                return ({
                    status: "success",
                    message: `Student removed successfully`,
                    payload: student
                });
            }


        }
        catch (error) {
            return ({
                status: "error",
                message: "Removing Student is failed",
                payload: error
            });
        }
    }
}

/*
* getStudentByGroupId : return an array of students for given groupId
* @param Student
* @param groupId
*/
const getStudentsByGroupId = Student => async (groupId) => {
    if (groupId === undefined) {
        return ({
            status: "error",
            message: `Cant't get Students without group Id`,
            payload: null
        })
    } else {
        try {
            // to append to the find method : .skip(1).limit(1).sort({studentText:'asc'});
            let students = await Student.find({ group: groupId });
            if (students) {
                return ({
                    status: "success",
                    message: "success to get the Students for this Group",
                    payload: students
                })
            }
        } catch (error) {
            return ({
                status: "error",
                message: "Unable to get the Students for this Group",
                payload: error
            })
        }
    }
}

module.exports = (Student) => {
    return {
        addStudent: addStudent(Student),
        getStudentById: getStudentById(Student),
        getStudentsByCreator: getStudentsByCreator(Student),
        updateStudent: updateStudent(Student),
        removeStudent: removeStudent(Student),
        getStudentsByGroupId: getStudentsByGroupId(Student)
    }
}

//TODO: Implement Pagination for retreving all resources