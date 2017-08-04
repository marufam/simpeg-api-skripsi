const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const jwt = require('../component/verifyJWT');
const permission = require('../component/permission');

const pegawaiPendidikan = require('../schema/pegawai.pendidikan');

const router = express.Router();
const func = "pendidikan"

//setter
router.use(bodyParser.urlencoded({extended : false}));
router.use(bodyParser.json());

mongoose.Promise = global.Promise;

//verify token
router.use(jwt.claimToken);

router.get('/nip/:nip', function (req, res, next) {
	// checking permission
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {

			var nip = req.params.nip;
			pegawaiPendidikan
			.find({"nip" : nip})
			.limit(5)
			.exec(function (pendidikan) {
				if (!pendidikan || pendidikan == null || pendidikan == undefined) {
					res
					.json({
						success : false,
						message : "pendidikan not found"
					})
					.status(404)
				}else{
					res
					.json({
						success : true,
						data : pendidikan
					})
					.status(200)
				}
			})
			.catch(function (err) {
				res
				.json({
					success : false,
					message : "something wrong",
					error : err
				})
				.status(500)
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
			pegawaiPendidikan
			.findOne({_id : id})
			.exec(function (err, data) {
				if (err) {
					res
					.json({
						success : false,
						message : "failed to get data",
						error : err
					})
					.status(500)
				}
				else if (!data) {
					res
					.json({
						success : false,
						message : "data get one not found"
					})
					.status(404)
				}else{
					res
					.json({
						success : true,
						message : "success get data",
						data : data
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

router.post('/simpan', function (req, res, next) {
	// checking permission
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {

			// setting data
			var pendidikan = new pegawaiPendidikan({
				// _id : newId.myId("PDD"),
				nip : req.body.nip,
				tingkatPendidikan : req.body.tingkatPendidikan,
				jurusan : req.body.juruasan,
				namaLembaga : req.body.namaLembaga,
				tahunKelususan : req.body.tahunLulus,
				namaKepsek : req.body.namaKepsek,
				tglIjazah : req.body.tglIjazah,
			})

			// save query
			pendidikan
			.save(function (err) {
				if (err) {
					res.json({
						success : false,
						message : "failed to save pendidikan",
						error : err
					})
				}else{
					res.json({
						success : true,
						message : "success to save pendidikan"
					})
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

			var id = req.params.id;
			var pendidikan = ({
				nip : req.body.nip,
				tingkatPendidikan : req.body.tingkatPendidikan,
				jurusan : req.body.juruasan,
				namaLembaga : req.body.namaLembaga,
				tahunKelususan : req.body.tahunLulus,
				namaKepsek : req.body.namaKepsek,
				tglIjazah : req.body.tglIjazah,
			})

			pegawaiPendidikan.findOneAndUpdate(
				{_id : id},
				pendidikan,
				function (err, result) {
					if (err) {
						res
						.json({
							success : false,
							message : "failed to update data",
							error : err
						})
						.status(500)
					}else{
						res
						.json({
							success : true,
							message : "success to update data"
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
	// checking permission
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {

			var id = req.params.id
			pegawaiPendidikan.remove(
				{_id : id},
				function (err) {
					if (err) {
						res
						.json({
							success : false,
							message : "failed to remove data",
							error : err
						})
						.status(500)
					}else{
						res
						.json({
							success : true,
							message : "success remove data"
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

module.exports = router