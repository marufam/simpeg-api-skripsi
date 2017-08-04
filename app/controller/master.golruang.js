const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const jwt = require('../component/verifyJWT');
const permission = require('../component/permission');

const mastergolruang = require('../schema/master/master.golruang');
const mastergaji = require('../schema/master/master.gaji');

const router = express.Router();
const func = "mastergolruang"

router.use(bodyParser.urlencoded({extended : false}));
router.use(bodyParser.json());

mongoose.Promise = global.Promise;

router.use(jwt.claimToken);

router.get('/', function (req, res, next) {
	// checking permission
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {

			mastergolruang
			.find()
			.populate('golongan','keterangan')
			.populate('ruang','keterangan')
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
			mastergolruang
			.find({_id : id})
			.populate('golongan','keterangan')
			.populate('ruang','keterangan')
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

			mastergolruang
			.find({
					golongan : req.body.golongan,
					ruang : req.body.ruang
				})
			.exec(function (err, golruang) {
				if (err) {
					res
					.json({
						success : false,
						message : "something wrong",
						error : err
					})
					.status(500)
				}else if (!golruang || golruang == null || golruang == undefined || golruang.length == 0) {
					
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

				}else{
					res
					.json({
						success : false,
						message : "golruang is exist"
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

			mastergolruang
			.find({
					golongan : req.body.golongan,
					ruang : req.body.ruang
				})
			.exec(function (err, golruang) {
				if (err) {
					res
					.json({
						success : false,
						message : "something wrong",
						error : err
					})
					.status(500)
				}else if (!golruang || golruang == null || golruang == undefined || golruang.length == 0) {
					
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

				}else{
					res
					.json({
						success : false,
						message : "golruang is exist"
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
	mastergaji
	.findOne({"golruang" : id})
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