const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('../component/verifyJWT');
const router = express.Router();
var app = express();
//import shcema
const Pegawaibiodata = require('../schema/pegawai.biodata');

//component 
const config = require('../component/config');

router.use(bodyParser.urlencoded({extended : false}));
router.use(bodyParser.json());

app.set('superSecret', 'simpeg');

var iam;

function whois(token) {
	jwt.test(token ,function(me) {
		return me
	})
}

router.post('/login', function (req, res) {
	Pegawaibiodata.findOne({
		"login.username" : req.body.name
	}, function (err, pegawaiauth) {
		if (err){
			res.send(err)
		}else if (!pegawaiauth){
			res.json({
				success : false,
				message : "authentication failed",
				data : JSON.stringify(req.body)
			})
		}else if(pegawaiauth.login){
			if(pegawaiauth.login.password != req.body.password){
				res.json({
					success : false,
					message : "authentication failed. wrong password"
				})
			}else {
				var token = jwt.createToken(pegawaiauth, app.get('superSecret'))
				res.json({
					success : true,
					message : "enjoy your token",
					token : token
				})	
			}
		}
	})
})

// router.get('/cek', function (req, res) {
// 	var token = req.body.token || req.query.token || req.headers['x-access-token'];
// 	iam = whois(token);
// 	res.json(iam + "helo")
// })

module.exports = router;