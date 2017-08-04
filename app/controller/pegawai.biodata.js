const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const jwt = require('../component/verifyJWT');
const permission = require('../component/permission');
const upload_process = require('../component/uploadfile');

const Pegawaibiodata = require('../schema/pegawai.biodata');
const Pegawailogin = require('../schema/pegawai.login');

const router = express.Router();
const func = "biodata"

router.use(bodyParser.urlencoded({extended : false}));
router.use(bodyParser.json());

mongoose.Promise = global.Promise;

//verify token
router.use(jwt.claimToken);

router.get('/', function (req, res, next) {
	// checking permission
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {

			Pegawaibiodata
			.find()
			.populate({
				path : "datapersonal.alamat.provinsi",
				select : "keterangan"
			})
			.populate({
				path : "datapersonal.alamat.kabupaten",
				select : "keterangan"
			})
			.populate({
				path : "datapersonal.alamat.kecamatan",
				select : "keterangan"
			})
			.populate({
				path : "datapersonal.agama",
				select : "keterangan"
			})
			.exec(function (err, pegawai) {
				if (err){ 
					res.json({
						success : false,
						message : "something wrong",
						error : err
					})
				} else if (!pegawai){
					res.json({
						success : false,
						message : "data not found"
					})
				}else{
					res.json({
						success : true,
						data : pegawai
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

router.get('/nip/:nip', function (req, res, next) {
	// checking permission
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {

			Pegawaibiodata
			.find({
				"nip.nipBaru" : req.params.nip
			})
			.populate({
				path : "datapersonal.alamat.provinsi",
				select : "keterangan"
			})
			.populate({
				path : "datapersonal.alamat.kabupaten",
				select : "keterangan"
			})
			.populate({
				path : "datapersonal.alamat.kecamatan",
				select : "keterangan"
			})
			.populate({
				path : "datapersonal.agama",
				select : "keterangan"
			})
			.exec(function (err, pegawai) {
				if (err){ 
					res.json({
						success : false,
						message : "something wrong",
						error : err
					})
				} else if (!pegawai){
					res.json({
						success : false,
						message : "data not found"
					})
				}else{
					res.json({
						success : true,
						data : pegawai
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

router.post('/', function (req, res, next) {
	// checking permission
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {

			var pegawai = new Pegawaibiodata({
				avatar : req.body.avatar,
				nip : {
					nipBaru : req.body.nipBaru,
					nipLama : req.body.nipLama
				},
				nama : {
					namaDepan : req.body.namaDepan,
					namaBelakang : req.body.namaBelakang
				},
				datapersonal : {
					lahir : {
						tempat : req.body.tempatLahir,
						tanggal : req.body.tglLahir
					},
					agama : req.body.agama,
					alamat : {
						jalan : req.body.alamatJalan,
						desa : req.body.alamatDesa,
						kecamatan : req.body.alamatKecamatan,
						kabupaten : req.body.alamatKab,
						provinsi : req.body.alamatProv
					},
					statusKawin : req.body.statusKawin,
					jeniskelamin : req.body.sex,
					KPE : req.body.KPE,
					notelp : req.body.noTelp,
					jumlahAnak : req.body.jmlAnak
				},
				dataPNS : {
					statusPNS : req.body.statusPNS,
					jenisPegawai : req.body.jenisPegawai,
					jabatan : req.body.jabatan,
					instansi : req.body.instansi,
					uker : req.body.uker,
				}
			})

			pegawai
			.save(function (err) {
				if (err) {
					res
					.json({
						success : false,
						message : "failed to save pegawai",
						error : err
					})
					.status(500)
				}else{
					var loginpegawai = new Pegawailogin({
						nip : req.body.nipBaru,
						username : req.body.nipBaru,
						password : req.body.nipBaru,
						repassword : req.body.nipBaru,
						role : "590b614bfcd2180801975146"
					})

					loginpegawai
					.save(function (err) {
						if (err) {
							res
							.json({
								success : false,
								message : "failed to save pegawai login",
								error : err
							})
						}else{
							res
							.json({
								success : true,
								message : "success to save pegawai"
							})
							.status(200)
						}
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

router.put('/nip/:nip', function (req, res, next) {
	// checking permission
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {

			var nip = req.params.nip;
			var pegawai = ({
				avatar : req.body.avatar,
				login : {
					username : req.body.nipBaru,
					password : req.body.nipBaru
				},
				nip : {
					nipBaru : req.body.nipBaru,
					nipLama : req.body.nipLama
				},
				nama : {
					namaDepan : req.body.namaDepan,
					namaBelakang : req.body.namaBelakang
				},
				datapersonal : {
					lahir : {
						tempat : req.body.tempatLahir,
						tanggal : req.body.tglLahir
					},
					agama : req.body.agama,
					alamat : {
						jalan : req.body.alamatJalan,
						desa : req.body.alamatDesa,
						kecamatan : req.body.alamatKecamatan,
						kabupaten : req.body.alamatKab,
						provinsi : req.body.alamatProv
					},
					statusKawin : req.body.statusKawin,
					jeniskelamin : req.body.sex,
					KPE : req.body.KPE,
					notelp : req.body.noTelp,
					jumlahAnak : req.body.jmlAnak
				},
				dataPNS : {
					statusPNS : req.body.statusPNS,
					jenisPegawai : req.body.jenisPegawai,
					jabatan : req.body.jabatan,
					uker : req.body.uker,
				}
			})

			// res.json(pegawai);
			Pegawaibiodata.findOneAndUpdate(
				{"nip.nipBaru" : nip},
				pegawai,
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
			Pegawaibiodata.remove(
				{ _id: id	},
				function (err) {
					if (err) {
						res
						.json({
							success : false,
							message : "failed to remove pegawai"
						})
						.status(500)
					}else{
						res
						.json({
							success : true,
							message : "success to remove data"
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

router.post('/upload', function (req, res, next) {
	upload_process.upload(req, res,function (result) {
		res.json(result)
	})

})
module.exports = router