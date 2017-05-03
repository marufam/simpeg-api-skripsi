const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
var config = require('./config');

module.exports = {
	// create token for auth
	createToken : function (aktor, secret) {
		var token = jwt.sign(aktor, secret);
		return token
	},

	//verify token for valid user
	// accessiblity
	claimToken : function (req, res, next) {
		var token = req.body.token || req.query.token || req.headers['x-access-token'];
		//check valid token 
		if (token) {
			// decoded token from req body
			jwt.verify(token, 'simpeg', function (err, decoded) {
				// err message 
				if (err) {
					return res.json({
						success : false,
						message : "failed to authentication"
					});
				}else{
				// token decoded
					req.decoded = decoded;
					next();
				}
			});
		}else{
			// massage unvalid token 
			return res.status(403).json({
				success : false,
				message : 'token not provided'
			})
		}
	},
	test : function (token, callback) {
		jwt.verify(token, 'simpeg', function (err, decoded) {
				// err message 
				if (err) {
					return res.json({
						success : false,
						message : "failed to authentication"
					});
				}else{
					// console.log(decoded);
					callback(decoded);
				}
			});
	}


}// end of module exports