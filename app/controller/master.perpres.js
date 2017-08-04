const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const jwt = require('../component/verifyJWT');
const permission = require('../component/permission');

const masterperpres = require('../schema/master/master.perpres');
const upload_process = require('../component/uploadfile');

const router = express.Router();
const func = "masterperpres"

router.use(bodyParser.urlencoded({extended : false}));
router.use(bodyParser.json());

mongoose.Promise = global.Promise;

router.use(jwt.claimToken);

router.get('/', function (req, res, next) {
	// checking permission
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {

			masterperpres
			.find()
			.exec(function (err, perpres) {
				if (err) {
					res
					.json({
						success : false,
						message : "something wrong",
						error : err
					})
					.status(500)
				}else if (!perpres || perpres == null || perpres == undefined) {
					res
					.json({
						success : false,
						message : "perpres not found"
					})
					.status(404)
				}else{
					res
					.json({
						success : true,
						data : perpres
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
			masterperpres
			.find({_id : id})
			.exec(function (err, perpres) {
				if (err) {
					res
					.json({
						success : false,
						message : "something wrong",
						error : err
					})
					.status(500)
				}else if (!perpres || perpres == null || perpres == undefined) {
					res
					.json({
						success : false,
						message : "perpres not found"
					})
					.status(404)
				}else{
					res
					.json({
						success : true,
						data : perpres
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


router.post('/', function (req, res, next) {
	// checking permission
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {
			upload_process.uploadFile(req, res,function (result) {
				if (result.success == true) {
					masterperpres
					.find({
						nomor : req.body.nomor,
						status : req.body.status,
					})
					.exec(function (err, perpres) {
						if (err) {
							res
							.json({
								success : false,
								message : "something wrong",
								error : err
							})
							.status(500)
						}else if (!perpres || perpres == null || perpres == undefined || perpres.length == 0) {
							
							var perpres = new masterperpres({
								nomor : req.body.nomor,
								status : req.body.status,
								filename : result.data
							})

							perpres
							.save(function (err) {
								if (err) {
									res
									.json({
										success : false,
										message : "failed to save perpres berkala",
										error : err
									})
								}else{
									res
									.json({
										success : true,
										message : "success to save perpres berkala"
									})
								}
							})

						}else{
							res
							.json({
								success : false,
								message : "perpres is exist"
							})
							.status(200)
						}
					})

				}else{
					res.json({
						success : false,
						message : "upload failed"
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

			masterperpres
			.find({
				nomor : req.body.nomor,
				status : req.body.status
			})
			.exec(function (err, perpres) {
				if (err) {
					res
					.json({
						success : false,
						message : "something wrong",
						error : err
					})
					.status(500)
				}else if (!perpres || perpres == null || perpres == undefined || perpres.length == 0) {
					
					var id = req.params.id
					var perpres = ({
						nomor : req.body.nomor,
						status : req.body.status
					})

					masterperpres
					.findOneAndUpdate(
						{_id : id},
						perpres,
						function (err, perpres) {
							if (err) {
								res
								.json({
									success : false,
									message : "failed to update perpres berkala",
									error : err
								})
								.status(500)

							}else if (!perpres) {
								res
								.json({
									success : false,
									message : "perpres berkala not found"
								})
								.status(404)

							}else{
								res
								.json({
									success : true,
									message : "success to update perpres berkala"
								})
								.status(200)
							}
						}
					)

				}else{
					res
					.json({
						success : false,
						message : "perpres is exist"
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

router.delete('/:id', function (req, res, next) {
	// checking permission
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {

			var id = req.params.id
			masterperpres
			.remove(
				{_id : id},
				function (err) {
					if (err) {
						res
						.json({
							success : false,
							message : "failed to remove perpres berkala",
							error : err
						})
						.status(500)
					}else{
						res
						.json({
							success : true,
							message : "success to remove perpres berkala"
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