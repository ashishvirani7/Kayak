var express = require('express');
var router = express.Router();
var kafka = require('./kafka/client');
var topic_name = "add_hotel_admin_topic";

router.post('/', (req,res,next)=>{

    var hotelObject = {
        hotelName : req.body.hotelName,
        hotelStreet : req.body.hotelStreet,
        roomPriceValue1 : req.body.roomPriceValue1,
        roomPriceValue2 : req.body.roomPriceValue2,
        roomPriceValue3 : req.body.roomPriceValue3,
        roomTypeValue1 : req.body.roomTypeValue1,
        roomTypeValue2 : req.body.roomTypeValue2,
        roomTypeValue3 : req.body.roomTypeValue3,
        stateValue : req.body.stateValue
    };

    kafka.make_request(topic_name, hotelObject, function(err,results){
        console.log('in result');
        console.log(hotelObject);
        console.log(results);
        if(err){
            done(err,{});
        }
        else
        {
            if(results.code == 201){
                console.log("Hotel Added Successfully");
                return res.status(201).send({"message":"Hotel Added Successfully"});
            }
            else {
                console.log("Hotel addition Failed");
                res.status(202).send({"message":"Hotel addition Failed"});
            }
        }
    });
});

module.exports = router;