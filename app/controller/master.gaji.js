const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const jwt = require('../component/verifyJWT');
const permission = require('../component/permission');

const mastergaji = require('../schema/master/master.gaji');

const router = express.Router();
const func = "mastergaji"

router.use(bodyParser.urlencoded({extended : false}));
router.use(bodyParser.json());

mongoose.Promise = global.Promise;

router.use(jwt.claimToken);

router.get('/', function (req, res, next) {
	// checking permission
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {

			mastergaji
			.find()
			.populate({
				path : 'golruang',
				populate : {
					path : 'golongan',
					select : 'keterangan'
				}
			})
			.populate({
				path : 'golruang',
				select : 'golongan ruang',
				populate : {
					path : 'ruang',
					select : 'keterangan'
				}
			})
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
			mastergaji
			.find({_id : id})
			.populate({
				path : 'golruang',
				populate : {
					path : 'golongan',
					select : 'keterangan'
				}
			})
			.populate({
				path : 'golruang',
				select : 'golongan ruang',
				populate : {
					path : 'ruang',
					select : 'keterangan'
				}
			})
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

		}else{
			// if denied
			res.json({
				success : false,
				message : "access denied"
			})
		}
	})
});

router.get('/golruang/:id/masakerja/:mk', function (req, res, next) {
	// checking permission
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {

			var id = req.params.id;
			var mk = req.params.mk;
			mastergaji
			.find({masakerja : mk, golruang : id})
			.populate({
				path : 'golruang',
				populate : {
					path : 'golongan',
					select : 'keterangan'
				}
			})
			.populate({
				path : 'golruang',
				select : 'golongan ruang',
				populate : {
					path : 'ruang',
					select : 'keterangan'
				}
			})
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

			mastergaji
			.find({
				masakerja : req.body.masakerja,
				nominal : req.body.nominal,
				golruang : req.body.golruang,
				perpres : req.body.perpres
			})
			.exec(function (err, gaji) {
				if (err) {
					res
					.json({
						success : false,
						message : "something wrong",
						error : err
					})
					.status(500)
				}else if (!gaji || gaji == null || gaji == undefined || gaji.length == 0) {
					
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

				}else{
					res
					.json({
						success : false,
						message : "gaji is exist"
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

			mastergaji
			.find({
				masakerja : req.body.masakerja,
				nominal : req.body.nominal,
				golruang : req.body.golruang,
				perpres : req.body.perpres
			})
			.exec(function (err, gaji) {
				if (err) {
					res
					.json({
						success : false,
						message : "something wrong",
						error : err
					})
					.status(500)
				}else if (!gaji || gaji == null || gaji == undefined || gaji.length == 0) {
					
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

				}else{
					res
					.json({
						success : false,
						message : "gaji is exist"
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

		}else{
			// if denied
			res.json({
				success : false,
				message : "access denied"
			})
		}
	})
})
module.exports = router;