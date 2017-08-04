const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const jwt = require('../component/verifyJWT');
const permission = require('../component/permission');

const pegawaiPangkat = require('../schema/pegawai.pangkat');
const pegawaiBiodata = require('../schema/pegawai.biodata');

const router = express.Router();
const func = "pangkat"

router.use(bodyParser.urlencoded({extended : false}));
router.use(bodyParser.json());

mongoose.Promise = global.Promise;

router.use(jwt.claimToken);

router.get('/', function (req, res, next) {
	res.json("data ku");
})

router.get('/nip/:nip', function (req, res, next) {
	// checking permission
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {


			var nip = req.params.nip;
			pegawaiPangkat
			.find({"nip" : nip})
			.limit(5)
			.exec(function (err, pangkat) {
				if (!pangkat) {
					res
					.json({
						success : false,
						message : "pangkat not found",
					})
					.status(404)
				}else if (err) {
					res
					.json({
						success : false,
						message : "something wrong",
						error : err
					})
					.status(500)
				}else{
					res
					.json({
						success : true,
						message : "this is your pangkat",
						data : pangkat
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

router.get('/:id', function (req, res, next) {
	// checking permission
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {

			var id = req.params.id;
			pegawaiPangkat
			.findOne({_id : id})
			.exec(function (err, pangkat) {
				if (err) {
					res
					.json({
						success : false,
						message : "something wrong",
						error : err
					})
					.status(500)
				}else if (!pangkat) {
					res
					.json({
						success : false,
						message : "pangkat not found"
					})
					.status(404)
				}else{
					res
					.json({
						success : true,
						message : "this is your pangkat",
						data : [pangkat]
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

router.post('/simpan', function (req, res, next) {
	// checking permission
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {

			var newPangkat = new pegawaiPangkat({
				nip : req.body.nip,
				pejabatPengangkat : req.body.pejabatPengangkat,
				noSK : req.body.noSK,
				tglSK : req.body.tglSK,
				tmtGolongan : req.body.tmtSK,
				masaKerja : req.body.masaKerja,
				golongan : req.body.golongan,
				angkaKredit : req.body.angkaKredit,
				jenisPangkat : req.body.jenisPangkat,
				gaji : req.body.gaji
			})
			newPangkat
			.save(function (err, data) {
				if (err) {
					res
					.json({
						success : false,
						message : "failed to save pangkat",
						error : err
					})
					.status(500)
				}else{

					pegawaiBiodata
					.findOneAndUpdate(
						{"nip.nipBaru" : req.body.nip},
						{$push: {pangkat : data._id }},
						function (err) {
							if (err) {
								res
								.json({
									success : false,
									message : "failed push to ref biodata"
								})
								.status(500)
							}else{
								res
								.json({
									success : true,
									message : "success to save pangkat"
								})
								.status(200)
							}
						}
					)
					
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
			var newPangkat = ({
				nip : req.body.nip,
				pejabatPengangkat : req.body.pejabatPengangkat,
				noSK : req.body.noSK,
				tglSK : req.body.tglSK,
				tmtGolongan : req.body.tmtSK,
				masaKerja : req.body.masaKerja,
				golongan : req.body.golongan,
				angkaKredit : req.body.angkaKredit,
				jenisPangkat : req.body.jenisPangkat,
				gaji : req.body.gaji
			})

			pegawaiPangkat
			.findOneAndUpdate(
				{_id : id},
				newPangkat,
				function (err, result) {
					if (err) {
						res
						.json({
							success : false,
							message : "failed to update pangkat",
							error : err
						})
					}else{
						res
						.json({
							success : true,
							message : "success to update data"
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

router.delete('/:id', function (req, res, next) {
	// checking permission
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {

			var id = req.params.id;
			pegawaiPangkat
			.remove(
				{_id : id },
				function (err, data) {
					if (err) {
						res
						.json({
							success : false,
							message : "failed to remove data",
							error : err
						})
						.status(500)
					}else{
						pegawaiBiodata
						.findOneAndUpdate(
							{"nip.nipBaru": data.nip},
							{$pull : {pangkat : id}},
							function (err) {
								if (err) {
									res
									.json({
										success : false,
										message : "failed push to ref biodata"
									})
									.status(500)
								}else{
									res
									.json({
										success : true,
										message : "success to remove pangkat"
									})
									.status(200)
								}
							}
						)
					
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