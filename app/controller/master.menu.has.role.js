const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const jwt = require('../component/verifyJWT');
const permission = require('../component/permission');

const menuhasrole = require('../schema/master/master.menu.has.role');

const router = express.Router();
const func = "mastermenu"

router.use(bodyParser.urlencoded({extended : false}));
router.use(bodyParser.json());

mongoose.Promise = global.Promise;

router.use(jwt.claimToken);

router.get('/', function (req, res, next) {
	// checking permission
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {

			menuhasrole
			.find()
			.populate({
				path : 'role',
				select : 'namarole'
			})
			.exec(function (err, menu) {
				if (err) {
					res
					.json({
						success : false,
						message : "something wrong",
						error : err
					})
					.status(500)
				}else if (!menu || menu == null || menu == undefined) {
					res
					.json({
						success : false,
						message : "menu not found"
					})
					.status(404)
				}else{
					res
					.json({
						success : true,
						data : menu
					})
					.status(200)
				}
			})
		}else{
			// if denied
			res.json({
				success : false,
				message : "access denied"
			})
		}
	})
})
 
router.get('/:id', function (req, res, next) {
	// checking permission
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {

			var id = req.params.id;
			menuhasrole
			.find({_id : id})
			.populate({
				path : 'role',
				select : 'namarole'
			})
			.exec(function (err, menu) {
				if (err) {
					res
					.json({
						success : false,
						message : "something wrong",
						error : err
					})
					.status(500)
				}else if (!menu || menu == null || menu == undefined) {
					res
					.json({
						success : false,
						message : "menu not found"
					})
					.status(404)
				}else{
					res
					.json({
						success : true,
						data : menu
					})
					.status(200)
				}
			})
		}else{
			// if denied
			res.json({
				success : false,
				message : "access denied"
			})
		}
	})
});

 
router.get('/public/:id', function (req, res, next) {
	var id = req.params.id;
	menuhasrole
	.find({role : id})
	.populate({
		path : 'role',
		select : 'namarole POST GET PUT DELETE'
	})
	.exec(function (err, menu) {
		if (err) {
			res
			.json({
				success : false,
				message : "something wrong",
				error : err
			})
			.status(500)
		}else if (!menu || menu == null || menu == undefined) {
			res
			.json({
				success : false,
				message : "menu not found"
			})
			.status(404)
		}else{
			res
			.json({
				success : true,
				data : menu
			})
			.status(200)
		}
	})
	
});

router.post('/', function (req, res, next) {
	// checking permission
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {

			menuhasrole
			.find({
					grup : req.body.grup,
					menu : req.body.menu,
					function : req.body.func,
					role : req.body.role
				})
			.exec(function (err, menu) {
				if (err) {
					res
					.json({
						success : false,
						message : "something wrong",
						error : err
					})
					.status(500)
				}else if (!menu || menu == null || menu == undefined || menu.length == 0) {
					
					var menu = new menuhasrole({
						grup : req.body.grup,
						menu : req.body.menu,
						function : req.body.func,
						role : req.body.role
					})

					menu
					.save(function (err) {
						if (err) {
							res
							.json({
								success : false,
								message : "failed to save menu berkala",
								error : err
							})
						}else{
							res
							.json({
								success : true,
								message : "success to save menu berkala"
							})
						}
					})

				}else{
					res
					.json({
						success : false,
						message : "menu is exist"
					})
					.status(200)
				}
			})
					
		}else{
			// if denied
			res.json({
				success : false,
				message : "access denied"
			})
		}
	})
})

router.put('/:id', function (req, res, next) {
	// checking permission
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {

			menuhasrole
			.find({
				grup : req.body.grup,
				menu : req.body.menu,
				function : req.body.func,
				role : req.body.role
			})
			.exec(function (err, menu) {
				if (err) {
					res
					.json({
						success : false,
						message : "something wrong",
						error : err
					})
					.status(500)
				}else if (!menu || menu == null || menu == undefined || menu.length == 0) {
					
					var id = req.params.id
					var menu = ({
						grup : req.body.grup,
						menu : req.body.menu,
						function : req.body.func,
						role : req.body.role
					})

					menuhasrole
					.findOneAndUpdate(
						{_id : id},
						menu,
						function (err, menu) {
							if (err) {
								res
								.json({
									success : false,
									message : "failed to update menu berkala",
									error : err
								})
								.status(500)

							}else if (!menu) {
								res
								.json({
									success : false,
									message : "menu berkala not found"
								})
								.status(404)

							}else{
								res
								.json({
									success : true,
									message : "success to update menu berkala"
								})
								.status(200)
							}
						}
					)

				}else{
					res
					.json({
						success : false,
						message : "menu is exist"
					})
					.status(200)
				}
			})
					
		}else{
			// if denied
			res.json({
				success : false,
				message : "access denied"
			})
		}
	})

})

router.delete('/:id', function (req, res, next) {
	// checking permission
	var agent = req.decoded._doc
	permission.check(agent, func, req.method,function (cb) {
		if (cb == "true") {
			
			var id = req.params.id
			menuhasrole
			.remove(
				{_id : id},
				function (err) {
					if (err) {
						res
						.json({
							success : false,
							message : "failed to remove menu berkala",
							error : err
						})
						.status(500)
					}else{
						res
						.json({
							success : true,
							message : "success to remove menu berkala"
						})
					}
				}
			)
		}else{
			// if denied
			res.json({
				success : false,
				message : "access denied"
			})
		}
	})
})
module.exports = router;