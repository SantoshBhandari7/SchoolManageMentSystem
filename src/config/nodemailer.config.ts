import nodemailer from "nodemailer";
import Env_Config from "./ENV_CONFIG";

const transpoter = nodemailer.createTransport({
  host: Env_Config.smtp_host,
  service: Env_Config.smtp_service,
  port: Env_Config.smpt_port,
  secure: Env_Config.smpt_port === 465,
  auth: {
    user: Env_Config.smpt_user,
    pass: Env_Config.smtp_pass,
  },
});

export const verifySMTPConnection = async () => {
  try {
    await transpoter.verify();
    console.log("server is ready to take our messages");
  } catch (error) {
    console.log("Verification failed");
  }
};

export default transpoter;
