const express = require('express');
const session = require('express-session');
const passport =  require("passport");
const LocalStrategy = require('passport-local').Strategy;
const app = express();
const port = 3001;

require("./auth/passport");

//auth
app.use(express.urlencoded({ extended: false}));
app.use(express.json())
app.use(session({secret:"=-sp121;`|"}));
app.use(passport.initialize());
app.use(session({ 
  secret:"-9|w4#$ll{'`",
  resave: false,
  saveUninitialized: false
}));
app.use((req, res, next) => {    
  app.locals.user = req.user;
  next();
});



app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.post("/",(req,res)=>{
  console.log(req.body);
})
app.use("/",require("./auth/auth"));
app.use("/",require("./rout/rout"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});