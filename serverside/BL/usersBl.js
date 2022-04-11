const User = require('../models/usersModel')

exports.getUsers = function()
{
    return new Promise((resolve,reject) => 
        {
            User.find({}, function(err,users)
    {
        if(err)
        {
            reject(err)
        }
        else
        {
            resolve(users)
        }
    })
        })
}