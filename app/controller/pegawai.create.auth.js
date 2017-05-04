const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const jwt = require('../component/verifyJWT');
const masterperpres = require('../schema/pegawai.login');

const router = express.Router();

router.use(bodyParser.urlencoded({extended : false}));
router.use(bodyParser.json());

mongoose.Promise = global.Promise;

router.use(jwt.claimToken);

router.get('/', function (req, res, next) {
	masterperpres
	.find()
	.exec(function (err, perpres) {
		if (err) {
			res
			.json({
				success : false,
				message : "something wrong",
				error : err
			})
			.status(500)
		}else if (!perpres || perpres == null || perpres == undefined) {
			res
			.json({
				success : false,
				message : "perpres not found"
			})
			.status(404)
		}else{
			res
			.json({
				success : true,
				data : perpres
			})
			.status(200)
		}
	})
})
 
router.get('/:id', function (req, res, next) {
	var id = req.params.id;
	masterperpres
	.find({_id : id})
	.exec(function (err, perpres) {
		if (err) {
			res
			.json({
				success : false,
				message : "something wrong",
				error : err
			})
			.status(500)
		}else if (!perpres || perpres == null || perpres == undefined) {
			res
			.json({
				success : false,
				message : "perpres not found"
			})
			.status(404)
		}else{
			res
			.json({
				success : true,
				data : perpres
			})
			.status(200)
		}
	})
});


router.post('/simpan', function (req, res, next) {
	var perpres = new masterperpres({
		nomor : req.body.nomor,
		status : req.body.status
	})

	perpres
	.save(function (err) {
		if (err) {
			res
			.json({
				success : false,
				message : "failed to save perpres berkala",
				error : err
			})
		}else{
			res
			.json({
				success : true,
				message : "success to save perpres berkala"
			})
		}
	})
})

router.put('/:id', function (req, res, next) {
	var id = req.params.id
	var perpres = ({
		nomor : req.body.nomor,
		status : req.body.status
	})

	masterperpres
	.findOneAndUpdate(
		{_id : id},
		perpres,
		function (err, perpres) {
			if (err) {
				res
				.json({
					success : false,
					message : "failed to update perpres berkala",
					error : err
				})
				.status(500)

			}else if (!perpres) {
				res
				.json({
					success : false,
					message : "perpres berkala not found"
				})
				.status(404)

			}else{
				res
				.json({
					success : true,
					message : "success to update perpres berkala"
				})
				.status(200)
			}
		}
	)

})

router.delete('/:id', function (req, res, next) {
	var id = req.params.id
	masterperpres
	.remove(
		{_id : id},
		function (err) {
			if (err) {
				res
				.json({
					success : false,
					message : "failed to remove perpres berkala",
					error : err
				})
				.status(500)
			}else{
				res
				.json({
					success : true,
					message : "success to remove perpres berkala"
				})
			}
		}
	)
})
module.exports = router;