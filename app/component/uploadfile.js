var express = require('express');
var multer = require('multer');

var app = express();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../../uploads/')
  },
  filename: function (req, file, cb) {
  	var ext = file.originalname.split('.');
    cb(null, Date.now() + '.'+ ext[1]) //Appending .jpg
  }
})

var uploadProfileImgs = multer({
	fileFilter: function (req, file, cb) {
        if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpg') {
            return cb(null, true)
            console.log(true);
        }else{
        	cb(null, false)
            console.log(file.mimetype);
        }
    },
	storage : storage
}).single('avatar');

module.exports = {
	upload : function (req, res) {
		uploadProfileImgs(req, res, function (err) {
		    if (err) {
		      console.log(err.message);
		      // An error occurred when uploading
		      return
		    }
		    res.json({
		    	success : true,
		    	message : "upload success",
		    	data : res.file
		    })
		  })
		
	}
}
