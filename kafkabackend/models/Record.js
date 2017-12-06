var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Record = new Schema({
    userid: String,
    activity: String,
    timeSpent: Number,
    timenow: Number
});
module.exports = mongoose.model("Record",Record);