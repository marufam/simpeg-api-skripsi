var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = mongoose.model(
		'pegawaigajiberkala',
		new Schema({
			// _id : String,
			nip : String,
			pejabatPengangkat : String,
			NomorSK : String,
			tglSK : String,
			gol : String,
			masaKerja : {
				tahun : Number,
				bulan : Number
			},
			tmtSK : String,
			gaji : Number,
			createdAta : {
				type : Date,
				default : Date.now()
			},
			updatedAt : {
				type : Date,
				default : Date.now()
			}
		})
	)