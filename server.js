// server.js

// BASE SETUP
// =============================================================================

// Connect to Database
var mongoose   = require('mongoose');
//mongoose.connect('mongodb://ezorder:ezorder32@ds061671.mongolab.com:61671/ezorder'); // connect to our database

var port = process.env.PORT || 5000;        // set our port
if(port == 5000){
  mongoose.connect('mongodb://localhost/db_ezorder');
} else{
  mongoose.connect('mongodb://ezorder:ezorder32@ds061711.mongolab.com:61711/db_ezorder'); // connect to our database
}
var Order = require('./app/models/order');

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

//get data from POST
app.all('*', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
    res.json({ message: 'Welcome to EZorder API.' });   
});

// router.get('/order', function(req, res) {
//     res.json({ message: 'spit back all order info here' });   
// });



// router.post('/order', function(req, res) {
//     res.json({ message: 'individual order id' });   
// });

router.get('/clear', function(req, res) {
	Order.find(function(err, order) {
		if (err)
		    res.send(err);

		order.remove(function(err) {
			
			if (err)
		    	res.send(err);
		});
    })  
});


router.route('/order')
	.post(function(req, res) {

	    var order = new Order();      
	    order.table_number = req.body.table_number; 
	    order.order = req.body.order;
	    order.server = req.body.server;
	    order.open = req.body.open;
	    order.paid = req.body.paid;
	    order.tip = req.body.tip;
	    
	    //save the bear and check for errors
	    order.save(function(err) {
	        if (err)
	            res.send(err);

	        res.json({ message: order });
		})
	})

	.get(function(req, res) {
		Order.find(function(err, order) {
		if (err)
		    res.send(err);
		res.json(order);
	})


});




router.route('/order/:order_id')
	
	.get(function(req, res) {

		Order.findOne({_id: req.params.order_id }, function(err, order) {
	    if (err)
	        res.send(err);

	    res.json(order);
		});
	})


	.put(function(req, res) {

        Order.findById(req.params.order_id, function(err, order) {

            if (err)
                res.send(err);

      		order.table_number = req.body.table_number; 
		    order.order = req.body.order;
		    order.server = req.body.server;
		    order.open = req.body.open;
		    order.paid = req.body.paid;
		    order.tip = req.body.tip;

            // save the obj
            order.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: order});
            });

       })
    });


 //app.get('*', function(req, res) {
 //       res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
 //   });






// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);






