var express = require('express');
var multer = require('multer');
var dotenv = require('dotenv');
var pegawaibiodata = require("./app/schema/pegawai.biodata");
var app = express();
var mongoose = require('mongoose');
    mongoose.Promise = require('bluebird');

mongoose.connect("mongodb://127.0.0.1:27017/simpeg");

var storage = multer.diskStorage({
  destination: function (req, file, cb) { 
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
  	var ext = file.originalname.split('.');
    cb(null, Date.now() + '.'+ ext[1]) //Appending .jpg
  }
})

var uploadProfileImgs = multer({
	fileFilter: function (req, file, cb) {
        if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpg') {
            return cb(null, true)
            console.log(true);
        }else{
        	cb(null, false)
            console.log(file.mimetype);
        }
    },
	storage : storage
}).array('avatar', 3);

app.post('/profile', function (req, res) {
//uploading file
uploadProfileImgs(req, res, function (err) {
    if (err) {
      console.log(err.message);
      // An error occurred when uploading
      return
    }
    res.json({
    	success : true,
    	message : "upload success",
    	data : res.file
    })
  })

});

app.get('/pegawai', function (req, res) {
  var pegawai = new pegawaibiodata({
    _id : "123abc",
      login : {
        username : "198606082009031002",
        password : "198606082009031002"
      },
      nip : {
        nipBaru : "198606082009031002",
        nipLama : "71236817263"
      },
      nama : {
        namadepan : "Bayu",
        namaBelakang : "Putra Pratama"
      },
      datapersonal : {
        lahir : {
          tempat : "Malang",
          tanggal : Date.now()
        },
        agama : "islma",
        alamat : {
          jalan : "JL Buki Sari No 11  RT/RW: 02/08",
          desa : "tulungrejo",
          kecamatan : "tulungrejo",
          kabupaten : "malang",
          provinsi : "Jawa timur"
        },
        statusKawin : true,
        jeniskelamin : true,
        KPE : true,
        notelp : "876734568",
        jumlahanak : "1",
      },
      dataPNS :{
        status : true,
        jenisPegawai : "Pegawai Daerah",

        pejabatPengangkat : "Walikota / Bupati",
        nomorSK : "813.2/65/35.73.403/2009",
        tglSK : "01-04-2009",
        golongan : "II/c",
        pangkat : "3 Thn 0 Bln",
        tmt_sk : Date.now(),
        gaji : "1,037,248"
      }
      //
      /*  jadwal kegiatan yang bersangkutan
        jadwal diklat dll 
        berelasi dengan pegawai jadwal
      */
      
  })
  pegawai.save(function (err) {
    if (err){
      res.send(err)
    }else{
      res.json({
        success : true,
        message : 'user has been saved'
      })
    }
  })
})

console.log("app work");

app.listen(8080)