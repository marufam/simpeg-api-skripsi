var mongoose = require('mongoose')
var Schema = mongoose.Schema
module.exports = mongoose.model(
		'pegawaibiodata',
		new Schema({
			avatar : String,
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
				agama : {
					type : Schema.Types.ObjectId,
					ref : 'masteragama'
				},
				alamat : {
					jalan : String,
					desa : String,
					kecamatan : {
						type : Schema.Types.ObjectId,
						ref : 'masterkecamatan'
						},
					kabupaten : {
						type : Schema.Types.ObjectId,
						ref : 'masterkota'
						},
					provinsi : {
						type : Schema.Types.ObjectId,
						ref : 'masterprovinsi'
						}
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
				instansi : {
					type : Schema.Types.ObjectId,
					ref : 'masterukerinstansi'
				},
				uker : {
					type : Schema.Types.ObjectId,
					ref : 'masterukerdetail'
				},
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