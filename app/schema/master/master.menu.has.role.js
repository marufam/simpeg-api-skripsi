const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model(
	'mastermenu',
	new Schema({
		grup : String,
		menu : String,
		function : String,
		role : {
			type : Schema.Types.ObjectId,
			ref : "masterrole"
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