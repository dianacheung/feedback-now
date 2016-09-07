var cookieController = {};

cookieController.setSSIDCookie = function(req, res, next) {
	//console.log('req.ssid', req.ssid);
	res.cookie('ssid', req.ssid, {httpOnly: false});
	next();
}

module.exports = cookieController;