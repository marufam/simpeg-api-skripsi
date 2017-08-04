const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const jwt = require('../component/verifyJWT');
const permission = require('../component/permission');

const pegawaiJabatan = require('../schema/pegawai.jabatan');
const pegawaiBiodata = require('../schema/pegawai.biodata');
const router = express.Router();

const func = "jabatan"

router.use(bodyParser.urlencoded({extended : false}));
router.use(bodyParser.json());

router.use(jwt.claimToken);

mongoose.Promise = global.Promise;

router.get('/nip/:nip',function (req, res, next) {
	// checking permission
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {
			// if allowed
			var nip = req.params.nip;
			pegawaiJabatan
			.find({"nip": nip})
			.populate({
				path : "unitInduk",
				select : "keterangan"
			})
			.populate({
				path :"unitKerja",
				select : "keterangan"
			})
			.populate({
				path : "golongan",
				populate : {
					path : "golongan",
					select : "keterangan"
				}
			})
			.populate({
				path : "golongan",
				populate : {
					path : "ruang",
					select : "keterangan"
				}
			})
			.exec(function (err,jabatan) {
				if (err){ 
					res.json({
						success : false,
						message : "something wrong",
						error : err
					})
				} else if (!jabatan){
					res.json({
						success : false,
						message : "data not found"
					})
				}else{
					res.json({
						success : true,
						data : jabatan
					})
					// console.log(req.decoded._doc);
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
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {

			var id = req.params.id;
			pegawaiJabatan
			.findOne({"_id": id})
			.populate({
				path : "unitInduk",
				select : "keterangan"
			})
			.populate({
				path :"unitKerja",
				select : "keterangan"
			})
			.populate({
				path : "golongan",
				populate : {
					path : "golongan",
					select : "keterangan"
				}
			})
			.populate({
				path : "golongan",
				populate : {
					path : "ruang",
					select : "keterangan"
				}
			})
			.exec(function (err,jabatan) {
				if (err){ 
					res.json({
						success : false,
						message : "something wrong",
						error : err
					})
				} else if (!jabatan){
					res.json({
						success : false,
						message : "data not found"
					})
				}else{
					res.json({
						success : true,
						data : [jabatan]
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

router.post('/', function (req, res, next) {
	console.log(req.body)
	var role = req.decoded._doc
	permission.check(role, func, req.method,function (cb) {
		console.log(cb)
		if (cb == "true") {

			var newJabatan = new pegawaiJabatan({
				nip : req.body.nip,
				SO : req.body.so,
				jenisJabatan : req.body.jenisJabatan,
				tmtjabatan : req.body.tmtjabatan,
				pejabatPengangkat : req.body.pejabatPengangkat,
				noSK : req.body.noSK,
				tglSK : req.body.tglSK,
				unitInduk : req.body.unitInduk,
				unitKerja : req.body.unitKerja,
				posisi : req.body.posisi,
				eselon : req.body.eselon,
				golongan : req.body.golongan,
			})

			newJabatan
			.save(function (err, data) {
				if (err) {
					res
					.json({
						success : false,
						message : "failed to save jabatan",
						error : err
					})
					.status(500)
				}else{
					pegawaiBiodata
					.findOneAndUpdate(
						{"nip.nipBaru" : req.body.nip},
						{$push : {jabatan : data._id }},
						function (err) {
							if (err) {
								res
								.json({
									success : false,
									message : "failed push to ref jabatan"
								})
								.status(500)
							}else{
								res
								.json({
									success : true,
									message : "success to save jabatan"
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
	var role = req.decoded._doc
	console.log(req.body[0].nip)
	permission.check(role, func, req.method,function (cb) {
		console.log(cb)
		if (cb == "true") {
			var id = req.params.id;
			var editpegawai = ({
				nip : req.body[0].nip,
				SO : req.body[0].so,
				jenisJabatan : req.body[0].jenisJabatan,
				tmtjabatan : req.body[0].tmtjabatan,
				pejabatPengangkat : req.body[0].pejabatPengangkat,
				noSK : req.body[0].noSK,
				tglSK : req.body[0].tglSK,
				unitInduk : req.body[0].unitInduk,
				unitKerja : req.body[0].unitKerja,
				posisi : req.body[0].posisi,
				eselon : req.body[0].eselon,
				golongan : req.body[0].golongan,
			})

			pegawaiJabatan
			.findOneAndUpdate(
				{"_id" : id},
				editpegawai,
				function (err, result) {
					if (err) {
						res
						.json({
							success : false,
							message : "failed to update data",
							error : err
						})
						.status(500)
					}else{
						res
						.json({
							success : true,
							message : "success to update data"
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
	var role = req.decoded._doc
	permission.check(role, func, req.method,function (cb) {
		console.log(cb)
		if (cb == "true") {

			var id = req.params.id;
			pegawaiJabatan
			.remove(
				{ _id: id	},
				function (err) {
					if (err) {
						res
						.json({
							success : false,
							message : "failed to remove pegawai"
						})
						.status(500)
					}else{
						res
						.json({
							success : true,
							message : "success to remove data"
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

module.exports = router;