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

                var len = bookings.length;
                var bk = [];
                j=0;
                bookings.forEach(eachBooking =>{
                    if(eachBooking.bill_date < new Date()){
                        var eb = JSON.stringify(eachBooking);
                        var obj = {time : "past"};
                        var retriveObj = eb;
                        var newData = JSON.parse(retriveObj);
                        Object.assign(newData, obj)
                        eb.time = "past";
                        console.log("cool", newData);
                        bk.push(newData);
                    }
                    else
                    {
                        var eb = JSON.stringify(eachBooking);
                        var obj = {time : "future"};
                        var retriveObj = eb;
                        var newData = JSON.parse(retriveObj);
                        Object.assign(newData, obj)
                        eb.time = "past";
                        console.log("uncool", newData);
                        bk.push(newData);
                        console.log("uncool");
                    }
                    j++;
                    if(j == len){
                        message=bk;
                        res.code = "201"
                        res.data = message;
                        callback(null, res);
                    }
                })



            }

        })
}

exports.handle_request = handle_request;