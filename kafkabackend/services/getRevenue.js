var mongoose = require('mongoose');
mongoose.connect('54.183.101.173:27017/kayak');
var Bill = require('../models/Bill');


function handle_hotels(msg, callback) {
    var res = {};
    var message = "";
    var nextMonth;
    var nextYear;

    console.log("In handle request:" + JSON.stringify(msg));
    if(parseInt(msg.month) == 12){
        nextMonth = 1;
        nextYear = parseInt(msg.year)+1;
        nextMonth = 0+""+nextMonth;
    }
    else{
        nextMonth = parseInt(msg.month)+1;
        if(nextMonth<10){
            nextMonth = ""+0+nextMonth;
        }
        nextYear = parseInt(msg.year);
    }
    console.log(nextYear+"-"+nextMonth+"-"+"01T00:00:00.000Z")
    Bill.aggregate([
        {$match:{"hotel.hotel_name":msg.hotelName, "bill_date":{$gte:new Date(nextYear+"-"+nextYear+"-"+"01T00:00:00.000Z"),$lte:new Date(""+nextYear+"-"+nextMonth+"-"+"01T00:00:00.000Z")}}},
        {
        $group:{_id:msg.hotelName, total:{$sum:"$hotel.amount"}}
    }], function(err, hotels){
        if(err){
            message="error"
            res.code = "202"
            res.data = message;
            callback(null, res)
        }
        else{
            res.code = "201"
            res.data = hotels;
            console.log(hotels);
            callback(null, res);
        }
    })
}

exports.handle_hotels = handle_hotels;