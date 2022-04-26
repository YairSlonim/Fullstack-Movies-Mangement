const express = require('express')

const router = express.Router();
const checkAuth = require('../checkAuth')
const membersBL = require('../BL/MemberBl')

router.get('/',checkAuth,async function(req,resp)
    {
       let moshe = await membersBL.getMembers()
       return resp.json(moshe)
    });
  
    router.route('/:id')
    .get( async function(req,resp)
    {
        let id = req.params.id;
        let moshe = await membersBL.getMember(id)
        return resp.json(moshe)
    });

    router.route('/member/getMemberByName')
    .post( async function(req,resp)
    {
        let name = req.body.name;
        let moshe = await membersBL.getMemberByName(name)
        return resp.json(moshe)
        
    });

    router.route('/')
    .post(async function(req,resp)
    {
        result = await membersBL.addMember(req.body.obj)
        return resp.json(result)
    });

    router.route('/:id')
    .post(function(req,resp)
    {
        
        let id = req.params.id
        membersBL.updateMember(id,req.body.member)
        return resp.json("updated")
    });
  
    router.route('/:id')
    .delete(function(req,resp)
    {
        let id = req.params.id
        membersBL.deleteMember(id)
        return resp.json("deleted")
    });
    
    module.exports = router;
    