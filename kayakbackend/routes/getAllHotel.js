var express = require('express');
var router = express.Router();
var kafka = require('./kafka/client');
var topic_name = "get_all_hotel_topic";

router.post('/', (req,res,next)=>{
    var message="";

    kafka.make_request(topic_name, {}, function(err,results){
        console.log('in result');
        console.log(results);
        if(err){
            done(err,{});
        }
        else
        {
            if(results.code == 201){
                message="Get All Hotel executed Successfully";
                console.log(message);
                console.log("Result"+JSON.stringify(results.data));
                return res.status(201).send({"message":results});
            }
            else {
                message="Failed to get All Hotels";
                console.log(message);
                res.status(202).send({"message":err});
            }
        }
    });
});

module.exports = router;