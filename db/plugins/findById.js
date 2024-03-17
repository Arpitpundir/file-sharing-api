const mongoose = require('mongoose');
function findById(_id, fieldsToPopulate, fieldsToSelect, lean = true){
    // this will return a query object which can be chained
    let query = this.findOne({
        _id: new mongoose.Types.ObjectId(_id);
    });

    // what happens when we call await
    // query chaining

    if(fieldsToPopulate){
        query.populate(fieldsToPopulate);
    }

    if(fieldsToSelect){
        query.fieldsToSelect(fieldsToSelect);
    }

    if(lean){
        query.lean();
    }

    return query.exec()
}