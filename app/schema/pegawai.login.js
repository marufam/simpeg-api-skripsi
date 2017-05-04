const mongoose = require('mongoose');
const Schema = mongoose.Schema;
module.exports = mongoose.model(
		'pegawailogin',
		new Schema({
			// _id : String,
			nip : String,
			username : String,
			password : String,
			repassword : String,
			role :{
				type : Schema.Types.ObjectId,
				ref : 'masterrole'
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
	)