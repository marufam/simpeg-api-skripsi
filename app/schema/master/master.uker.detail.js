const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model(
	'masterukerdetail',
	new Schema({
		keterangan : String,
		jenisPegawai : String,
		instansi : {
			type : Schema.Types.ObjectId,
			ref : 'masterukerinstansi'
		},
		jenisuker : String,
		createdAt : {
			type : Date,
			default : Date.now()
		},
		updatedAt : {
			type : Date,
			default : Date.now()
		}
	})
);