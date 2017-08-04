var mysql = require('mysql');
var mongoose = require('mongoose');
    mongoose.Promise = require('bluebird');

const masterprovinsi = require('./app/schema/master/master.alamat.provinsi');
const masterkota = require('./app/schema/master/master.alamat.kota');
const masterKecamatan = require('./app/schema/master/master.alamat.kecamatan');

mongoose.connect("mongodb://127.0.0.1:27017/simpeg");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database : "sms"
});



var main= function () {
	mysql_provinces()
}


var mysql_provinces = function () {
	con.connect(function(err) {
	  if (err) throw err;
	  con.query("SELECT * FROM provinces", function (err, result) {
	    if (err) throw err;

	    for (var i = 0 ; i <= result.length - 1; i++) {
	    	mysql_get_by_id_provinces(result[i].id)
	    }
	  });
	});	
}

var mysql_get_by_id_provinces = function (id) {
	con.query("SELECT * FROM provinces WHERE id = "+id, function (err, result) {
		if (err) throw err;
		console.log("* " +result[0]);

		var provinsi = new masterprovinsi({
				keterangan : result[0].name
			})

			provinsi
			.save(function (err) {
			})
		mysql_regencies(result[0].id, provinsi._id)

	});
}

var mysql_regencies = function (provinces_id, mongoid) {
	con.query("SELECT * FROM regencies WHERE province_id ="+ provinces_id, function (err, result) {
		if (err) throw err;
		console.log(result.length);
		for (var i = 0 ; i <= result.length - 1; i++) {
	    	// mysql_get_by_id_regencies(provinces_id, mongoid)
	    	var kota = new masterkota({
				keterangan : result[i].name,
				provinsi : mongoid
			})

			kota
			.save(function (err) {
			})

			mysql_distric(result[i].id, kota._id)
	    }
	});
}

var mysql_distric = function (regencies_id, mongoid) {
	con.query("SELECT * FROM districts WHERE regency_id ="+ regencies_id, function (err, result) {
		if (err) throw err;
		console.log(result.length);
		for (var i = 0 ; i <= result.length - 1; i++) {
	    	// mysql_get_by_id_regencies(provinces_id, mongoid)
	    	var kecamatan = new masterKecamatan({
				keterangan : result[i].name,
				kota : mongoid
			})

			kecamatan
			.save(function (err) {
			})
	    }
	});
}


main()