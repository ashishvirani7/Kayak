var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Record = new Schema({
    userid: String,
    activity: String,
    timeSpent: Number,
    timenow: Date
});
module.exports = mongoose.model("Record",Record);