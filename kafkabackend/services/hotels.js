var mongoose = require('mongoose');
mongoose.connect('localhost:27017/kayak');
var Listings = require('../models/Listings')


function handle_request(msg, callback) {
    var res = {};
    var message = "";
    var city = msg.city;
    var checkin = msg.checkin;
    var checkout = msg.checkout;
    var guest = msg.guest;
    var noOfRoom = msg.noOfRoom;
    var noOfGuest = msg.noOfRoom;
    var order = msg.order;
    var filter_prop = msg.filter_prop;

    console.log("In handle request:"+ JSON.stringify(msg));
    if(order == "price_desc"){
        Listings.find({
            "hotel.address.city":{'$regex':city,$options:'i'},
            "hotel.rooms.room_type":"Suite",
            "hotel.stars":{$gt:parseInt(filter_prop.ratings,10)}
        }, function(err, hotels){
            if(err){
                message="error"
                res.code = "202"
                res.data = message;
                callback(null, res)
            }
            else
            {
                message=hotels;
                res.code = "201"
                res.data = message;
                console.log("hotels:",hotels)
                callback(null, res);

            }

        }).sort([['hotel.rooms.room_price',-1]])
    }
    else{
        Listings.find({
            "hotel.address.city":{'$regex':city,$options:'i'}, 
            "hotel.rooms.room_type":"Suite",
            "hotel.stars":{$gt:parseInt(filter_prop.ratings,10)}
        }, function(err, hotels){
            if(err){
                message="error"
                res.code = "202"
                res.data = message;
                callback(null, res)
            }
            else
            {
                message=hotels;
                res.code = "201"
                res.data = message;
                console.log("hotels:",hotels)
                callback(null, res);

            }

        }).sort([['hotel.rooms.room_price',1]])
    }

}

// function handle_request1(msg, callback){
//
//     var res = {};
//     var message = "";
//     var email = msg.email
//     var password = msg.password;
//     var bytes  = CryptoJS.AES.decrypt(password.toString(), "kayak");
//     password = bytes.toString(CryptoJS.enc.Utf8);
//
//     console.log("In handle request:"+ JSON.stringify(msg));
//
//     Users.count({email:email}, function (err, count) {
//         if(err)
//         {
//             message ="Some Error Happened while checking user ID";
//             console.log(message);
//             res.code="500";
//             res.data=message;
//             callback(null,res);
//         }
//         else {
//             if (count > 0) {
//                 //User exists
//                 message="User :"+email+" Exists";
//
//                 console.log(message);
//                 res.code="202";
//                 res.data=message;
//                 callback(null,res);
//             }
//             else {
//                 message="Insert User";
//                 console.log(message);
//
//                 bcrypt.hash(password, saltRounds, function(err, hash) {
//                     if(!err) {
//                         var userObject = {
//                             email: email,
//                             password: hash
//                         };
//                         var user = new Users(userObject);
//                         user.save(function (err, product, numAffected) {
//                             if (err) {
//                                 console.log("Some Error Happened while Inserting user");
//                                 res.code = "500";
//                                 res.data = message;
//                                 callback(null, res);
//                             }
//                             else {
//                                 message = numAffected + " rows added into Cart\n" + product;
//                                 console.log(message);
//                                 res.code = "201";
//                                 res.data = "Signup Successful";
//                                 callback(null, res);
//                             }
//                         });
//                     }
//                     else
//                     {
//                         message = "Some Error Happened while Hashing";
//                         console.log(message);
//                         res.code = "500";
//                         res.data = message;
//                         callback(null, res);
//                     }
//                 });
//             }
//         }
//     });
//
//     // Without Connection Pooling
//     try {
//         mongo.connect(mongoURL, function(db){
//             console.log('Connected to mongo at: ' + mongoURL);
//             const loginCollectionName = 'login';
//             const loginCollection = db.collection(loginCollectionName);
//
//             const email=msg.email;
//             var password=msg.password;
//
//             var bytes  = CryptoJS.AES.decrypt(password.toString(), "kayak");
//             password = bytes.toString(CryptoJS.enc.Utf8);
//
//             loginCollection.findOne({"email":email}, function(err, user){
//                 if (user) {
//                     console.log("User is: "+user);
//
//                     res.code="202";
//                     res.data="User Exists";
//                     callback(null,res);
//                 }
//                 else {
//                     bcrypt.hash(password, saltRounds, function(err, hash) {
//                         autoIncrement.getNextSequence(db, loginCollectionName, function (err, autoIndex) {
//                             loginCollection.insert({
//                                 userid: autoIndex.toString(),
//                                 email:email,
//                                 password:hash,
//                             });
//                         });
//                     });
//
//                     res.code="201";
//                     res.data="Signup Successful";
//                     callback(null,res);
//                 }
//             });
//         });
//     }
//     catch (e){
//         console.log("error in insertion");
//     }
// }
exports.handle_request = handle_request;