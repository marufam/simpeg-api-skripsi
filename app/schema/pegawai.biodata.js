var mongoose = require('mongoose')
var Schema = mongoose.Schema
module.exports = mongoose.model(
		'pegawaibiodata',
		new Schema({
			login : {
				username : String,
				password : String
			},
			nip : {
				nipBaru : String,
				nipLama : String
			},
			nama : {
				namaDepan : String,
				namaBelakang : String
			},
			datapersonal : {
				lahir : {
					tempat : String,
					tanggal : Date
				},
				agama : String,
				alamat : {
					jalan : String,
					desa : String,
					kecamatan : String,
					kabupaten : String,
					provinsi : String
				},
				statusKawin : Boolean,
				jeniskelamin : Boolean,
				KPE : Boolean,
				notelp : String,
				jumlahAnak : Number,
			},
			dataPNS : {
				statusPNS : Boolean,
				jenisPegawai : String,
				jabatan : String,
				uker : String,
			},
			pangkat :{
				type : Schema.Types.ObjectId,
				ref : 'pegawaipangkat'
			},
			gajiberkala : {
				type : Schema.Types.ObjectId,
				ref : 'gajiberkala'
			},
			jadwal : { 
				type : Schema.Types.ObjectId,
				ref : 'pegawaijadwal'
			},
			penghargaan : {
				type : Schema.Types.ObjectId,
				ref : 'pegawaipenghargaan'
			},

			jabatan : {
				type : Schema.Types.ObjectId,
				ref : 'pegawaijabatan'
			},			craetedat : {
				type : Date,
				default : Date.now()
			},
			updatedat : {
				type : Date,
				default : Date.now()
			}
		})
	)