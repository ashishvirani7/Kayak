var express = require('express');
var router = express.Router();
var kafka = require('./kafka/client');
var topic_name = "add_flight_admin_topic";

router.post('/', (req,res,next)=>{

    var flightObject = {
        flight_name : req.body.flight_name,
        flight_operator_name : req.body.flight_operator_name,
        departure_date : req.body.departure_date,
        arrival_date : req.body.arrival_date,
        origin : req.body.origin,
        destination : req.body.destination,
        business_class_price : req.body.business_class_price,
        economy_class_price : req.body.economy_class_price,
        first_class_price : req.body.first_class_price
    };

    kafka.make_request(topic_name, flightObject, function(err,results){
        console.log('in result');
        console.log(flightObject);
        console.log(results);
        if(err){
            done(err,{});
        }
        else
        {
            if(results.code == 201){
                console.log("Flight Added Successfully");
                console.log("ID--"+results.data._id);
                return res.status(201).send({"message":results});
            }
            else {
                console.log("Flight addition Failed");
                res.status(202).send({"message":results});
            }
        }
    });
});

module.exports = router;