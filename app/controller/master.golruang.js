const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const jwt = require('../component/verifyJWT');
const mastergolruang = require('../schema/master/master.golruang');

const router = express.Router();

router.use(bodyParser.urlencoded({extended : false}));
router.use(bodyParser.json());

mongoose.Promise = global.Promise;

router.use(jwt.claimToken);

router.get('/', function (req, res, next) {
	mastergolruang
	.find()
	.exec(function (err, golruang) {
		if (err) {
			res
			.json({
				success : false,
				message : "something wrong",
				error : err
			})
			.status(500)
		}else if (!golruang || golruang == null || golruang == undefined) {
			res
			.json({
				success : false,
				message : "golruang not found"
			})
			.status(404)
		}else{
			res
			.json({
				success : true,
				data : golruang
			})
			.status(200)
		}
	})
})
 
router.get('/:id', function (req, res, next) {
	var id = req.params.id;
	mastergolruang
	.find({_id : id})
	.exec(function (err, golruang) {
		if (err) {
			res
			.json({
				success : false,
				message : "something wrong",
				error : err
			})
			.status(500)
		}else if (!golruang || golruang == null || golruang == undefined) {
			res
			.json({
				success : false,
				message : "golruang not found"
			})
			.status(404)
		}else{
			res
			.json({
				success : true,
				data : golruang
			})
			.status(200)
		}
	})
});


router.post('/simpan', function (req, res, next) {
	var golruang = new mastergolruang({
		golongan : req.body.golongan,
		ruang : req.body.ruang
	})

	golruang
	.save(function (err) {
		if (err) {
			res
			.json({
				success : false,
				message : "failed to save golruang berkala",
				error : err
			})
		}else{
			res
			.json({
				success : true,
				message : "success to save golruang berkala"
			})
		}
	})
})

router.put('/:id', function (req, res, next) {
	var id = req.params.id
	var golruang = ({
		golongan : req.body.golongan,
		ruang : req.body.ruang
	})

	mastergolruang
	.findOneAndUpdate(
		{_id : id},
		golruang,
		function (err, golruang) {
			if (err) {
				res
				.json({
					success : false,
					message : "failed to update golruang berkala",
					error : err
				})
				.status(500)

			}else if (!golruang) {
				res
				.json({
					success : false,
					message : "golruang berkala not found"
				})
				.status(404)

			}else{
				res
				.json({
					success : true,
					message : "success to update golruang berkala"
				})
				.status(200)
			}
		}
	)

})

router.delete('/:id', function (req, res, next) {
	var id = req.params.id
	mastergolruang
	.remove(
		{_id : id},
		function (err) {
			if (err) {
				res
				.json({
					success : false,
					message : "failed to remove golruang berkala",
					error : err
				})
				.status(500)
			}else{
				res
				.json({
					success : true,
					message : "success to remove golruang berkala"
				})
			}
		}
	)
})
module.exports = router;