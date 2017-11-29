var express = require('express');
var router = express.Router();
var kafka = require('./kafka/client');
var topic_name = "update_hotel_admin_topic";

router.post('/', (req,res,next)=>{

    var hotelObject = {
        _id : req.body._id,
        hotel_name : req.body.hotel_name,
        hotel_street : req.body.hotel_street,
        room_price_value1 : req.body.room_price_value1,
        room_price_value2 : req.body.room_price_value2,
        room_price_value3 : req.body.room_price_value3,
        room_type_value1 : req.body.room_type_value1,
        room_type_value2 : req.body.room_type_value2,
        room_type_value3 : req.body.room_type_value3,
        state_value : req.body.state_value,
        zip_code : req.body.zip_code,
        city : req.body.city
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
                console.log("Hotel Updated Successfully");
                console.log("ID--"+results.data._id);
                return res.status(201).send({"message":results});
            }
            else {
                console.log("Hotel updation Failed");
                res.status(202).send({"message":results});
            }

        }
    });
});

module.exports = router;