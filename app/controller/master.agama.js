const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const permission = require('../component/permission');
const jwt = require('../component/verifyJWT');

const masteragama = require('../schema/master/master.agama');
const pegawaiBio = require('../schema/pegawai.biodata');

const func = "masteragama"
const router = express.Router();

router.use(bodyParser.urlencoded({extended : false}));
router.use(bodyParser.json());

mongoose.Promise = global.Promise;

router.use(jwt.claimToken);

router.get('/', function (req, res, next) {
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {	
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
		}else{
			// if denied
			res.json({
				success : false,
				message : "access denied"
			})
		}
	})
})
 
router.get('/:id', function (req, res, next) {
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {	

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

		}else{
			// if denied
			res.json({
				success : false,
				message : "access denied"
			})
		}
	})
});


router.post('/', function (req, res, next) {
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {	

			var id = req.params.id;
			masteragama
			.find({keterangan : req.body.agama})
			.exec(function (err, agama) {
				if (err) {
					res
					.json({
						success : false,
						message : "something wrong",
						error : err
					})
					.status(500)
				}else if (!agama || agama == null || agama == undefined || agama.length == 0) {
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

				}else{
					res
					.json({
						success : false,
						message : "agama "+ req.body.agama + " is exist"
					})
					.status(200)
				}
			})
					

		}else{
			// if denied
			res.json({
				success : false,
				message : "access denied"
			})
		}
	})
})

router.put('/:id', function (req, res, next) {
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {	

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

		}else{
			// if denied
			res.json({
				success : false,
				message : "access denied"
			})
		}
	})

})

router.delete('/:id', function (req, res, next) {
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {	

			var id = req.params.id
			cekitem(id, function (result) {
				if (result == true) {
					res
					.json({
						success : false,
						message : "you cant remove this item, this item in used"
					})
				}else{

					masteragama
					.remove(
						{_id : id},
						function (err) {
							if (err) {
								res
								.json({
									success : false,
									message : "failed to remove agama",
									error : err
								})
								.status(500)
							}else{
								res
								.json({
									success : true,
									message : "success to remove agama"
								})
							}
						}
					)
				}
			});
			
		}else{
			// if denied
			res.json({
				success : false,
				message : "access denied"
			})
		}
	})
})

function cekitem(id, cb) {
	var idagama = new mongoose.Types.ObjectId(id)
	pegawaiBio
	.findOne({"datapersonal.agama" : id})
	.exec(function (err, pegawai) {
		if (err) {
			cb(false)
		}else if (!pegawai || pegawai == null || pegawai == undefined) {
			cb(false)
		}else{
			cb(true)
		}
	})
}
module.exports = router;