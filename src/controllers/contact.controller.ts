import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.utils";
import Contact from "../models/contact.model";
import { sendResponse } from "../utils/sendResponse.utils";
import { sendMail } from "../utils/sendEmailService.utils";
import Env_Config from "../config/ENV_CONFIG";
import { ContactEmailHtml } from "../utils/emailTemplate.utils";

export const createMessage = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, subject, message } = req.body;

    const user = new Contact({ name, email, subject, message });
    user.save();
    sendMail({
      to: Env_Config.smtp_mail_from,
      subject: "Your Feedback is sent",
      html: ContactEmailHtml({
        name: user.name,
        email: user.email,
        subject: user.subject ?? "",
        message: user.message ?? "",
      }),
    });

    sendResponse(res, {
      message: "Message send successfully",
      data: user,
      statusCode: 201,
    });
  },
);
