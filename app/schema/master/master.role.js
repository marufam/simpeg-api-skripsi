const mongoose = require('mongoose');
const Schema = mongoose.Schema;
module.exports = mongoose.model(
		'masterrole',
		new Schema({
			namarole : String,
			POST : Boolean,
			GET : Boolean,
			PUT : Boolean,
			DELETE : Boolean,
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