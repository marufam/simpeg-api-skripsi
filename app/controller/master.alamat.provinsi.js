const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const jwt = require('../component/verifyJWT');
const masterprovinsi = require('../schema/master/master.alamat.provinsi');

const router = express.Router();

router.use(bodyParser.urlencoded({extended : false}));
router.use(bodyParser.json());

mongoose.Promise = global.Promise;

router.use(jwt.claimToken);

router.get('/', function (req, res, next) {
	masterprovinsi
	.find()
	.exec(function (err, provinsi) {
		if (err) {
			res
			.json({
				success : false,
				message : "something wrong",
				error : err
			})
			.status(500)
		}else if (!provinsi || provinsi == null || provinsi == undefined) {
			res
			.json({
				success : false,
				message : "provinsi not found"
			})
			.status(404)
		}else{
			res
			.json({
				success : true,
				data : provinsi
			})
			.status(200)
		}
	})
})
 
router.get('/:id', function (req, res, next) {
	var id = req.params.id;
	masterprovinsi
	.find({_id : id})
	.exec(function (err, provinsi) {
		if (err) {
			res
			.json({
				success : false,
				message : "something wrong",
				error : err
			})
			.status(500)
		}else if (!provinsi || provinsi == null || provinsi == undefined) {
			res
			.json({
				success : false,
				message : "provinsi not found"
			})
			.status(404)
		}else{
			res
			.json({
				success : true,
				data : provinsi
			})
			.status(200)
		}
	})
});


router.post('/simpan', function (req, res, next) {
	var provinsi = new masterprovinsi({
		keterangan : req.body.provinsi
	})

	provinsi
	.save(function (err) {
		if (err) {
			res
			.json({
				success : false,
				message : "failed to save provinsi berkala",
				error : err
			})
		}else{
			res
			.json({
				success : true,
				message : "success to save provinsi berkala"
			})
		}
	})
})

router.put('/:id', function (req, res, next) {
	var id = req.params.id
	var provinsi = ({
		keterangan : req.body.provinsi
	})

	masterprovinsi
	.findOneAndUpdate(
		{_id : id},
		provinsi,
		function (err, provinsi) {
			if (err) {
				res
				.json({
					success : false,
					message : "failed to update provinsi berkala",
					error : err
				})
				.status(500)

			}else if (!provinsi) {
				res
				.json({
					success : false,
					message : "provinsi berkala not found"
				})
				.status(404)

			}else{
				res
				.json({
					success : true,
					message : "success to update provinsi berkala"
				})
				.status(200)
			}
		}
	)

})

router.delete('/:id', function (req, res, next) {
	var id = req.params.id
	masterprovinsi
	.remove(
		{_id : id},
		function (err) {
			if (err) {
				res
				.json({
					success : false,
					message : "failed to remove provinsi berkala",
					error : err
				})
				.status(500)
			}else{
				res
				.json({
					success : true,
					message : "success to remove provinsi berkala"
				})
			}
		}
	)
})
module.exports = router;