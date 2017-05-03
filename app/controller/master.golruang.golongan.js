const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const jwt = require('../component/verifyJWT');
const mastergolongan = require('../schema/master/master.golruang.golongan');

const router = express.Router();

router.use(bodyParser.urlencoded({extended : false}));
router.use(bodyParser.json());

mongoose.Promise = global.Promise;

router.use(jwt.claimToken);

router.get('/', function (req, res, next) {
	mastergolongan
	.find()
	.exec(function (err, golongan) {
		if (err) {
			res
			.json({
				success : false,
				message : "something wrong",
				error : err
			})
			.status(500)
		}else if (!golongan || golongan == null || golongan == undefined) {
			res
			.json({
				success : false,
				message : "golongan not found"
			})
			.status(404)
		}else{
			res
			.json({
				success : true,
				data : golongan
			})
			.status(200)
		}
	})
})
 
router.get('/:id', function (req, res, next) {
	var id = req.params.id;
	mastergolongan
	.find({_id : id})
	.exec(function (err, golongan) {
		if (err) {
			res
			.json({
				success : false,
				message : "something wrong",
				error : err
			})
			.status(500)
		}else if (!golongan || golongan == null || golongan == undefined) {
			res
			.json({
				success : false,
				message : "golongan not found"
			})
			.status(404)
		}else{
			res
			.json({
				success : true,
				data : golongan
			})
			.status(200)
		}
	})
});


router.post('/simpan', function (req, res, next) {
	var golongan = new mastergolongan({
		keterangan : req.body.golongan
	})

	golongan
	.save(function (err) {
		if (err) {
			res
			.json({
				success : false,
				message : "failed to save golongan berkala",
				error : err
			})
		}else{
			res
			.json({
				success : true,
				message : "success to save golongan berkala"
			})
		}
	})
})

router.put('/:id', function (req, res, next) {
	var id = req.params.id
	var golongan = ({
		keterangan : req.body.golongan
	})

	mastergolongan
	.findOneAndUpdate(
		{_id : id},
		golongan,
		function (err, golongan) {
			if (err) {
				res
				.json({
					success : false,
					message : "failed to update golongan berkala",
					error : err
				})
				.status(500)

			}else if (!golongan) {
				res
				.json({
					success : false,
					message : "golongan berkala not found"
				})
				.status(404)

			}else{
				res
				.json({
					success : true,
					message : "success to update golongan berkala"
				})
				.status(200)
			}
		}
	)

})

router.delete('/:id', function (req, res, next) {
	var id = req.params.id
	mastergolongan
	.remove(
		{_id : id},
		function (err) {
			if (err) {
				res
				.json({
					success : false,
					message : "failed to remove golongan berkala",
					error : err
				})
				.status(500)
			}else{
				res
				.json({
					success : true,
					message : "success to remove golongan berkala"
				})
			}
		}
	)
})
module.exports = router;