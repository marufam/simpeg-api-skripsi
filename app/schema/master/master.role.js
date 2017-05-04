const mongoose = require('mongoose');
const Schema = mongoose.Schema;
module.exports = mongoose.model(
		'masterrole',
		new Schema({
			namarole : String,
			create : Boolean,
			read : Boolean,
			update : Boolean,
			delete : Boolean,
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