const addGroup = Group => async (group) => {
    const newGroup = new Group(group)
    try {
        const save = await newGroup.save();
        if (save) {
            return ({
                status: "success",
                message: "Group added successfully",
                payload: save
            })
        }
    } catch (error) {
        return ({
            status: "error",
            message: "Unable to add new Group",
            payload: error
        })
    }

}

//--------------------------------------
const getGroupById = Group => async (id) => {
    if (id === undefined) {
        return ({
            status: "error",
            message: `Cant't get a Group without id`,
            payload: null
        })
    } else {
        try {
            let group = await Group.findById(id).populate('owner');
            if (group) {
                return ({
                    status: "success",
                    message: "success to get the Group",
                    payload: quiz
                })
            }
        } catch (error) {
            return ({
                status: "error",
                message: "Unable to get the Group",
                payload: error
            })
        }
    }
}


//-------------------------------------
const getGroupsByCreator = Group => async (creatorId) => {
    if (creatorId === undefined) {
        return ({
            status: "error",
            message: `Unable get Groups without Creator ref`,
            payload: null
        })
    } else {
        try {
            let groups = await Group.find({
                owner: creatorId
            }).populate('owner').populate('students');
            if (groups) {
                return ({
                    status: "success",
                    message: "success to get the user Groups",
                    payload: groups
                })
            }
        } catch (error) {
            return ({
                status: "error",
                message: "Unable to get the Groups",
                payload: error
            })
        }
    }
}


//-----------------------------
const updateGroup = Group => async (id, group) => {
    if (id === undefined || group === undefined || JSON.stringify(group) === "{}") {
        return ({
            status: "error",
            message: "Unable to update the Group",
            payload: null
        })
    }
    try {
        let updatedGroup = await Group.findByIdAndUpdate(id, group);
        if (updateGroup) {
            return ({
                status: "success",
                message: "Group updated successfully",
                payload: await Group.findById(id)
            });
        }
    } catch (error) {
        return ({
            status: "error",
            message: "Update Group is failed",
            payload: error
        })
    }
}


//-----------------------------
const removeGroup = Group => Student => async (id,creatorId) => {
    const query=await Group.findById(id);
    const actualCreator=query.owner;
    if (id === undefined) {
        return ({
            status: "error",
            message: "Unable to remove Group",
            payload: null
        })
    } ;
    if(String(actualCreator)!==creatorId){
         return ({
            status: "error",
            message: "Your are not allowed to remove this Group",
            payload: null
        })
    } else{
      
        try {
            let group = await Group.deleteOne({
                _id: id
            });

            let delStudent = await Student.deleteMany({group:id});

            if (group) {
                return ({
                    status: "success",
                    message: `Group removed successfully`,
                    payload: group
                });
            }


        } catch (error) {
            return ({
                status: "error",
                message: "Removing Group is failed",
                payload: error
            })
        }
    }
}


module.exports = (Group) => {
    return {
        addGroup: addGroup(Group),
        getGroupById: getGroupById(Group),
        getGroupsByCreator:getGroupsByCreator(Group),
        updateGroup: updateGroup(Group),
        removeGroup: removeGroup(Group)
        
    }
}