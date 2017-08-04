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
		unitInduk : {
			type : Schema.Types.ObjectId,
			ref : 'masterukerinstansi'
		},
		unitKerja :{
			type : Schema.Types.ObjectId,
			ref : 'masterukerdetail'
		},
		posisi : String,
		eselon : String,
		golongan : {
			type : Schema.Types.ObjectId,
			ref : 'mastergolruang'
		},
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