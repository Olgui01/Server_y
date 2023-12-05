const express = require('express');
const passport = require('passport');
const path = require('path');
//const { isLoggedOu , isLoggedOuM} = require('../lib/auth');
const rout = express.Router();
const multer = require("multer");
const upload = multer({storage:multer.diskStorage({
    destination:'./src/Public/user_img',
    filename:(req,file,done)=>{
        const n = file ? file.fieldname + '-' + Date.now() + path.extname(file.originalname):null
        console.log(n,"======================");

        done(null,file? file.fieldname + '-' + Date.now() + path.extname(file.originalname):null);
    }

})}).single('Img');

rout.post('/sin',upload, passport.authenticate('sin',{
    successRedirect:'/Home',
    failureRedirect:'/',
    failureFlash:true
}));

/*
rout.get('/logout',(req,res)=>{
    req.logOut();
    res.redirect('/');
});

// movil
rout.post('/Movil/sing',isLoggedOuM, passport.authenticate('local.sin',{
    successRedirect:'/Movil_Pineapple/Perfil',
    failureRedirect:'/',
    failureFlash:false
}));


rout.post('/sung',isLoggedOu,passport.authenticate('local.sun',{
        successRedirect:'/Home/perfil',
        failureRedirect:'/views/status_creat/false',
        failureFlash:false
     //   :true
}));
*/
module.exports=rout;