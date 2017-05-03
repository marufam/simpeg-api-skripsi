const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model(
	'mastergolruang',
	new Schema({
		golongan : {
			type : Schema.Types.ObjectId,
			ref : 'mastergolongan'
		},
		ruang : {
			type : Schema.Types.ObjectId,
			ref : 'masterruang'
		}
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