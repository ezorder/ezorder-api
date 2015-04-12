// server.js

// BASE SETUP
// =============================================================================

// Connect to Database
var mongoose   = require('mongoose');
mongoose.connect('mongodb://ezorder:ezorder32@proximus.modulusmongo.net:27017/Mujag5ym'); // connect to our database

var Order = require('./models/order');

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

//get data from POST
app.all('*', function(req, res, next) {
	res.header('Access-Controll-Allow-Origin', '*');
	res.header('Access-Controll-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header('Access-Controll-Allow-Headers', 'Content-Type');
	next();
});


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// router.get('/order', function(req, res) {
//     res.json({ message: 'spit back all order info here' });   
// });

router.get('/order/:order_id', function(req, res) {
    res.json({ message: 'individual order id' });   
});

// router.post('/order', function(req, res) {
//     res.json({ message: 'individual order id' });   
// });


router.route('/order')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        
        res.json({ message: 'Bear created!' });

        var order = new Order();      // create a new instance of the Bear model
        order.name = req.body.name;  // set the bears name (comes from the request)

        // save the bear and check for errors
        order.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Bear created!' });
        });
        
    });

// router.route('/order')
// 	.post(function(req, res) {

// 	    var order = new Order();      // create a new instance of the Bear model
// 	    order.name = req.body.name;   // set the bears name (comes from the request)
// 	    //order.orderNumber = "15";
	    
// 	    // save the bear and check for errors
// 	    order.save(function(err) {
// 	        if (err)
// 	            res.send(err);

// 	        res.json({ message: 'Order created!' });
// 		});    
// 	})

// 	.get(function(req, res) {
//         Order.find(function(err, bears) {
//             if (err)
//                 res.send(err);

//             res.json(bears);
//         });
//  });

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);






