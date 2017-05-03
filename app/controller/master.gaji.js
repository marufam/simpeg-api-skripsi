const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const jwt = require('../component/verifyJWT');
const mastergaji = require('../schema/master/master.gaji');

const router = express.Router();

router.use(bodyParser.urlencoded({extended : false}));
router.use(bodyParser.json());

mongoose.Promise = global.Promise;

router.use(jwt.claimToken);

router.get('/', function (req, res, next) {
	mastergaji
	.find()
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
})
 
router.get('/:id', function (req, res, next) {
	var id = req.params.id;
	mastergaji
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


router.post('/simpan', function (req, res, next) {
	var gaji = new mastergaji({
		masakerja : req.body.masakerja,
		nominal : req.body.nominal,
		golruang : req.body.golruang,
		perpres : req.body.perpres
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
		masakerja : req.body.masakerja,
		nominal : req.body.nominal,
		golruang : req.body.golruang,
		perpres : req.body.perpres
	})

	mastergaji
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
	mastergaji
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