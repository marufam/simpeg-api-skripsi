const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const jwt = require('../component/verifyJWT');
const permission = require('../component/permission');

const pegawailogin = require('../schema/pegawai.login');

const router = express.Router();
const func = "createauth"

router.use(bodyParser.urlencoded({extended : false}));
router.use(bodyParser.json());

mongoose.Promise = global.Promise;

router.use(jwt.claimToken);

router.get('/', function (req, res, next) {
	// checking permission
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {

			pegawailogin
			.find()
			.exec(function (err, login) {
				if (err) {
					res
					.json({
						success : false,
						message : "something wrong",
						error : err
					})
					.status(500)
				}else if (!login || login == null || login == undefined) {
					res
					.json({
						success : false,
						message : "login not found"
					})
					.status(404)
				}else{
					res
					.json({
						success : true,
						data : login
					})
					.status(200)
				}
			})

		}else{
			// if denied
			res.json({
				success : false,
				message : "access denied"
			})
		}
	})
})
 
router.get('/:id', function (req, res, next) {
	// checking permission
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {

			var id = req.params.id;
			pegawailogin
			.find({_id : id})
			.exec(function (err, login) {
				if (err) {
					res
					.json({
						success : false,
						message : "something wrong",
						error : err
					})
					.status(500)
				}else if (!login || login == null || login == undefined) {
					res
					.json({
						success : false,
						message : "login not found"
					})
					.status(404)
				}else{
					res
					.json({
						success : true,
						data : login
					})
					.status(200)
				}
			})

		}else{
			// if denied
			res.json({
				success : false,
				message : "access denied"
			})
		}
	})
});


router.post('/simpan', function (req, res, next) {
	// checking permission
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {

			var login = new pegawailogin({
				nip : req.body.nip,
				username : req.body.username,
				password : req.body.password,
				repassword : req.body.repassword,
				role : req.body.role
			})
			console.log(login)
			login
			.save(function (err) {
				if (err) {
					res
					.json({
						success : false,
						message : "failed to save login berkala",
						error : err
					})
				}else{
					res
					.json({
						success : true,
						message : "success to save login berkala"
					})
				}
			})

		}else{
			// if denied
			res.json({
				success : false,
				message : "access denied"
			})
		}
	})
})

router.put('/:id', function (req, res, next) {
	// checking permission
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {

			var id = req.params.id
			var login = ({
				nomor : req.body.nomor,
				status : req.body.status
			})

			pegawailogin
			.findOneAndUpdate(
				{_id : id},
				login,
				function (err, login) {
					if (err) {
						res
						.json({
							success : false,
							message : "failed to update login berkala",
							error : err
						})
						.status(500)

					}else if (!login) {
						res
						.json({
							success : false,
							message : "login berkala not found"
						})
						.status(404)

					}else{
						res
						.json({
							success : true,
							message : "success to update login berkala"
						})
						.status(200)
					}
				}
			)

		}else{
			// if denied
			res.json({
				success : false,
				message : "access denied"
			})
		}
	})

})

router.delete('/:id', function (req, res, next) {
	// checking permission
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {

			var id = req.params.id
			pegawailogin
			.remove(
				{_id : id},
				function (err) {
					if (err) {
						res
						.json({
							success : false,
							message : "failed to remove login berkala",
							error : err
						})
						.status(500)
					}else{
						res
						.json({
							success : true,
							message : "success to remove login berkala"
						})
					}
				}
			)

		}else{
			// if denied
			res.json({
				success : false,
				message : "access denied"
			})
		}
	})
})
module.exports = router;