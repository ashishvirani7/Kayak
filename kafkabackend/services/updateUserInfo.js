var mongo = require("./mongo");
var bcrypt = require('bcrypt');
var CryptoJS = require("crypto-js");
//var mongoURL = "mongodb://localhost:27017/kayak";
//var mongoURL = "mongodb://54.67.27.46:27017/kayak";

var mongoose = require('mongoose');
mongoose.connect('54.67.27.46:27017/kayak');
var Users = require('../models/Users');


function handle_request(msg, callback){

    var res = {};
    var message = "";
    var email = msg.email
    var first_name = msg.first_name;
    var middle_name = msg.middle_name;
/*    var bytes  = CryptoJS.AES.decrypt(password.toString(), "kayak");
    password = bytes.toString(CryptoJS.enc.Utf8);*/

    console.log("In handle request:"+ JSON.stringify(msg));

    Users.count({email:email}, function (err, count) {
        if(err)
        {
            message ="Some Error Happened while checking user ID";
            console.log(message);
            res.code="500";
            res.data=message;
            callback(null,res);
        }
        else {
            if (count > 0) {
                //User exists
                message="User :"+email+" Exists";
                console.log(message);
                res.code="202";
                res.data=message;
                callback(null,res);
            }
            else {
                message="Update User";
                console.log(message);

                        var userObject = {
                            email: email,
                            first_name: first_name,
                            middle_name: middle_name
                        };
                        var user = new Users(userObject);
                        user.save(function (err, product, numAffected) {
                            if (err) {
                                console.log("Some Error Happened while Updating user");
                                res.code = "500";
                                res.data = message;
                                callback(null, res);
                            }
                            else {
                                message = numAffected + " rows added into Cart\n" + product;
                                console.log(message);
                                res.code = "201";
                                res.data = "Update Successful";
                                callback(null, res);
                            }
                        });

            }
        }
    });

}


exports.handle_request = handle_request;