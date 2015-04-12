// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var OrderSchema   = new Schema({
    //orderNumber: String,
    name: String
});

module.exports = mongoose.model('Order', OrderSchema);