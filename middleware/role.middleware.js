const tokenService = require("../services/tokenService");
const ApiError = require("../exceptions/apiError");

module.exports = function(role) {
    return function(req, res, next) {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            return next(ApiError.UnathorizedError());
        }

        const accessToken = authorizationHeader.split(" ")[1];

        if (!accessToken) {
            return next(ApiError.UnathorizedError());
        }

        const userData = tokenService.validateAccessToken(accessToken);

        if (!userData) {
            return next(ApiError.UnathorizedError());
        }

        if (userData.role !== role) {
            return res.status(403).json({ message: "Нет доступа" });
        }

        req.user = userData;

        next();
    };
};