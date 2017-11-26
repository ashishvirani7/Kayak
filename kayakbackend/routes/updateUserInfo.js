var express = require('express');
var autoIncrement = require("mongodb-autoincrement");
var router = express.Router();
var mongo = require("./mongo");
//var mongoURL = "mongodb://localhost:27017/kayak";
var mongoURL = "mongodb://54.67.27.46:27017/kayak";

var kafka = require('./kafka/client');

var topic_name = "updateUserInfo_topic";

router.post('/', (req,res,next)=>{

    var email=req.body.email;
    var first_name=req.body.first_name;
    var middle_name=req.body.middle_name;


kafka.make_request(topic_name, {email,first_name, middle_name}, function(err,results){
    console.log('in result');
    console.log(results);
    if(err){
        done(err,{});
    }
    else
    {
        if(results.code == 201){
            console.log("Update Successful");
            return res.status(201).send({"message":"Update Successful"});
        }
        else {
            res.status(202).send({"message":"User exists"});
            console.log("Update Failed");
        }
    }
});
});


module.exports = router;