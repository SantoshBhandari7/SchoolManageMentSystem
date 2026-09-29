"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const ENV_CONFIG_1 = __importDefault(require("../config/ENV_CONFIG"));
const nodemailer_config_1 = __importDefault(require("../config/nodemailer.config"));
const sendMail = async (mailOption) => {
    const { to, html, subject, cc, bcc, attachments } = mailOption;
    try {
        const options = {
            to,
            from: ENV_CONFIG_1.default.smtp_mail_from,
            html,
            subject,
        };
        if (bcc) {
            options["bcc"] = bcc;
        }
        if (cc) {
            options["cc"] = cc;
        }
        if (attachments) {
            options["attachments"] = attachments;
        }
        nodemailer_config_1.default.sendMail(options);
    }
    catch (error) {
        console.log(error);
    }
};
exports.sendMail = sendMail;
