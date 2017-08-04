const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model(
	'masterkota',
	new Schema({
		keterangan : String,
		provinsi : {
			type : Schema.Types.ObjectId,
			ref : 'masterprovinsi'
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
);