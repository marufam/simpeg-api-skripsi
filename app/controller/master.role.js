const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const jwt = require('../component/verifyJWT');
const permission = require('../component/permission');

const masterrole = require('../schema/master/master.role');
const menuhasrole = require('../schema/master/master.menu.has.role');

const router = express.Router();
const func = "masterrole"

router.use(bodyParser.urlencoded({extended : false}));
router.use(bodyParser.json());

mongoose.Promise = global.Promise;

router.use(jwt.claimToken);

router.get('/', function (req, res, next) {
	// checking permission
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {

			masterrole
			.find()
			.exec(function (err, role) {
				if (err) {
					res
					.json({
						success : false,
						message : "something wrong",
						error : err
					})
					.status(500)
				}else if (!role || role == null || role == undefined) {
					res
					.json({
						success : false,
						message : "role not found"
					})
					.status(404)
				}else{
					res
					.json({
						success : true,
						data : role
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
			masterrole
			.find({_id : id})
			.exec(function (err, role) {
				if (err) {
					res
					.json({
						success : false,
						message : "something wrong",
						error : err
					})
					.status(500)
				}else if (!role || role == null || role == undefined) {
					res
					.json({
						success : false,
						message : "role not found"
					})
					.status(404)
				}else{
					res
					.json({
						success : true,
						data : role
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

			masterrole
			.find({
				namarole : req.body.nama,
				POST : req.body.post,
				GET : req.body.get,
				PUT : req.body.put,
				DELETE : req.body.delete
			})
			.exec(function (err, role) {
				if (err) {
					res
					.json({
						success : false,
						message : "something wrong",
						error : err
					})
					.status(500)
				}else if (!role || role == null || role == undefined || menu.length == 0) {
					
					var role = new masterrole({
						namarole : req.body.nama,
						POST : req.body.post,
						GET : req.body.get,
						PUT : req.body.put,
						DELETE : req.body.delete
					})

					role
					.save(function (err) {
						if (err) {
							res
							.json({
								success : false,
								message : "failed to save role berkala",
								error : err
							})
						}else{
							res
							.json({
								success : true,
								message : "success to save role berkala"
							})
						}
					})

				}else{
					res
					.json({
						success : false,
						message : "role is exist"
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

			masterrole
			.find({
				namarole : req.body.nama,
				POST : req.body.post,
				GET : req.body.get,
				PUT : req.body.put,
				DELETE : req.body.delete
			})
			.exec(function (err, role) {
				if (err) {
					res
					.json({
						success : false,
						message : "something wrong",
						error : err
					})
					.status(500)
				}else if (!role || role == null || role == undefined || menu.length == 0) {
					
					var id = req.params.id
					var role = ({
						namarole : req.body.nama,
						POST : req.body.post,
						GET : req.body.get,
						PUT : req.body.put,
						DELETE : req.body.delete
					})

					masterrole
					.findOneAndUpdate(
						{_id : id},
						role,
						function (err, role) {
							if (err) {
								res
								.json({
									success : false,
									message : "failed to update role berkala",
									error : err
								})
								.status(500)

							}else if (!role) {
								res
								.json({
									success : false,
									message : "role berkala not found"
								})
								.status(404)

							}else{
								res
								.json({
									success : true,
									message : "success to update role berkala"
								})
								.status(200)
							}
						}
					)

				}else{
					res
					.json({
						success : false,
						message : "role is exist"
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

					masterrole
					.remove(
						{_id : id},
						function (err) {
							if (err) {
								res
								.json({
									success : false,
									message : "failed to remove role berkala",
									error : err
								})
								.status(500)
							}else{
								res
								.json({
									success : true,
									message : "success to remove role berkala"
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
	menuhasrole
	.findOne({"role" : id})
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