const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const jwt = require('../component/verifyJWT');
const masterruang = require('../schema/master/master.golruang.ruang');

const router = express.Router();

router.use(bodyParser.urlencoded({extended : false}));
router.use(bodyParser.json());

mongoose.Promise = global.Promise;

router.use(jwt.claimToken);

router.get('/', function (req, res, next) {
	masterruang
	.find()
	.exec(function (err, ruang) {
		if (err) {
			res
			.json({
				success : false,
				message : "something wrong",
				error : err
			})
			.status(500)
		}else if (!ruang || ruang == null || ruang == undefined) {
			res
			.json({
				success : false,
				message : "ruang not found"
			})
			.status(404)
		}else{
			res
			.json({
				success : true,
				data : ruang
			})
			.status(200)
		}
	})
})
 
router.get('/:id', function (req, res, next) {
	var id = req.params.id;
	masterruang
	.find({_id : id})
	.exec(function (err, ruang) {
		if (err) {
			res
			.json({
				success : false,
				message : "something wrong",
				error : err
			})
			.status(500)
		}else if (!ruang || ruang == null || ruang == undefined) {
			res
			.json({
				success : false,
				message : "ruang not found"
			})
			.status(404)
		}else{
			res
			.json({
				success : true,
				data : ruang
			})
			.status(200)
		}
	})
});


router.post('/simpan', function (req, res, next) {
	var ruang = new masterruang({
		keterangan : req.body.ruang
	})

	ruang
	.save(function (err) {
		if (err) {
			res
			.json({
				success : false,
				message : "failed to save ruang berkala",
				error : err
			})
		}else{
			res
			.json({
				success : true,
				message : "success to save ruang berkala"
			})
		}
	})
})

router.put('/:id', function (req, res, next) {
	var id = req.params.id
	var ruang = ({
		keterangan : req.body.ruang
	})

	masterruang
	.findOneAndUpdate(
		{_id : id},
		ruang,
		function (err, ruang) {
			if (err) {
				res
				.json({
					success : false,
					message : "failed to update ruang berkala",
					error : err
				})
				.status(500)

			}else if (!ruang) {
				res
				.json({
					success : false,
					message : "ruang berkala not found"
				})
				.status(404)

			}else{
				res
				.json({
					success : true,
					message : "success to update ruang berkala"
				})
				.status(200)
			}
		}
	)

})

router.delete('/:id', function (req, res, next) {
	var id = req.params.id
	masterruang
	.remove(
		{_id : id},
		function (err) {
			if (err) {
				res
				.json({
					success : false,
					message : "failed to remove ruang berkala",
					error : err
				})
				.status(500)
			}else{
				res
				.json({
					success : true,
					message : "success to remove ruang berkala"
				})
			}
		}
	)
})
module.exports = router;