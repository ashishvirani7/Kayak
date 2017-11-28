var mongoose = require("mongoose");
var bcrypt = require('bcrypt');
var CryptoJS = require("crypto-js");
mongoose.connect('54.183.101.173:27017/kayak');
var hotelListings = require('../models/Listings');


function handle_request(msg, callback) {

    var res = {};
    var message = "";
    console.log("In handle request:"+ JSON.stringify(msg));

    var hotelListingObject = {
        hotel_name : msg.hotelName,
        address : {
            street: msg.hotelStreet,
            state : msg.stateValue,
            country: "US"
        },
        rooms : [{
            room_type: msg.roomTypeValue1,
            room_price: msg.roomPriceValue1
        },
            {
                room_type: msg.roomTypeValue2,
                room_price: msg.roomPriceValue2
            },
            {
                room_type: msg.roomTypeValue3,
                room_price: msg.roomPriceValue3
            }]
    };

    

    message = "Hotel Listing Added";
    console.log(message+JSON.stringify(hotelListingObject));
    res.code="201";
    res.data={
        hotelListingObject
    };
    callback(null, res);


    // Users.findOne({"email":email}, function(err,loginData) {
    //     if(err)
    //     {
    //         message = "Some Error Happen";
    //         console.log(message);
    //         res.code = "401";
    //         res.data = message;
    //         callback(null, res);
    //     }
    //     else
    //     {
    //         if(loginData) {
    //             bcrypt.compare(password, loginData.password).then(function(result) {
    //                 if(result){
    //
    //                     message = "Admin User validated: "+loginData.email;
    //                     console.log(message);
    //                     res.code="201";
    //                     res.data={
    //                         loginData
    //                     };
    //                     callback(null, res);
    //                 }
    //                 else {
    //                     message = "Admin User validation failed";
    //                     console.log(message);
    //                     res.code="401";
    //                     res.data=message;
    //                     callback(null, res);
    //                 }
    //             });
    //         }
    //     }
    // });

}
exports.handle_request = handle_request;