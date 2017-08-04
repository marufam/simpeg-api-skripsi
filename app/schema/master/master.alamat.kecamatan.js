const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model(
	'masterkecamatan',
	new Schema({
		keterangan : String,
		kota : {
			type : Schema.Types.ObjectId,
			ref : 'masterkota'
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