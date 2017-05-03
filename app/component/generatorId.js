module.exports = {
	myId : function (table) {
		var date = Date.now()
		var rerurnId = table + "_" + date
		return rerurnId;
	}
}