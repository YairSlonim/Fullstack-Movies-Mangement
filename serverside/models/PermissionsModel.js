const mongoose = require('mongoose')

let Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

let permissionsSchema = new Schema({

    _id: ObjectId,
    permissions: [String]
});

module.exports = mongoose.model('permissions',permissionsSchema)