const express = require('express')

const router = express.Router();
const checkAuth = require('../checkAuth')
const permissions = require('../models/permissionsModel')

router.route('/').get(async function(req,resp)
{
    try{
        let result = await permissions.find({})
        return resp.json(result)
    }catch(err)
    {
        console.log(err)
    }
})

router.route('/:id').get(async function(req,resp)
{
    try{
        let result = await permissions.findById(req.params.id)
        return resp.json(result)
    }catch(err)
    {
        console.log(err)
    }
})

module.exports = router;