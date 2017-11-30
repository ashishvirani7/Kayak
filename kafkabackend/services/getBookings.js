var mongoose = require('mongoose');
mongoose.connect('54.183.101.173:27017/kayak');
var Bill = require('../models/Bill');


function handle_request(msg, callback) {
    var res = {};
    var message = "";
    var userId = msg.userId;

    console.log("In handle request:"+ JSON.stringify(msg));

        Bill.find({
            "user_id":userId
        }, function(err, bookings){
            if(err){
                message="error"
                res.code = "202"
                res.data = message;
                callback(null, res)
            }
            else
            {

                bookings.forEach(eachBooking =>{
                    //console.log("eachbooking", eachBooking)
                    if(eachBooking.bill_date < new Date()){
                        eachBooking.time = "past";
                        console.log("cool", eachBooking.time);
                    }
                    else
                    {
                        console.log("uncool");
                    }

                })

                message=bookings;
                res.code = "201"
                res.data = message;
                //console.log("hotels:",bookings)
                callback(null, res);

            }

        })
}

exports.handle_request = handle_request;