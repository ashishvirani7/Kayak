var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/kayak";
var autoIncrement = require("mongodb-autoincrement");
var bcrypt = require('bcrypt');
var CryptoJS = require("crypto-js");

const saltRounds = 10;

function handle_request(msg, callback){

    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));

    // Without Connection Pooling
    try {
        mongo.connect(mongoURL, function(db){
            console.log('Connected to mongo at: ' + mongoURL);
            const loginCollectionName = 'login';
            const loginCollection = db.collection(loginCollectionName);

            const email=msg.email;
            var password=msg.password;

            var bytes  = CryptoJS.AES.decrypt(password.toString(), "kayak");
            password = bytes.toString(CryptoJS.enc.Utf8);

            loginCollection.findOne({"email":email}, function(err, user){
                if (user) {
                    console.log("User is: "+user);

                    res.code="202";
                    res.data="User Exists";
                    callback(null,res);
                }
                else {
                    bcrypt.hash(password, saltRounds, function(err, hash) {
                        autoIncrement.getNextSequence(db, loginCollectionName, function (err, autoIndex) {
                            loginCollection.insert({
                                userid: autoIndex.toString(),
                                email:email,
                                password:hash,
                            });
                        });
                    });

                    res.code="201";
                    res.data="Signup Successful";
                    callback(null,res);
                }
            });
        });
    }
    catch (e){
        console.log("error in insertion");
    }
}
exports.handle_request = handle_request;