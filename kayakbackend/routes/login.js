var express = require('express');
var router = express.Router();
var passport = require('passport');
require('./passport')(passport);

router.post('/', (req,res,next)=>{
    console.log("request: " +req.body.email);
    console.log("request: " +JSON.stringify(req.body));
    passport.authenticate('login', function(err, user) {
        if(err) {
            res.status(500).send();
        }

        if(!user) {
            res.status(401).send();
        }
        else{
            req.session.email = user.loginData.email;
            req.session.cookie.maxAge = 30 * 60 * 1000;

            console.log("session initilized");
            return res.status(201).send(user);
        }
    })(req, res);
});

module.exports = router; 