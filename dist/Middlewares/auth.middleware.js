"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const ApiError_utils_1 = require("../utils/ApiError.utils");
const jwt_utils_1 = require("../utils/jwt.utils");
const authenticate = (roles) => {
    return async (req, res, next) => {
        try {
            const access_token = req.cookies["access_token"];
            if (!access_token) {
                throw new ApiError_utils_1.ApiError("Unauthorized, Access denied", 401);
            }
            const decoded_data = (0, jwt_utils_1.verifyJwtToken)(access_token);
            if (!decoded_data) {
                throw new ApiError_utils_1.ApiError("Unauthorized, Access denied", 401);
            }
            if (decoded_data.exp * 1000 <= Date.now()) {
                throw new ApiError_utils_1.ApiError("Unauthorized, Token is expired", 401);
            }
            if (roles && !roles.includes(decoded_data.role)) {
                throw new ApiError_utils_1.ApiError("Unauthorized, Access denied", 403);
            }
            req.user = {
                _id: decoded_data._id,
                email: decoded_data.email,
                name: decoded_data.name,
                role: decoded_data.role,
            };
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
exports.authenticate = authenticate;
