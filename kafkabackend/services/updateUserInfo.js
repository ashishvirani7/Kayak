var bcrypt = require('bcrypt');
var CryptoJS = require("crypto-js");
var mongoose = require('mongoose');
mongoose.connect('54.67.27.46:27017/kayak');
var Users = require('../models/Users');

function handle_request(msg, callback){

    var res = {};
    var message = "";
    var email = msg.email;
    var first_name = msg.first_name;
    var middle_name = msg.middle_name;
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
            message = "Update User";
            console.log(message);

            //var user = new Users(userObject);
            var condition = {
                email: email
            };

            var updateCol = {$set: {"first_name": first_name, "middle_name": middle_name}};
            Users.update(condition, updateCol, {upsert: true}, function (err) {

                if (err) {
                    console.log("errrr");
                    console.log("Some Error Happened while Updating user");
                    res.code = "500";
                    res.data = message;
                    callback(null, res);
                }
                else {
                    message = "User rows updated";
                    console.log(message);
                    res.code = "201";
                    res.data = "Update Successful";
                    callback(null, res);
                }
            });

        }
    });
}
exports.handle_request = handle_request;