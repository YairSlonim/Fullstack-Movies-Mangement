const mongoose = require('mongoose')
//import { Types } from 'mongoose'


let Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

let SubscriptionSchema = new Schema({

    MemberId: ObjectId,
    Movies:[{movieId:ObjectId, date:Date}]
    
     
});

module.exports = mongoose.model('subscriptions',SubscriptionSchema)