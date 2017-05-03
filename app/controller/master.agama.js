const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const jwt = require('../component/verifyJWT');
const masteragama = require('../schema/master/master.agama');

const router = express.Router();

router.use(bodyParser.urlencoded({extended : false}));
router.use(bodyParser.json());

mongoose.Promise = global.Promise;

router.use(jwt.claimToken);

router.get('/', function (req, res, next) {
	masteragama
	.find()
	.exec(function (err, agama) {
		if (err) {
			res
			.json({
				success : false,
				message : "something wrong",
				error : err
			})
			.status(500)
		}else if (!agama || agama == null || agama == undefined) {
			res
			.json({
				success : false,
				message : "agama not found"
			})
			.status(404)
		}else{
			res
			.json({
				success : true,
				data : agama
			})
			.status(200)
		}
	})
})
 
router.get('/:id', function (req, res, next) {
	var id = req.params.id;
	masteragama
	.find({_id : id})
	.exec(function (err, agama) {
		if (err) {
			res
			.json({
				success : false,
				message : "something wrong",
				error : err
			})
			.status(500)
		}else if (!agama || agama == null || agama == undefined) {
			res
			.json({
				success : false,
				message : "agama not found"
			})
			.status(404)
		}else{
			res
			.json({
				success : true,
				data : agama
			})
			.status(200)
		}
	})
});


router.post('/simpan', function (req, res, next) {
	var agama = new masteragama({
		keterangan : req.body.agama
	})

	agama
	.save(function (err) {
		if (err) {
			res
			.json({
				success : false,
				message : "failed to save agama berkala",
				error : err
			})
		}else{
			res
			.json({
				success : true,
				message : "success to save agama berkala"
			})
		}
	})
})

router.put('/:id', function (req, res, next) {
	var id = req.params.id
	var agama = ({
		keterangan : req.body.agama
	})

	masteragama
	.findOneAndUpdate(
		{_id : id},
		agama,
		function (err, agama) {
			if (err) {
				res
				.json({
					success : false,
					message : "failed to update agama berkala",
					error : err
				})
				.status(500)

			}else if (!agama) {
				res
				.json({
					success : false,
					message : "agama berkala not found"
				})
				.status(404)

			}else{
				res
				.json({
					success : true,
					message : "success to update agama berkala"
				})
				.status(200)
			}
		}
	)

})

router.delete('/:id', function (req, res, next) {
	var id = req.params.id
	masteragama
	.remove(
		{_id : id},
		function (err) {
			if (err) {
				res
				.json({
					success : false,
					message : "failed to remove agama berkala",
					error : err
				})
				.status(500)
			}else{
				res
				.json({
					success : true,
					message : "success to remove agama berkala"
				})
			}
		}
	)
})
module.exports = router;