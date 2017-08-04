
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const jwt = require('../component/verifyJWT');
const permission = require('../component/permission');

const masterkecamatan = require('../schema/master/master.alamat.kecamatan');
const pegawaiBio = require('../schema/pegawai.biodata');

const router = express.Router();
const func = "masterkelurahan"

router.use(bodyParser.urlencoded({extended : false}));
router.use(bodyParser.json());

mongoose.Promise = global.Promise;

router.use(jwt.claimToken);

//get semua data kecamatan 
router.get('/', function (req, res, next) {
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {	

			masterkecamatan
			.find()
			.exec(function (err, kecamatan) {
				if (err) {
					res
					.json({
						success : false,
						message : "something wrong",
						error : err
					})
					.status(500)
				}else if (!kecamatan || kecamatan == null || kecamatan == undefined) {
					res
					.json({
						success : false,
						message : "kecamatan not found"
					})
					.status(404)
				}else{
					res
					.json({
						success : true,
						data : kecamatan
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

//get data kecamatan berdasarkan id kecamatan
router.get('/:id', function (req, res, next) {
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {	

			var id = req.params.id;
			masterkecamatan
			.find({_id : id})
			.exec(function (err, kecamatan) {
				if (err) {
					res
					.json({
						success : false,
						message : "something wrong",
						error : err
					})
					.status(500)
				}else if (!kecamatan || kecamatan == null || kecamatan == undefined) {
					res
					.json({
						success : false,
						message : "kecamatan not found"
					})
					.status(404)
				}else{
					res
					.json({
						success : true,
						data : kecamatan
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

//get data kecamatan berdasarkan kota
router.get('/kota/:id', function (req, res, next) {
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {	

			var id = req.params.id;
			masterkecamatan
			.find({kota : id})
			.exec(function (err, kecamatan) {
				if (err) {
					res
					.json({
						success : false,
						message : "something wrong",
						error : err
					})
					.status(500)
				}else if (!kecamatan || kecamatan == null || kecamatan == undefined) {
					res
					.json({
						success : false,
						message : "kecamatan not found"
					})
					.status(404)
				}else{
					res
					.json({
						success : true,
						data : kecamatan
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
			masterkecamatan
			.find({
				keterangan : req.body.kecamatan,
				kota : req.body.kota
			})
			.exec(function (err, kecamatan) {
				if (err) {
					res
					.json({
						success : false,
						message : "something wrong",
						error : err
					})
					.status(500)
				}else if (!kecamatan || kecamatan == null || kecamatan == undefined || kecamatan.length == 0) {
					
					var kecamatan = new masterkecamatan({
						keterangan : req.body.kecamatan,
						kota : req.body.kota
					})

					kecamatan
					.save(function (err) {
						if (err) {
							res
							.json({
								success : false,
								message : "failed to save kecamatan berkala",
								error : err
							})
						}else{
							res
							.json({
								success : true,
								message : "success to save kecamatan berkala"
							})
						}
					})

				}else{
					res
					.json({
						success : false,
						message : "kecamatan is exist"
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

//edit data kecamatan berdasarkan id kecamatan
router.put('/:id', function (req, res, next) {
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {	
			var id = req.params.id;
			masterkecamatan
			.find({
				keterangan : req.body.kecamatan,
				kota : req.body.kota
			})
			.exec(function (err, kecamatan) {
				if (err) {
					res
					.json({
						success : false,
						message : "something wrong",
						error : err
					})
					.status(500)
				}else if (!kecamatan || kecamatan == null || kecamatan == undefined || kecamatan.length == 0) {
					
					var id = req.params.id
					var kecamatan = ({
						keterangan : req.body.kecamatan,
						kota : req.body.kota
					})

					masterkecamatan
					.findOneAndUpdate(
						{_id : id},
						kecamatan,
						function (err, kecamatan) {
							if (err) {
								res
								.json({
									success : false,
									message : "failed to update kecamatan berkala",
									error : err
								})
								.status(500)

							}else if (!kecamatan) {
								res
								.json({
									success : false,
									message : "kecamatan berkala not found"
								})
								.status(404)

							}else{
								res
								.json({
									success : true,
									message : "success to update kecamatan berkala"
								})
								.status(200)
							}
						}
					)

				}else{
					res
					.json({
						success : false,
						message : "kecamatan is exist"
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

					masterkecamatan
					.remove(
						{_id : id},
						function (err) {
							if (err) {
								res
								.json({
									success : false,
									message : "failed to remove kecamatan berkala",
									error : err
								})
								.status(500)
							}else{
								res
								.json({
									success : true,
									message : "success to remove kecamatan berkala"
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
	pegawaiBio
	.findOne({"datapersonal.alamat.kecamatan" : id})
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