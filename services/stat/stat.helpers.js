/*
* To count all documents in Session, Student, Quiz, Creator (Mongoose Model)
*/
async function countAllDocuments(Model) {
    let cpt = 0;
    await Model.countDocuments({}, (err, count) => {
        cpt = count;
    });
    return cpt;
}

/*
* To count documents in Session, Student, Quiz filtered by Creator ._id (Mongoose Model)
*/
async function countDocumentsByCreator(Model, creatorId) {
    let cpt = 0;
    await Model.countDocuments({creator : creatorId}, (err, count) => {
        cpt = count;
    });
    return cpt;
}


module.exports={
    countAllDocuments:countAllDocuments,
    countDocumentsByCreator:countDocumentsByCreator
}