const getConsumerToken = require('../helpers/auth.helpers').getConsumerToken;

const addStudent = Student => Group => async (student) => {
    const newStudent = new Student(student);
    const groupId = student.group;
    const groupCreator = (await Group.findById(groupId)).toObject();
    const creatorId = String(groupCreator.owner);
    const credential = generateStudentCredential(student.firstname, student.lastname);
    newStudent.loginname = credential.login;
    newStudent.password = credential.password;
    
    if (creatorId !== student.creator) {
        return ({
            status: "error",
            message: "You are not allowed to add Student, group conflict",
            payload: "error"
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

const getStudentsByCreator = Student => Group => async (creatorId, options) => {
    if (creatorId === undefined) {
        return ({
            status: "error",
            message: `Unable get Students without Creator ref`,
            payload: null
        })
    } else {
        try {
            let sort = {};
            sort[options.fieldToSort] = options.direction;
            let totalCount = await Student.find({ creator: creatorId }).count();
            let students = await Student.find({ creator: creatorId })
                .populate('group', 'label')
                .sort(sort)
                .skip(options.offset)
                .limit(options.limit);


            if (students) {
                return ({
                    status: "success",
                    message: "success to get the user Students",
                    payload: {
                        totalCount: totalCount,
                        items: students
                    }
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


/*
* Student Authentication
*/
const authenticateStudent = Student => async (loginname,password, groupid) => {
    if (!loginname || !password || !groupid) {
        return ({
            status: "error",
            message: "can't authenticate without credential or wrong Group",
            payload: null
        })
    }

    try {
        const student = await Student.findOne({$and:[{loginname: loginname},{password:password}, {group:groupid}]});

        if (student) {
            const token = getConsumerToken(student);
            return ({
                status: "success",
                message: "user authenticated succssfully!!!",
                payload: {
                    user: student.toJSON(),
                    token: token
                }
            });
        } else {
            return ({
                status: "error",
                message: "Invalid login or password!!!",
                payload: null
            })
        }
    } catch (error) {
        return ({
            status: "error",
            message: "user can't authenticate",
            payload: null
        });
    }
}

module.exports = (Student) => {
    return {
        addStudent: addStudent(Student),
        getStudentById: getStudentById(Student),
        getStudentsByCreator: getStudentsByCreator(Student),
        updateStudent: updateStudent(Student),
        removeStudent: removeStudent(Student),
        getStudentsByGroupId: getStudentsByGroupId(Student),
        authenticateStudent:authenticateStudent(Student)
    }
}

function generateStudentCredential(firstname, lastname) {
    if (
        (firstname === undefined) || (lastname === undefined)
        || (firstname === '') || (lastname === '')
    ) {
        return ({ login: null, password: null })
    }
    const char1 = firstname[0].toUpperCase();
    const char2 = lastname[0].toUpperCase();

    let code;
    while (true) {
        code = String(Math.round(Math.random(1) * 1000));
        if (code.length === 3) {
            break;
        }
    }
    login = char1+char2+code;
    const chars='0123456789'+'abcdefghigklmnopqrstuvwxyz'+'abcdefghigklmnopqrstuvwxyz'.toUpperCase();
    let password = '';
    for (var i=0; i<6 ; i++){
        password += chars[Math.round(Math.random(1) * (chars.length - 1))];
    }
    return ({login : login, password : password});
}

//TODO: Implement Pagination for retreving all resources