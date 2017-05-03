const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const jwt = require('../component/verifyJWT');
const masterkeluarahan = require('../schema/master/master.alamat.keluarahan');

const router = express.Router();

router.use(bodyParser.urlencoded({extended : false}));
router.use(bodyParser.json());

mongoose.Promise = global.Promise;

router.use(jwt.claimToken);

router.get('/', function (req, res, next) {
	masterkeluarahan
	.find()
	.exec(function (err, keluarahan) {
		if (err) {
			res
			.json({
				success : false,
				message : "something wrong",
				error : err
			})
			.status(500)
		}else if (!keluarahan || keluarahan == null || keluarahan == undefined) {
			res
			.json({
				success : false,
				message : "keluarahan not found"
			})
			.status(404)
		}else{
			res
			.json({
				success : true,
				data : keluarahan
			})
			.status(200)
		}
	})
})
 
router.get('/:id', function (req, res, next) {
	var id = req.params.id;
	masterkeluarahan
	.find({_id : id})
	.exec(function (err, keluarahan) {
		if (err) {
			res
			.json({
				success : false,
				message : "something wrong",
				error : err
			})
			.status(500)
		}else if (!keluarahan || keluarahan == null || keluarahan == undefined) {
			res
			.json({
				success : false,
				message : "keluarahan not found"
			})
			.status(404)
		}else{
			res
			.json({
				success : true,
				data : keluarahan
			})
			.status(200)
		}
	})
});


router.post('/simpan', function (req, res, next) {
	var keluarahan = new masterkeluarahan({
		keterangan : req.body.keluarahan,
		kota : req.body.kota
	})

	keluarahan
	.save(function (err) {
		if (err) {
			res
			.json({
				success : false,
				message : "failed to save keluarahan berkala",
				error : err
			})
		}else{
			res
			.json({
				success : true,
				message : "success to save keluarahan berkala"
			})
		}
	})
})

router.put('/:id', function (req, res, next) {
	var id = req.params.id
	var keluarahan = ({
		keterangan : req.body.keluarahan,
		kota : req.body.kota
	})

	masterkeluarahan
	.findOneAndUpdate(
		{_id : id},
		keluarahan,
		function (err, keluarahan) {
			if (err) {
				res
				.json({
					success : false,
					message : "failed to update keluarahan berkala",
					error : err
				})
				.status(500)

			}else if (!keluarahan) {
				res
				.json({
					success : false,
					message : "keluarahan berkala not found"
				})
				.status(404)

			}else{
				res
				.json({
					success : true,
					message : "success to update keluarahan berkala"
				})
				.status(200)
			}
		}
	)

})

router.delete('/:id', function (req, res, next) {
	var id = req.params.id
	masterkeluarahan
	.remove(
		{_id : id},
		function (err) {
			if (err) {
				res
				.json({
					success : false,
					message : "failed to remove keluarahan berkala",
					error : err
				})
				.status(500)
			}else{
				res
				.json({
					success : true,
					message : "success to remove keluarahan berkala"
				})
			}
		}
	)
})
module.exports = router;