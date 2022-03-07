'use strict';
const express = require ('express');
const {users} = require('../models/index');
const routers = express.Router();
const bcrypt = require('bcrypt');
const base64 = require('base-64');


routers.post('/signup',signUpHandler);


 async function signUpHandler(req,res){
let{userName,passWord} = req.body;
console.log(`${userName} and ${passWord}`);
try{
let hashed =  await bcrypt.hash(passWord,5);
let newUser = await users.create({
    userName : userName,
    passWord: hashed
})
res.status(201).json(newUser)
}
catch(error){
    console.log(error);
}
}

module.exports = routers