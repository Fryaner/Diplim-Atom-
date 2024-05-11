const tokenService = require('../service/token-service');

module.exports = function (roles) {
    return function (req, res, next) {
        try {
            const authorizationHeader = req.headers.authorization;
            if (!authorizationHeader) {
                return next(ApiError.unauthorizedError());
            }
    
            const accessToken = authorizationHeader.split(' ')[1];
            if (!accessToken) {
                return next(ApiError.unauthorizedError());
            }
    
            const {roles: userRoles} = tokenService.validateAccessToken(accessToken);
            let hasRole = false;
            userRoles.forEach(role => {
                if (roles.includes(role)) {
                    hasRole = true;
                }
            });

            if (!hasRole) {
                return next(ApiError.unauthorizedError());
            }

            next();
        } catch (e) {
            return next(ApiError.unauthorizedError());
        }
    }
}