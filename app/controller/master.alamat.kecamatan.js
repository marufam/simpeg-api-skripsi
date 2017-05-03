const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const jwt = require('../component/verifyJWT');
const masterkecamatan = require('../schema/master/master.alamat.kecamatan');

const router = express.Router();

router.use(bodyParser.urlencoded({extended : false}));
router.use(bodyParser.json());

mongoose.Promise = global.Promise;

router.use(jwt.claimToken);

router.get('/', function (req, res, next) {
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
})
 
router.get('/:id', function (req, res, next) {
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
});


router.post('/simpan', function (req, res, next) {
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
})

router.put('/:id', function (req, res, next) {
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

})

router.delete('/:id', function (req, res, next) {
	var id = req.params.id
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
})
module.exports = router;