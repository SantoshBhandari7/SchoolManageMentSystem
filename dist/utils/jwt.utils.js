"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwtToken = exports.generateJwtToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ENV_CONFIG_1 = __importDefault(require("../config/ENV_CONFIG"));
const generateJwtToken = (payload) => {
    try {
        return jsonwebtoken_1.default.sign(payload, ENV_CONFIG_1.default.jwt_secrete, {
            expiresIn: ENV_CONFIG_1.default.jwt_expiresin,
        });
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.generateJwtToken = generateJwtToken;
const verifyJwtToken = (token) => {
    return jsonwebtoken_1.default.verify(token, ENV_CONFIG_1.default.jwt_secrete);
};
exports.verifyJwtToken = verifyJwtToken;
