
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const jwt = require('../component/verifyJWT');
const permission = require('../component/permission');

const masterukerinstansi = require('../schema/master/master.uker.instansi');

const router = express.Router();
const func = "masterukerinstansi"

router.use(bodyParser.urlencoded({extended : false}));
router.use(bodyParser.json());

mongoose.Promise = global.Promise;

router.use(jwt.claimToken);

//get semua data ukerinstansi 
router.get('/', function (req, res, next) {
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {	

			masterukerinstansi
			.find()
			.exec(function (err, ukerinstansi) {
				if (err) {
					res
					.json({
						success : false,
						message : "something wrong",
						error : err
					})
					.status(500)
				}else if (!ukerinstansi || ukerinstansi == null || ukerinstansi == undefined) {
					res
					.json({
						success : false,
						message : "ukerinstansi not found"
					})
					.status(404)
				}else{
					res
					.json({
						success : true,
						data : ukerinstansi
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

//get data ukerinstansi berdasarkan id ukerinstansi
router.get('/:id', function (req, res, next) {
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {	

			var id = req.params.id;
			masterukerinstansi
			.find({_id : id})
			.exec(function (err, ukerinstansi) {
				if (err) {
					res
					.json({
						success : false,
						message : "something wrong",
						error : err
					})
					.status(500)
				}else if (!ukerinstansi || ukerinstansi == null || ukerinstansi == undefined) {
					res
					.json({
						success : false,
						message : "ukerinstansi not found"
					})
					.status(404)
				}else{
					res
					.json({
						success : true,
						data : ukerinstansi
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
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {	

			masterukerinstansi
			.find({keterangan : req.body.ukerinstansi})
			.exec(function (err, ukerResult) {
				if (err) {
					res
					.json({
						success : false,
						message : "something wrong",
						error : err
					})
					.status(500)
				}else if (!ukerResult || ukerResult == null || ukerResult == undefined|| ukerResult.length == 0) {
					var ukerinstansi = new masterukerinstansi({
						keterangan : req.body.ukerinstansi
					})

					ukerinstansi
					.save(function (err) {
						if (err) {
							res
							.json({
								success : false,
								message : "failed to save ukerinstansi berkala",
								error : err
							})
						}else{
							res
							.json({
								success : true,
								message : "success to save ukerinstansi berkala"
							})
						}
					})

				}else{
					res
					.json({
						success : false,
						message : "unit kerja telah ada",
						data : ukerResult.length
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

//edit data ukerinstansi berdasarkan id ukerinstansi
router.put('/:id', function (req, res, next) {
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {	

			var id = req.params.id
			var ukerinstansi = ({
				keterangan : req.body.ukerinstansi
			})

			masterukerinstansi
			.findOneAndUpdate(
				{_id : id},
				ukerinstansi,
				function (err, ukerinstansi) {
					if (err) {
						res
						.json({
							success : false,
							message : "failed to update ukerinstansi berkala",
							error : err
						})
						.status(500)

					}else if (!ukerinstansi) {
						res
						.json({
							success : false,
							message : "ukerinstansi berkala not found"
						})
						.status(404)

					}else{
						res
						.json({
							success : true,
							message : "success to update ukerinstansi berkala"
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
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {	
			
			var id = req.params.id
			masterukerinstansi
			.remove(
				{_id : id},
				function (err) {
					if (err) {
						res
						.json({
							success : false,
							message : "failed to remove ukerinstansi berkala",
							error : err
						})
						.status(500)
					}else{
						res
						.json({
							success : true,
							message : "success to remove ukerinstansi berkala"
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