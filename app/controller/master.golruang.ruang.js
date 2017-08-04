const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const jwt = require('../component/verifyJWT');
const permission = require('../component/permission');

const masterruang = require('../schema/master/master.golruang.ruang');
const mastergolruang = require('../schema/master/master.golruang');

const router = express.Router();
const func = "masterruang"

router.use(bodyParser.urlencoded({extended : false}));
router.use(bodyParser.json());

mongoose.Promise = global.Promise;

router.use(jwt.claimToken);

router.get('/', function (req, res, next) {
	// checking permission
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {

			masterruang
			.find()
			.exec(function (err, ruang) {
				if (err) {
					res
					.json({
						success : false,
						message : "something wrong",
						error : err
					})
					.status(500)
				}else if (!ruang || ruang == null || ruang == undefined) {
					res
					.json({
						success : false,
						message : "ruang not found"
					})
					.status(404)
				}else{
					res
					.json({
						success : true,
						data : ruang
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
			masterruang
			.find({_id : id})
			.exec(function (err, ruang) {
				if (err) {
					res
					.json({
						success : false,
						message : "something wrong",
						error : err
					})
					.status(500)
				}else if (!ruang || ruang == null || ruang == undefined) {
					res
					.json({
						success : false,
						message : "ruang not found"
					})
					.status(404)
				}else{
					res
					.json({
						success : true,
						data : ruang
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

			masterruang
			.find({keterangan : req.body.ruang})
			.exec(function (err, ruang) {
				if (err) {
					res
					.json({
						success : false,
						message : "something wrong",
						error : err
					})
					.status(500)
				}else if (!ruang || ruang == null || ruang == undefined || ruang.length == 0 ) {
					
					var ruang = new masterruang({
						keterangan : req.body.ruang
					})

					ruang
					.save(function (err) {
						if (err) {
							res
							.json({
								success : false,
								message : "failed to save ruang berkala",
								error : err
							})
						}else{
							res
							.json({
								success : true,
								message : "success to save ruang berkala"
							})
						}
					})

				}else{
					res
					.json({
						success : false,
						message : "ruang is exist"
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

router.put('/:id', function (req, res, next) {
	// checking permission
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {

			masterruang
			.find({keterangan : req.body.ruang})
			.exec(function (err, ruang) {
				if (err) {
					res
					.json({
						success : false,
						message : "something wrong",
						error : err
					})
					.status(500)
				}else if (!ruang || ruang == null || ruang == undefined || ruang.length == 0 ) {
					
					var id = req.params.id
					var ruang = ({
						keterangan : req.body.ruang
					})

					masterruang
					.findOneAndUpdate(
						{_id : id},
						ruang,
						function (err, ruang) {
							if (err) {
								res
								.json({
									success : false,
									message : "failed to update ruang berkala",
									error : err
								})
								.status(500)

							}else if (!ruang) {
								res
								.json({
									success : false,
									message : "ruang berkala not found"
								})
								.status(404)

							}else{
								res
								.json({
									success : true,
									message : "success to update ruang berkala"
								})
								.status(200)
							}
						}
					)

				}else{
					res
					.json({
						success : false,
						message : "ruang is exist"
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
			cekitem(id, function (result) {
				if (result == true) {
					res
					.json({
						success : false,
						message : "you cant remove this item, this item in used"
					})
				}else{

					masterruang
					.remove(
						{_id : id},
						function (err) {
							if (err) {
								res
								.json({
									success : false,
									message : "failed to remove ruang berkala",
									error : err
								})
								.status(500)
							}else{
								res
								.json({
									success : true,
									message : "success to remove ruang berkala"
								})
							}
						}
					)
				}
			});

					

		}else{
			// if denied
			res.json({
				success : false,
				message : "access denied"
			})
		}
	})
})

function cekitem(id, cb) {
	var idagama = new mongoose.Types.ObjectId(id)
	mastergolruang
	.findOne({"golongan" : id})
	.exec(function (err, pegawai) {
		if (err) {
			cb(false)
		}else if (!pegawai || pegawai == null || pegawai == undefined) {
			cb(true)
		}else{
			cb(true)
		}
	})
}

module.exports = router;