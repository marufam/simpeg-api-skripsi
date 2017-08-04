const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const jwt = require('../component/verifyJWT');
const permission = require('../component/permission');

const masterprovinsi = require('../schema/master/master.alamat.provinsi');
const masterKota = require('../schema/master/master.alamat.kota');

const router = express.Router();
const func = "masterprovinsi"

router.use(bodyParser.urlencoded({extended : false}));
router.use(bodyParser.json());

mongoose.Promise = global.Promise;

router.use(jwt.claimToken);

router.get('/', function (req, res, next) {
	// checking permission
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {

			masterprovinsi
			.find()
			.exec(function (err, provinsi) {
				if (err) {
					res
					.json({
						success : false,
						message : "something wrong",
						error : err
					})
					.status(500)
				}else if (!provinsi || provinsi == null || provinsi == undefined) {
					res
					.json({
						success : false,
						message : "provinsi not found"
					})
					.status(404)
				}else{
					res
					.json({
						success : true,
						data : provinsi
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
			masterprovinsi
			.find({_id : id})
			.exec(function (err, provinsi) {
				if (err) {
					res
					.json({
						success : false,
						message : "something wrong",
						error : err
					})
					.status(500)
				}else if (!provinsi || provinsi == null || provinsi == undefined) {
					res
					.json({
						success : false,
						message : "provinsi not found"
					})
					.status(404)
				}else{
					res
					.json({
						success : true,
						data : provinsi
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

			masterprovinsi
			.find({
				keterangan : req.body.provinsi
			})
			.exec(function (err, provinsi) {
				if (err) {
					res
					.json({
						success : false,
						message : "something wrong",
						error : err
					})
					.status(500)
				}else if (!provinsi || provinsi == null || provinsi == undefined || provinsi.length == 0 ) {
					var provinsi = new masterprovinsi({
						keterangan : req.body.provinsi
					})

					provinsi
					.save(function (err) {
						if (err) {
							res
							.json({
								success : false,
								message : "failed to save provinsi berkala",
								error : err
							})
						}else{
							res
							.json({
								success : true,
								message : "success to save provinsi berkala"
							})
						}
					})

				}else{
					res
					.json({
						success : false,
						message : "provinsi is exist"
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

			masterprovinsi
			.find({
				keterangan : req.body.provinsi
			})
			.exec(function (err, provinsi) {
				if (err) {
					res
					.json({
						success : false,
						message : "something wrong",
						error : err
					})
					.status(500)
				}else if (!provinsi || provinsi == null || provinsi == undefined || provinsi.length == 0 ) {
					
					var id = req.params.id
					var provinsi = ({
						keterangan : req.body.provinsi
					})

					masterprovinsi
					.findOneAndUpdate(
						{_id : id},
						provinsi,
						function (err, provinsi) {
							if (err) {
								res
								.json({
									success : false,
									message : "failed to update provinsi berkala",
									error : err
								})
								.status(500)

							}else if (!provinsi) {
								res
								.json({
									success : false,
									message : "provinsi berkala not found"
								})
								.status(404)

							}else{
								res
								.json({
									success : true,
									message : "success to update provinsi berkala"
								})
								.status(200)
							}
						}
					)

				}else{
					res
					.json({
						success : false,
						message : "provinsi is exist"
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

					masterprovinsi
					.remove(
						{_id : id},
						function (err) {
							if (err) {
								res
								.json({
									success : false,
									message : "failed to remove provinsi berkala",
									error : err
								})
								.status(500)
							}else{
								res
								.json({
									success : true,
									message : "success to remove provinsi berkala"
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
	masterKota
	.findOne({"provinsi" : id})
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