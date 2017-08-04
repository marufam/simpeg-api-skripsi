
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const jwt = require('../component/verifyJWT');
const permission = require('../component/permission');

const masteruker = require('../schema/master/master.uker.detail');

const router = express.Router();
const func = "masteruker"

router.use(bodyParser.urlencoded({extended : false}));
router.use(bodyParser.json());

mongoose.Promise = global.Promise;

router.use(jwt.claimToken);

//get semua data uker 
router.get('/', function (req, res, next) {
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {	

			masteruker
			.find()
			.exec(function (err, uker) {
				if (err) {
					res
					.json({
						success : false,
						message : "something wrong",
						error : err
					})
					.status(500)
				}else if (!uker || uker == null || uker == undefined) {
					res
					.json({
						success : false,
						message : "uker not found"
					})
					.status(404)
				}else{
					res
					.json({
						success : true,
						data : uker
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

//get data uker berdasarkan id uker
router.get('/:id', function (req, res, next) {
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {	

			var id = req.params.id;
			masteruker
			.find({_id : id})
			.populate({
				path : "instansi",
				select : "keterangan"
			})
			.exec(function (err, uker) {
				if (err) {
					res
					.json({
						success : false,
						message : "something wrong",
						error : err
					})
					.status(500)
				}else if (!uker || uker == null || uker == undefined) {
					res
					.json({
						success : false,
						message : "uker not found"
					})
					.status(404)
				}else{
					res
					.json({
						success : true,
						data : uker
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

//get data uker berdasarkan kota
router.get('/instansi/:id/jenis/:jenis', function (req, res, next) {
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {	

			var id = req.params.id;
			masteruker
			.find({
				instansi : id,
				jenisPegawai : req.params.jenis
			})
			.exec(function (err, uker) {
				if (err) {
					res
					.json({
						success : false,
						message : "something wrong",
						error : err
					})
					.status(500)
				}else if (!uker || uker == null || uker == undefined) {
					res
					.json({
						success : false,
						message : "uker not found"
					})
					.status(404)
				}else{
					res
					.json({
						success : true,
						data : uker
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

			var id = req.params.id;
			masteruker
			.find({
				keterangan : req.body.uker,
				jenisPegawai : req.body.jenisPegawai,
				instansi : req.body.instansi
			})
			.exec(function (err, uker) {
				if (err) {
					res
					.json({
						success : false,
						message : "something wrong",
						error : err
					})
					.status(500)
				}else if (!uker || uker == null || uker == undefined || uker.length == 0 ) {
					var uker = new masteruker({
						keterangan : req.body.uker,
						jenisPegawai : req.body.jenisPegawai,
						instansi : req.body.instansi
					})

					uker
					.save(function (err) {
						if (err) {
							res
							.json({
								success : false,
								message : "failed to save uker berkala",
								error : err
							})
						}else{
							res
							.json({
								success : true,
								message : "success to save uker berkala"
							})
						}
					})

				}else{
					res
					.json({
						success : true,
						data : uker
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

//edit data uker berdasarkan id uker
router.put('/:id', function (req, res, next) {
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {	

			var id = req.params.id
			var uker = ({
				keterangan : req.body.uker,
				jenisPegawai : req.body.jenisPegawai,
				instansi : req.body.instansi
			})

			masteruker
			.findOneAndUpdate(
				{_id : id},
				uker,
				function (err, uker) {
					if (err) {
						res
						.json({
							success : false,
							message : "failed to update uker berkala",
							error : err
						})
						.status(500)

					}else if (!uker) {
						res
						.json({
							success : false,
							message : "uker berkala not found"
						})
						.status(404)

					}else{
						res
						.json({
							success : true,
							message : "success to update uker berkala"
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
			masteruker
			.remove(
				{_id : id},
				function (err) {
					if (err) {
						res
						.json({
							success : false,
							message : "failed to remove uker berkala",
							error : err
						})
						.status(500)
					}else{
						res
						.json({
							success : true,
							message : "success to remove uker berkala"
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