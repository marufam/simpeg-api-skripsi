const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model(
	'masterukerinstansi',
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