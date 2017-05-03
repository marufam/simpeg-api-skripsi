const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const jwt = require('../component/verifyJWT');
const pegawaiGajiberkala = require('../schema/pegawai.gajiberkala');

const router = express.Router();

router.use(bodyParser.urlencoded({extended : false}));
router.use(bodyParser.json());

mongoose.Promise = global.Promise;

router.use(jwt.claimToken);

router.get('/:id', function (req, res, next) {
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
});

router.get('/nip/:nip', function (req, res, next) {
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
});


router.post('/simpan', function (req, res, next) {
	var gaji = new pegawaiGajiberkala({
		nip : req.body.nip,
		pejabatPengangkat : req.body.pejabatPengangkat,
		NomorSK : req.body.noSK,
		tglSK : req.body.tglSK,
		gol : req.body.golongan,
		masaKerja : req.body.masaKerja,
		tmtSK : req.body.tmtSK,
		gaji : req.body.gaji
	})

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
})

router.put('/:id', function (req, res, next) {
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

})

router.delete('/:id', function (req, res, next) {
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
})
module.exports = router;