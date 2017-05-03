var mongoose = require('mongoose')
var Schema = mongoose.Schema 
module.exports = mongoose.model(
		'pegawaijadwal',
		new Schema({
			_id : String,
			tempat : String,
			waktu : Date,
			peserta : [{
				pegawai : {
					type : String,
					ref : 'pegawaibiodata'
				}
			}]
		})
	)