var jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {

    console.log('req',req)
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.param('token') || req.headers['authentication'];
    // decode token
    console.log('token', token)
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, 'brainstationkey', function(err, decoded) {          
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });      
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;  
                console.log('req',req.decoded.email)
                /*
                Next is a function built into NODE, it will tell node to go 
                onto the next logical step. In this case it will be the user
                routes as specified in the server.js file
                */
                next();
            }
        });
        
    } else {
        // if there is no token
        // return an error
        /*
        Notice there is no next here. The API request stops
        here and does not go on to the next logical step
        defined in our code
        */
        return res.status(403).send({ 
            success: false, 
            message: 'No token provided.'
        });

    }

};