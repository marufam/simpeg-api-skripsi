const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const jwt = require('../component/verifyJWT');
const Pegawaibiodata = require('../schema/pegawai.biodata');

const router = express.Router();

router.use(bodyParser.urlencoded({extended : false}));
router.use(bodyParser.json());

mongoose.Promise = global.Promise;

//verify token
router.use(jwt.claimToken);

router.get('/nip/:nip', function (req, res, next) {
	Pegawaibiodata
	.find({
		"nip.nipBaru" : req.params.nip
	})
	// .populate("pangkat")
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
})

router.post('/simpan', function (req, res, next) {
	var pegawai = new Pegawaibiodata({
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

	// res.json(pegawai)
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
			res
			.json({
				success : true,
				message : "success to save pegawai"
			})
			.status(200)
		}
	})
})

router.put('/nip/:nip', function (req, res, next) {
	var nip = req.params.nip;
	var pegawai = ({
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
})

router.delete('/:id', function (req, res, next) {
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
})

module.exports = router