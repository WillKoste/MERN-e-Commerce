module.exports = async function (req, res, next) {
	if (!req.user.isadmin) {
		return res.status(403).json({success: false, data: `Authorization Denied - Must be approved my admin.`});
	}
	next();
};
