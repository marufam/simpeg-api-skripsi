const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const mastermenu = require('../schema/master/master.menu.has.role');
const masterrole = require('../schema/master/master.role');

var ObjectID = mongoose.Types.ObjectId;


module.exports = {

	check : function(role, func, meth, cb) {
		mastermenu
		.find({"function" : func, "role" : new ObjectID(role.role._id) })
		.exec(function (err,menu) {
			if (err){ 
				cb("false")
			} else if (!menu || !menu.length || menu == null){
				cb("false")
			}else{
				if (meth == "POST") {
					masterrole
					.find({_id : new ObjectID(role.role._id), POST : true })
					.exec(function (err,role) {
						if (err){ 
							cb("false")
						} else if (!role || !role.length){
							cb("false")
						}else{
							cb("true")
						}
					})
				}else if (meth == "GET") {
					masterrole
					.find({_id : new ObjectID(role.role._id), GET : true })
					.exec(function (err,role) {
						if (err){ 
							cb("false")
						} else if (!role || !role.length){
							cb("false")
						}else{
							cb("true")
						}
					})
				}else if (meth == "PUT") {
					masterrole
					.find({_id : new ObjectID(role.role._id), PUT : true })
					.exec(function (err,role) {
						if (err){ 
							cb("false")
						} else if (!role || !role.length){
							cb("false")
						}else{
							cb("true")
						}
					})
				}else if (meth == "DELETE") {
					masterrole
					.find({_id : new ObjectID(role.role._id), DELETE : true })
					.exec(function (err,role) {
						if (err){ 
							cb("false")
						} else if (!role || !role.length){
							cb("false")
						}else{
							cb("true")
						}
					})
				}
			}
		})
	},

};