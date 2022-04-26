const express = require('express')
const router = express.Router();

const jwt = require('jsonwebtoken');
const checkAuth = require('../checkAuth')

const User = require('../models/usersModel')
const UserDetails = require('../models/usersDetailsModel')
const usersBL = require('../BL/usersBl')
const permissions = require('../models/permissionsModel');
const { create } = require('../models/usersModel');

const bcrypt = require('bcrypt');

router.route('/').get(async function(req,resp)
{
    let result = await usersBL.getUsers()
    
    return resp.json(result)
})

router.route('/').post(async function(req,resp)
{   
    let username = req.body.username;
    let password = req.body.password;
    let result = await User.findOne({username: username});
    
    if(!result)
    {
        resp.json({message:"username incorrect", loggedIn: false})
    }
    else{
        const passwordMatch = await bcrypt.compare(
            password,
            result.password
          );
        if(!passwordMatch){
            resp.json({message:"password incorrect", loggedIn: false})
        }
        const token =jwt.sign({
            result:result
        },"yairslonim123",
        {
            expiresIn:"1H"
        })
        resp.json({result,token, loggedIn: true})
    }
})
router.route('/register').post(async function(req,resp)
{   
    let password = req.body.password;
    let username = req.body.username;

        let res = await User.findOne({username: username});
        if(res){
            try{
                const hashedPassword = await bcrypt.hash(password, 10);
                let result = await User.findOneAndUpdate({username: username},{password: hashedPassword });
                resp.status(200).json(result)
            }catch(err){
                console.log(err)
            }
        }
        else{
            resp.json("user doesn't exist")
        } 
    
})


router.route('/userDetails').get(async function(req,resp)
{
    let id = req.headers.id
    try{
        let result = await UserDetails.findById(id);
        resp.json(result)
    }catch(err){
        console.log(err)
    }
    
})

router.route('/usersDetails').get(async function(req,resp)
{
    try{
        let result = await UserDetails.find({})
        return resp.json(result)
    }catch(err)
    {
        console.log(err)
    }
})

router.route('/user/:id?').post(async function(req,resp)
{
    //console.log(req.body.permissions)
    //console.log(req.body.user.username)
    //console.log(req.body.permissions)
    //resp.json(req.headers.id)
    let userdetails = {FirstName:req.body.user.FirstName, LastName:req.body.user.LastName,
        CreateDate:req.body.user.CreateDate ,SessionTimeOut:req.body.user.SessionTimeOut}
    let username = req.body.user.UserName;
    let id = req.params.id;
    try{
        if(id){
            let result =await User.findByIdAndUpdate(id , {username : username})
       
       let result2 =await UserDetails.findByIdAndUpdate(id , 
            {
                FirstName : req.body.user.FirstName,
                LastName : req.body.user.LastName,
                SessionTimeOut : req.body.user.SessionTimeOut 
            })
            let result3 = await permissions.findByIdAndUpdate(id, 
                {
                    permissions : req.body.permissions
                })
                
        resp.json("updated")
        }
        else{
            let result = await User.create({username})
            let result2 = await UserDetails.create({_id:result._id,...userdetails})
            let result3 = await permissions.create({_id:result._id,permissions : req.body.permissions})
            resp.json("added")
        }
       
    }catch(err){
        console.log(err)
        resp.json("failed")
    }
    
})

router.route('/:id').delete( async function(req,resp)
{
    let id = req.params.id
    try{
        let result = await User.findByIdAndDelete(id)
        let result2 = await UserDetails.findByIdAndDelete(id)
        let result3 = await permissions.findByIdAndDelete(id)
    return resp.json("deleted")
    }catch(err)
    {
        console.log(err)
        resp.json("failed")
    }
    
    
});
module.exports = router;