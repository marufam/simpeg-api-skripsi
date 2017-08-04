const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const jwt = require('../component/verifyJWT');
const permission = require('../component/permission');

const mastergolongan = require('../schema/master/master.golruang.golongan');
const mastergolruang = require('../schema/master/master.golruang');

const router = express.Router();
const func = "mastergolongan"

router.use(bodyParser.urlencoded({extended : false}));
router.use(bodyParser.json());

mongoose.Promise = global.Promise;

router.use(jwt.claimToken);

router.get('/', function (req, res, next) {
	// checking permission
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {

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
	// checking permission
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {

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
	// checking permission
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {

			mastergolongan
			.find({keterangan : req.body.golongan})
			.exec(function (err, golongan) {
				if (err) {
					res
					.json({
						success : false,
						message : "something wrong",
						error : err
					})
					.status(500)
				}else if (!golongan || golongan == null || golongan == undefined || golongan.length == 0 ) {
					
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

				}else{
					res
					.json({
						success : false,
						message : "golongan is exist"
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
	// checking permission
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {

			mastergolongan
			.find({keterangan : req.body.golongan})
			.exec(function (err, golongan) {
				if (err) {
					res
					.json({
						success : false,
						message : "something wrong",
						error : err
					})
					.status(500)
				}else if (!golongan || golongan == null || golongan == undefined || golongan.length == 0 ) {
					
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

				}else{
					res
					.json({
						success : false,
						message : "golongan is exist"
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

router.delete('/:id', function (req, res, next) {
	// checking permission
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
	mastergolruang
	.findOne({"golongan" : id})
	.exec(function (err, pegawai) {
		if (err) {
			cb(false)
		}else if (!pegawai || pegawai == null || pegawai == undefined) {
			cb(true)
		}else{
			cb(true)
		}
	})
}
module.exports = router;