var mongo = require("./mongo");
var bcrypt = require('bcrypt');
var CryptoJS = require("crypto-js");
//var mongoURL = "mongodb://localhost:27017/kayak";
var mongoURL = "mongodb://54.67.27.46:27017/kayak";

function handle_request(msg, callback){

    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));

    mongo.connect(mongoURL,(db)=>{
        const loginCollectionName = 'users';
        const loginCollection = db.collection(loginCollectionName);
        const email=msg.email;
        var password=msg.password;
        var userid;
        var response={};
        var bytes  = CryptoJS.AES.decrypt(password.toString(), "kayak");
        password = bytes.toString(CryptoJS.enc.Utf8);
        console.log("password is: "+password);

        loginCollection.findOne({"email":email}, function(err, loginData){

            if(loginData){
                var dbPassword = loginData.password;
                bcrypt.compare(password, dbPassword).then(function(result) {
                    if(result){
                        userid=loginData.userid;
                        response={
                            loginData
                        };
                        res.code="201";
                        res.data=response;
                        callback(null, res);
                    }
                    else{

                        res.code="401";
                        res.data=null;
                        callback(null, res);
                    }
                });
            }
            else {
                res.code="401";
                res.data=null;
                callback(null, res);
            }
        });
    });
}
exports.handle_request = handle_request;