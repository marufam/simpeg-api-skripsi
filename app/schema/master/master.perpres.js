const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model(
	'masterperpres',
	new Schema({
		nomor : String,
		status : Boolean,
		filename : String,
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