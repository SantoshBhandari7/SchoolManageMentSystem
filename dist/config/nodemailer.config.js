"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifySMTPConnection = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const ENV_CONFIG_1 = __importDefault(require("./ENV_CONFIG"));
const transpoter = nodemailer_1.default.createTransport({
    host: ENV_CONFIG_1.default.smtp_host,
    service: ENV_CONFIG_1.default.smtp_service,
    port: ENV_CONFIG_1.default.smpt_port,
    secure: ENV_CONFIG_1.default.smpt_port === 465,
    auth: {
        user: ENV_CONFIG_1.default.smpt_user,
        pass: ENV_CONFIG_1.default.smtp_pass,
    },
});
const verifySMTPConnection = async () => {
    try {
        await transpoter.verify();
        console.log("server is ready to take our messages");
    }
    catch (error) {
        console.log("Verification failed");
    }
};
exports.verifySMTPConnection = verifySMTPConnection;
exports.default = transpoter;
