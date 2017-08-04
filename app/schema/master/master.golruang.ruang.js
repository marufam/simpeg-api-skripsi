const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model(
	'masterruang',
	new Schema({
		keterangan : String,
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