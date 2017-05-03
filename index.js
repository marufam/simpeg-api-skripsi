const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
var dotenv = require('dotenv');
var cors = require('cors');
const app = express();

const config = require('./app/component/config');

//import controller 
var pegawaibiodata = require("./app/controller/pegawai.biodata");
var pegawaiauth = require('./app/controller/pegawai.auth');
var pegawaiPendidikan = require('./app/controller/pegawai.pendidikan');
var pegawaiGajiberkala = require('./app/controller/pegawai.gajiberkala');
var pegawaiPangkat = require('./app/controller/pegawai.pangkat');
var pegawaiJabatan = require('./app/controller/pegawai.jabatan');
//master
var masateragama = require('./app/controller/master.agama');

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

//master
app.use('/api/v1/pegawai/master/agama', masateragama);


//log 
app.listen(port);
console.log('server work ');