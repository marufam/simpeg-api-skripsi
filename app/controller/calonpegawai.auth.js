const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('../component/verifyJWT');
const router = express.Router();
var app = express();
//import shcema
const User = require('../schema/user');

//component 
const config = require('../component/config');
var upload = require('../component/uploadfile');

router.use(bodyParser.urlencoded({extended : false}));
router.use(bodyParser.json());

app.set('superSecret', 'simpeg');

router.get('/register', function (req, res) {
	var nick = new User({
		name : 'nova lufian',
		password : 'password',
		admin : true
	});

	nick.save(function (err) {
		if (err){
			res.send(err)
		}else{
			res.json({
				success : true,
				message : 'user has been saved'
			})
		}
	})
});

router.get('/users', function (req, res) {
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

router.post('/login', function (req, res) {
	User.findOne({
		name : req.body.name
	}, function (err, user) {
		if (err){
			res.send(err)
		}else if (!user){
			res.json({
				success : false,
				message : "authentication failed",
				data : JSON.stringify(req.body)
			})
		}else if(user){
			if(user.password != req.body.password){
				res.json({
					success : false,
					message : "authentication failed. wrong password"
				})
			}else {
				var token = jwt.createToken(user, app.get('superSecret'))
				res.json({
					success : true,
					message : "enjoy your token",
					token : token
				})	
			}
		}
	})
})


router.post('/upload', function (req, res) {
	upload.upload()
})


module.exports = router;