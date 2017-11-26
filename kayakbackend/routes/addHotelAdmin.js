var express = require('express');
var autoIncrement = require("mongodb-autoincrement");
var router = express.Router();
var mongo = require("./mongo");
var mongoURL = "mongodb://54.67.27.46:27017/kayak";

var kafka = require('./kafka/client');

var topic_name = "add_hotel_topic";

router.post('/', (req,res,next)=>{

    var email=req.body.email;
    var password=req.body.password;


    kafka.make_request(topic_name, {email, password}, function(err,results){
        console.log('in result');
        console.log(results);
        if(err){
            done(err,{});
        }
        else
        {
            if(results.code == 201){
                console.log("Signup Successful");
                return res.status(201).send({"message":"Signup Successful"});
            }
            else {
                res.status(202).send({"message":"User exists"});
                console.log("Signup Failed");
            }
        }
    });
});
module.exports = router;