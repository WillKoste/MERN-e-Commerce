// exports.authorizeRole = (...roles) => {
// 	return (req, res, next) => {
// 		if (!roles.includes(req.user.isadmin)) {
// 			return res.status(403).json({success: false, data: `Authorization Denied - Must be approved my admin. Your current role: ${req.user.role}`});
// 		}
// 	};
// };

module.exports = async function (req, res, next) {
	if (!req.user.isadmin) {
		return res.status(403).json({success: false, data: `Authorization Denied - Must be approved my admin.`});
	}
	next();
};
