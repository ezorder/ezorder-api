// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var OrderSchema   = new Schema({
    table_number: Number,
    timestamp: Date,
    order: {
		item_name: String,
    	quantity: Number,
    	comments: String,
    	price: Number,
    	timestamp: Date,
    	status: [ { status: String,  timestamp: Date} ],
    	updates: [ { change: String, timestamp: Date} ],
    	type: [ { type: String } ] 
	},
    server: String,
    open: Boolean,
    paid: Boolean,
    tip: Number    
});

module.exports = mongoose.model('Order', OrderSchema);