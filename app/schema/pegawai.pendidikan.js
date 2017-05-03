const mongoose = require('mongoose');
const Schema = mongoose.Schema;
module.exports = mongoose.model(
		'pegawaipendidikan',
		new Schema({
			// _id : String,
			nip : String,
			tingkatPendidikan : String,
			jurusan : String,
			namaLembaga : String,
			tahunKelususan : String,
			namaKepsek : String,
			tglIjazah : String,
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