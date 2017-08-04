const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
var app = express();
const upload_process = require('../component/uploadfile');

//import shcema
const User = require('../schema/user');

//component 
// var jwt = require('../component/verifyJWT');
const config = require('../component/config');

// router.use(jwt.claimToken);
router.use(bodyParser.urlencoded({extended : false}));
router.use(bodyParser.json());


router.get('/', function (req, res) {
	User.find({}, function (err, users) {
		if (err) {
			res.send(err)
		}else{
			res.json({
				sucess : true,
				message : ' list of users you have',
				list : users
			});
		}
	})
})

router.post('/', function (req, res) {
	upload_process.upload(req, res)
})


module.exports = router;