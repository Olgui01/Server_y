const express = require("express");
const rout = express.Router();
const passport = require("passport");
rout.post("/sin",passport.authenticate('sin',{
    successRedirect:'/Home',
    failureFlash:'/',
    failureFlash:false
}));