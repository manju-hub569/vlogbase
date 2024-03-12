const express = require('express');
const router = express.Router();
const LoginControllers = require('./logincomponent');

router.post('/login',(req,res)=>{
    LoginControllers.login(req,res)
})



module.exports = router;