const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model(
	'mastergaji',
	new Schema({
		masakerja : String,
		nominal : Number,
		golruang : {
			type : Schema.Types.ObjectId,
			ref : 'mastergolruang'
		},
		perpres : {
			type : Schema.Types.ObjectId,
			ref : 'masterperpres'
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