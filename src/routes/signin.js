'use strict';
const express = require ('express');
const routers = express.Router();
const err500 = require('../error-handlers/500');
// const bcrypt = require('bcrypt');
// const base64 = require('base-64');
const basicAuth = require('../middleware/auth');


routers.post('/signin',basicAuth,signInHandler);










  function signInHandler(req,res){

    res.status(200).json(req.user)
}

routers.use(err500);
module.exports = routers