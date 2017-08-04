var express = require('express');
var multer = require('multer');

var app = express();
var fileNameUpload;

var storage = multer.diskStorage({
  destination: function (req, file, cb) { 
    cb(null, 'uploads/images/')
  },
  filename: function (req, file, cb) {
  	var ext = file.originalname.split('.');
  	console.log(req.body.nipBaru)
    cb(null, req.body.nipBaru+"_"+Date.now() + '.'+ ext[1]) //Appending .jpg
    fileNameUpload = req.body.nipBaru+"_"+Date.now() + '.'+ ext[1]
  }
})

var uploadProfileImgs = multer({
	fileFilter: function (req, file, cb) {
        if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpg') {
            return cb(null, true)
            console.log(true);
        }else{
        	cb(null, false)
        }
    },
	storage : storage
}).array('avatar', 3);


var storageFile = multer.diskStorage({
  destination: function (req, file, cb) { 
    cb(null, 'uploads/file/')
  },
  filename: function (req, file, cb) {
  	var ext = file.originalname.split('.');
    cb(null, Date.now() + '.'+ ext[1]) //Appending .pdf
    fileNameUpload =  Date.now() + '.'+ ext[1]
  }
})

var uploadFileProcces = multer({
	fileFilter: function (req, file, cb) {
        if (file.mimetype == 'application/pdf') {
            return cb(null, true)
        }else{
        	cb(null, false)
        }
    },
	storage : storageFile
}).array('file', 3);

module.exports = {
	upload : function (req, res, cb) {
		uploadProfileImgs(req, res, function (result) {
		    if (result) {
		    	cb({
			    	success : false,
			    	message : "upload failed",
			    	data : result
			    })
		    }else{
			    cb({
			    	success : true,
			    	message : "upload success",
			    	data : fileNameUpload
			    })
		    }
		  })
	},
	uploadFile : function (req, res, cb) {
		uploadFileProcces(req, res, function (result) {
		    if (result) {
		    	cb({
			    	success : false,
			    	message : "upload failed",
			    	data : result
			    })
		    }else{
			    cb({
			    	success : true,
			    	message : "upload success",
			    	data : fileNameUpload
			    })
		    }
		})
	}
}
