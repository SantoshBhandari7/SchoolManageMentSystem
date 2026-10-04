"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessage = void 0;
const catchAsync_utils_1 = require("../utils/catchAsync.utils");
const contact_model_1 = __importDefault(require("../models/contact.model"));
const sendResponse_utils_1 = require("../utils/sendResponse.utils");
const sendEmailService_utils_1 = require("../utils/sendEmailService.utils");
const ENV_CONFIG_1 = __importDefault(require("../config/ENV_CONFIG"));
const emailTemplate_utils_1 = require("../utils/emailTemplate.utils");
exports.createMessage = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { name, email, subject, message } = req.body;
    const user = new contact_model_1.default({ name, email, subject, message });
    user.save();
    (0, sendEmailService_utils_1.sendMail)({
        to: ENV_CONFIG_1.default.smtp_mail_from,
        subject: "Your Feedback is sent",
        html: (0, emailTemplate_utils_1.ContactEmailHtml)({
            name: user.name,
            email: user.email,
            subject: user.subject ?? "",
            message: user.message ?? "",
        }),
    });
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "Message send successfully",
        data: user,
        statusCode: 201,
    });
});
