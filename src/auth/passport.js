const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const helpers = require("./helpers");
const pool = require("../database");
const multer = require("multer");

passport.use('log', new LocalStrategy({
    usernameField: "user",
    passwordField: "password",
    passReqToCallback: true
}, (req, res, done) => {

}));

passport.use('sin', new LocalStrategy({
    usernameField: "user",
    passwordField: "password",
    passReqToCallback: true
}, async (req, user, password, done) => {
    console.log(req.body,"\nn------------\n",req.file);
    try {
        password = await helpers.encryptPassword(password);
        if (req.file) {
            const rows = await pool.query("INSERT INTO user SET ?",{user,password,Img:req.file.filename});
        }else{
            const rows = await pool.query("INSERT INTO user SET ?",{user,password});
        }
        return (done(null, {id:rows.insertId}));
    } catch (error) {
        return (done(null));
    }
}));

passport.serializeUser((user, done) => {
    done(null,user.id);
});

passport.deserializeUser(async (id, done) => {
    const rs = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    done(null, rs[0]);
});