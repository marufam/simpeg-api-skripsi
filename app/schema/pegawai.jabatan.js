const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model(
	'pegawaijabatan',
	new Schema({
		nip : String,
		SO : String,
		jenisJabatan : String,
		tmtjabatan : Date,
		pejabatPengangkat : String,
		noSK : String,
		tglSK : Date,
		unitInduk : String,
		unitKerja : String,
		posisi : String,
		eselon : String,
		golongan : String,
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