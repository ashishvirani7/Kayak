var mongoose = require("mongoose");
var bcrypt = require('bcrypt');
var CryptoJS = require("crypto-js");
//mongoose.connect('localhost:27017/kayak');
mongoose.connect('54.183.101.173:27017/kayak');
var Bill = require('../models/Bill');


function handle_request(msg, callback) {

    var res = {};
    var message = "";
    var nextMonth;
    var nextYear;

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
    console.log(nextYear+"-"+nextMonth+"-"+"01T00:00:00.000Z");
    console.log("In handle request:"+ JSON.stringify(msg));

    var cond={};
    if(msg.email == ""){
        cond={};
    }
    else{
        cond = {
            bill_date: {
                $gte:new Date(msg.year+"-"+msg.month+"-"+"01T00:00:00.000Z"),
                $lte:new Date(""+nextYear+"-"+nextMonth+"-"+"01T00:00:00.000Z")
            }
        };
    }
    Bill.find(cond, {} , function(err, billDocuments) {
        if (err) {
            console.log("Some Error Happened while getting Bill Data");
            res.code = "500";
            res.data = err;
            callback(null, res);
        }
        else {

            message = " Bill\n" + billDocuments;
            res.code = "201";
            res.data = billDocuments;
            callback(null, res);
        }
    });
}
exports.handle_request = handle_request;