import Env_Config from "../config/ENV_CONFIG";
import { SendMailOptions } from "nodemailer";
import transpoter from "../config/nodemailer.config";
interface IMailOptions {
  to: string;
  subject: string;
  html: string;
  cc?: string | string[];
  bcc?: string | string[];
  attachments?: any[];
}

export const sendMail = async (mailOption: IMailOptions) => {
  const { to, html, subject, cc, bcc, attachments } = mailOption;
  try {
    const options: SendMailOptions = {
      to,
      from: Env_Config.smtp_mail_from,
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

    transpoter.sendMail(options);
  } catch (error) {
    console.log(error);
  }
};
