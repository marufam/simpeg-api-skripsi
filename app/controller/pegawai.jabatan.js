const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const jwt = require('../component/verifyJWT');
const pegawaiJabatan = require('../schema/pegawai.jabatan');
const pegawaiBiodata = require('../schema/pegawai.biodata');

const router = express.Router();

router.use(bodyParser.urlencoded({extended : false}));
router.use(bodyParser.json());

router.use(jwt.claimToken);

mongoose.Promise = global.Promise;

router.get('/nip/:nip', function (req, res, next) {
	var nip = req.params.nip;
	pegawaiJabatan
	.find({"nip": nip})
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
			console.log(req.decoded._doc.login);
		}
	})
})

router.get('/:id', function (req, res, next) {
	var id = req.params.id;
	pegawaiJabatan
	.findOne({"_id": id})
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
			
		}
	})
})

router.post('/simpan', function (req, res, next) {
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
})

router.put('/:id', function (req, res, next) {
	var id = req.params.id;
	var newJabatan = ({
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

	pegawaiJabatan
	.findOneAndUpdate(
		{"_id" : id},
		newJabatan,
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
})

router.delete('/:id', function (req, res, next) {
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
})

module.exports = router;