const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
var dotenv = require('dotenv');
var cors = require('cors');
const app = express();

const config = require('./app/component/config');

var pegawaiauth = require('./app/controller/pegawai.auth');
//import controller 
var pegawaibiodata = require("./app/controller/pegawai.biodata");
var pegawaiPendidikan = require('./app/controller/pegawai.pendidikan');
var pegawaiGajiberkala = require('./app/controller/pegawai.gajiberkala');
var pegawaiPangkat = require('./app/controller/pegawai.pangkat');
var pegawaiJabatan = require('./app/controller/pegawai.jabatan');
var pegawaiLogin = require('./app/controller/pegawai.create.auth');
//master
var masateragama = require('./app/controller/master.agama');
var masaterrole = require('./app/controller/master.role');
var masatermenu = require('./app/controller/master.menu.has.role');
//master alamat
var masterprovinsi = require('./app/controller/master.alamat.provinsi');
var masterkota = require('./app/controller/master.alamat.kota');
var masterkelurahan = require('./app/controller/master.alamat.kelurahan');
var masterkecamatan = require('./app/controller/master.alamat.kecamatan');
//master golongan ruang
var mastergolongan = require('./app/controller/master.golruang.golongan');
var masterruang = require('./app/controller/master.golruang.ruang');
var mastergolruang = require('./app/controller/master.golruang');
//gaji
var mastergaji = require('./app/controller/master.gaji');
var masterperpres = require('./app/controller/master.perpres');
//uker
var masteruker = require('./app/controller/master.uker');
var masterukerinstansi = require('./app/controller/master.uker.instansi');

dotenv.config({path :'.env'});
//set port
var port = process.env.PORT;

//db connection 
mongoose.connect(process.env.DB);

//cors handler
app.use(cors());
app.use(morgan('dev'));


//router api
app.use('/api/v1/u1', pegawaiauth);
app.use('/api/v1/pegawai', pegawaibiodata);
app.use('/api/v1/pegawai/pendidikan', pegawaiPendidikan);
app.use('/api/v1/pegawai/gaji', pegawaiGajiberkala);
app.use('/api/v1/pegawai/pangkat', pegawaiPangkat);
app.use('/api/v1/pegawai/jabatan', pegawaiJabatan);
app.use('/api/v1/pegawai/login', pegawaiLogin);

//master
app.use('/api/v1/master/agama', masateragama);
app.use('/api/v1/master/role', masaterrole);
app.use('/api/v1/master/menu', masatermenu);
//alamat
app.use('/api/v1/master/provinsi', masterprovinsi);
app.use('/api/v1/master/kota', masterkota);
app.use('/api/v1/master/kelurahan', masterkelurahan);
app.use('/api/v1/master/kecamatan', masterkecamatan);
// golongan ruang
app.use('/api/v1/master/golongan', mastergolongan);
app.use('/api/v1/master/ruang', masterruang);
app.use('/api/v1/master/golruang', mastergolruang);
//gaji
app.use('/api/v1/master/gaji', mastergaji);
//perpres
app.use('/api/v1/master/perpres', masterperpres);
app.use('/api/v1/master/uker', masteruker);
app.use('/api/v1/master/ukerinstansi', masterukerinstansi);
//log 

app.use('/uploads/images', express.static(__dirname + '/uploads/images'));
app.use('/file', express.static(__dirname + '/uploads/file'));
app.listen(port);
console.log('server fucking work ');