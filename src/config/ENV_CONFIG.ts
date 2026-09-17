import "dotenv/config";
import cloudinary from "./cloudinary.config";

const Env_Config = {
  Port: process.env.PORT!!,
  db_uri: process.env.DB_URI!!,
  node_dev: process.env.NODE_DEV!!,

  cloudinary_name: process.env.CLOUDINARY_CLOUD_NAME!!,
  cloudinary_apikey: process.env.CLOUDINARY_API_KEY!!,
  cloudinary_secrete: process.env.CLOUDINARY_API_SECRETE!!,

  jwt_secrete: process.env.JWT_SECRETE!!,
  jwt_expiresin: process.env.JWT_EXPIRES!!,

  smtp_host: process.env.SMTP_HOST!!,
  smtp_service: process.env.SMTP_SERVICE!!,
  smpt_port:Number( process.env.SMTP_PORT)??587,
  smpt_user: process.env.SMTP_USER!!,
  smtp_pass: process.env.SMTP_PASS!!,
  smtp_mail_from: process.env.SMTP_MAIL_FROM!!,
};

export default Env_Config;
