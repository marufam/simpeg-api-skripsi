const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const jwt = require('../component/verifyJWT');
const permission = require('../component/permission');

const pegawaiGajiberkala = require('../schema/pegawai.gajiberkala');

const router = express.Router();
const func = "gajiberkala"

router.use(bodyParser.urlencoded({extended : false}));
router.use(bodyParser.json());

mongoose.Promise = global.Promise;

router.use(jwt.claimToken);

router.get('/', function (req, res, next) {
	// checking permission
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {

			pegawaiGajiberkala
			.find()
			.exec(function (err, gaji) {
				if (err) {
					res
					.json({
						success : false,
						message : "something wrong",
						error : err
					})
					.status(500)
				}else if (!gaji || gaji == null || gaji == undefined) {
					res
					.json({
						success : false,
						message : "gaji not found"
					})
					.status(404)
				}else{
					res
					.json({
						success : true,
						data : gaji
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
			pegawaiGajiberkala
			.find({_id : id})
			.exec(function (err, gaji) {
				if (err) {
					res
					.json({
						success : false,
						message : "something wrong",
						error : err
					})
					.status(500)
				}else if (!gaji || gaji == null || gaji == undefined) {
					res
					.json({
						success : false,
						message : "gaji not found"
					})
					.status(404)
				}else{
					res
					.json({
						success : true,
						data : gaji
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

router.get('/nip/:nip', function (req, res, next) {
	// checking permission
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {

			var nip = req.params.nip;
			pegawaiGajiberkala
			.find({nip : nip})
			.limit(5)
			.exec(function (err, gaji) {
				if (err) {
					res
					.json({
						success : false,
						message : "something wrong",
						error : err
					})
					.status(500)
				}else if (!gaji || gaji == null || gaji == undefined) {
					res
					.json({
						success : false,
						message : "gaji not found"
					})
					.status(404)
				}else{
					res
					.json({
						success : true,
						data : gaji
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


router.post('/', function (req, res, next) {
	// checking permission
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {

			var gaji = new pegawaiGajiberkala({
				nip : req.body.nip,
				pejabatPengangkat : req.body.pejabatPengangkat,
				NomorSK : req.body.noSK,
				tglSK : req.body.tglSK,
				gol : req.body.golongan,
				masaKerja : {
					tahun : req.body.masaKerja_tahun,
					bulan : req.body.masaKerja_bulan
				},
				tmtSK : req.body.tmtSK,
				gaji : req.body.gaji
			})

			// res.json(req.body)
			gaji
			.save(function (err) {
				if (err) {
					res
					.json({
						success : false,
						message : "failed to save gaji berkala",
						error : err
					})
				}else{
					res
					.json({
						success : true,
						message : "success to save gaji berkala"
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
			var gaji = ({
				nip : req.body.nip,
				pejabatPengangkat : req.body.pejabatPengangkat,
				NomorSK : req.body.noSK,
				tglSK : req.body.tglSK,
				gol : req.body.golongan,
				masaKerja : req.body.masaKerja,
				tmtSK : req.body.tmtSK,
				gaji : req.body.gaji
			})

			pegawaiGajiberkala
			.findOneAndUpdate(
				{_id : id},
				gaji,
				function (err, gaji) {
					if (err) {
						res
						.json({
							success : false,
							message : "failed to update gaji berkala",
							error : err
						})
						.status(500)

					}else if (!gaji) {
						res
						.json({
							success : false,
							message : "gaji berkala not found"
						})
						.status(404)

					}else{
						res
						.json({
							success : true,
							message : "success to update gaji berkala"
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
			pegawaiGajiberkala
			.remove(
				{_id : id},
				function (err) {
					if (err) {
						res
						.json({
							success : false,
							message : "failed to remove gaji berkala",
							error : err
						})
						.status(500)
					}else{
						res
						.json({
							success : true,
							message : "success to remove gaji berkala"
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