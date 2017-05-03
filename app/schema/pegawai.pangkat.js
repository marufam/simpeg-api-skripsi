const mongoose = require('mongoose');
const Schema = mongoose.Schema;
module.exports = mongoose.model(
		'pegawaipangkat',
		new Schema({
			nip : String,
			pejabatPengangkat : String,
			noSK : String,
			tglSK : Date,
			tmtGolongan : Date,
			masaKerja : String,
			golongan : String,
			angkaKredit : Number,
			jenisPangkat : String,
			gaji : Number,
			createdAt : {
				type : Date,
				default : Date.now()
			},
			updatedAt : {
				type : Date,
				default : Date.now()
			}
		})
	)