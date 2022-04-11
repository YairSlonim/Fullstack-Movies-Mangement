const mongoose = require('mongoose')


let Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

let userSchema = new Schema({

    _id: ObjectId,
    FirstName: String,
    LastName: String,
    CreateDate: Date,
    SessionTimeOut: Number
});

module.exports = mongoose.model('usersdetails',userSchema)