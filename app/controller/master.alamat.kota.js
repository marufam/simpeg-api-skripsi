const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const jwt = require('../component/verifyJWT');
const masterkota = require('../schema/master/master.alamat.kota');

const router = express.Router();

router.use(bodyParser.urlencoded({extended : false}));
router.use(bodyParser.json());

mongoose.Promise = global.Promise;

router.use(jwt.claimToken);

router.get('/', function (req, res, next) {
	masterkota
	.find()
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
})
 
router.get('/:id', function (req, res, next) {
	var id = req.params.id;
	masterkota
	.find({_id : id})
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
});


router.post('/simpan', function (req, res, next) {
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
})

router.put('/:id', function (req, res, next) {
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

})

router.delete('/:id', function (req, res, next) {
	var id = req.params.id
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
})
module.exports = router;