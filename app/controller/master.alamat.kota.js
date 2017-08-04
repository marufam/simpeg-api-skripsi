const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const jwt = require('../component/verifyJWT');
const permission = require('../component/permission');

const masterkota = require('../schema/master/master.alamat.kota');
const masterkecamatan = require('../schema/master/master.alamat.kecamatan');

const router = express.Router();
const func = "masterkota"

router.use(bodyParser.urlencoded({extended : false}));
router.use(bodyParser.json());

mongoose.Promise = global.Promise;

router.use(jwt.claimToken);

router.get('/provinsi/:id/pages/:page', function (req, res, next) {
	// checking permission
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {
			masterkota
			.find({provinsi : req.params.id})
			.skip(10 * req.params.page)
			.limit(10)
			.exec(function (err, kota) {
				if (err) {
					res
					.json({
						success : false,
						message : "something wrong",
						error : err
					})
					.status(500)
				}else if (!kota || kota == null || kota == undefined) {
					res
					.json({
						success : false,
						message : "kota not found"
					})
					.status(404)
				}else{
					res
					.json({
						success : true,
						data : kota
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
			masterkota
			.find({_id : id})
			.populate({
				path : "provinsi",
				select : "keterangan"
			})
			.exec(function (err, kota) {
				if (err) {
					res
					.json({
						success : false,
						message : "something wrong",
						error : err
					})
					.status(500)
				}else if (!kota || kota == null || kota == undefined) {
					res
					.json({
						success : false,
						message : "kota not found"
					})
					.status(404)
				}else{
					res
					.json({
						success : true,
						data : kota
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

//untuk dropdown menu form data
router.get('/provinsi/:id', function (req, res, next) {
	// checking permission
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {

			var id = req.params.id;
			masterkota
			.find({provinsi : id})
			.exec(function (err, kota) {
				if (err) {
					res
					.json({
						success : false,
						message : "something wrong",
						error : err
					})
					.status(500)
				}else if (!kota || kota == null || kota == undefined) {
					res
					.json({
						success : false,
						message : "kota not found"
					})
					.status(404)
				}else{
					res
					.json({
						success : true,
						data : kota
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

			masterkota
			.find({
					keterangan : req.body.kota,
					provinsi : req.body.provinsi
				})
			.exec(function (err, kota) {
				if (err) {
					res
					.json({
						success : false,
						message : "something wrong",
						error : err
					})
					.status(500)
				}else if (!kota || kota == null || kota == undefined || kota.length == 0 ) {
					
					var kota = new masterkota({
						keterangan : req.body.kota,
						provinsi : req.body.provinsi
					})

					kota
					.save(function (err) {
						if (err) {
							res
							.json({
								success : false,
								message : "failed to save kota berkala",
								error : err
							})
						}else{
							res
							.json({
								success : true,
								message : "success to save kota berkala"
							})
						}
					})
				}else{
					res
					.json({
						success : false,
						message : "kota is exist"
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

			var id = req.params.id;
			masterkota
			.find({
					keterangan : req.body.kota,
					provinsi : req.body.provinsi
				})
			.exec(function (err, kota) {
				if (err) {
					res
					.json({
						success : false,
						message : "something wrong",
						error : err
					})
					.status(500)
				}else if (!kota || kota == null || kota == undefined || kota.length == 0 ) {
					
					var id = req.params.id
					var kota = ({
						keterangan : req.body.kota,
						provinsi : req.body.provinsi
					})

					masterkota
					.findOneAndUpdate(
						{_id : id},
						kota,
						function (err, kota) {
							if (err) {
								res
								.json({
									success : false,
									message : "failed to update kota berkala",
									error : err
								})
								.status(500)

							}else if (!kota) {
								res
								.json({
									success : false,
									message : "kota berkala not found"
								})
								.status(404)

							}else{
								res
								.json({
									success : true,
									message : "success to update kota berkala"
								})
								.status(200)
							}
						}
					)
					
				}else{
					res
					.json({
						success : false,
						message : "kota is exist"
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

					masterkota
					.remove(
						{_id : id},
						function (err) {
							if (err) {
								res
								.json({
									success : false,
									message : "failed to remove kota berkala",
									error : err
								})
								.status(500)
							}else{
								res
								.json({
									success : true,
									message : "success to remove kota berkala"
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
	masterkecamatan
	.findOne({"kota" : id})
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