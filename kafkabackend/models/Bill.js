var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Bill = new Schema({
	
	bill_id: String,
	bill_date:Date,
	bill_type:String,
	user_id : String,
	bill_amount:Number,
	bill_status:String,
	flights :
	[{
		flight_id : String,
		flight_operator_name:String,
		flight_start_date: Date,
		flight_end_date: Date,
		origin:String,
		destination:String,
		class_type:String,
		no_of_travelers : Number,
		amount: Number,
		Notes: String
	}],
	hotels :
	[{
		hotel_id : String,
		hotel_name : String,
		city: String,
		State:String,
		booking_start_date: Date,
		booking_end_date: Date,
		amount: Number,
		no_of_guests : Number,
		room_type:String,
		Notes: String
	}],
	cars :
	[{
		car_id : String,
		booking_start_date: Date,
		booking_end_date: Date,
		amount: Number,
		car_name : String,
		car_type : String,
		model_name : String,
        city : String,
		Notes: String
	}]
	
});

module.exports = mongoose.model("Bill", Bill);