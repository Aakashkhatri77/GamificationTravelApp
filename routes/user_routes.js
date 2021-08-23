const express = require('express');
const {check, validationResult} = require('express-validator')
const router = express.Router();
const User = require('../models/user_models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register',[
    check('firstname', "firstname is required!!").not().isEmpty(),
    check('lastname', "lastname is required!!").not().isEmpty(),
    check('email', "Email is required!!").not().isEmpty(),
    check('email', "Invalid email!!").isEmail(),
    check('username', "Username is required!!").not().isEmpty(),
    check('password', "Password is required!!").not().isEmpty()
], function (req,res){

    const errors = validationResult(req);
    if(errors.isEmpty()){
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const email = req.body.email;
        const username = req.body.username;
        const password = req.body.password;
    
        bcryptjs.hash(password, 10, function(err,hash){
            const data = new User({firstname:firstname, lastname:lastname, email:email, username:username, password:hash})
        // console.log(data)
        data.save()
    
        .then(function(result){
            //success message with status code
            res.status(201).json({message: "User account registered!!", data:result, success : true})
        })
        .catch(function(err){
            res.status(500).json({error: err})
        })
    
        })
        
    }
     else{
            //Invalid data from user
            res.status(202).json(errors.array())
        }


})

//login system
router.post('/login', function(req,res){
    
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({username : username})
    .then(function(accData){
        if (accData===null){
            //email or username not found...
            return res.status(401).json({success:false, message: "Username not found!!"})
        }
        //now lets compare the password
        bcryptjs.compare(password, accData.password, function(err,result){
            if(result===false){
                //username correct /password incorrect
                return res.status(401).json({success:false, message:"Invalid credential!!"})
            }
            //now lets generate token
            const token = jwt.sign({accId : accData}, 'secretkey');
            console.log(token)
            res.status(200).json({success:true, data:accData, token:token, message: "Auth success!!"})
            
        })
    })
})

//display all the registered accounts
router.get('/display', function(req,res){
    User.find()
    .then(function(data){
        res.send(data)
    })
})


//for delete
router.delete('/delete/:myid', function(req,res){
    const id = req.params.myid;
    User.deleteOne({_id : id}).then(function(){
        res.send('deleted!!')
    })
})


//for update
router.put('/updateUser/:myid', function(req,res){
    id = req.params.myid;
    firstname = req.body.firstname;
    username = req.body.username;

    User.updateMany({_id : id}, {firstname : firstname, username : username })
    .then(function(){
        res.send("Updated!!")
    })

})
module.exports = router