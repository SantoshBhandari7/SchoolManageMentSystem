import "dotenv/config";
import cloudinary from "./cloudinary.config";

const Env_Config = {
  Port: process.env.PORT!!,
  db_uri: process.env.DB_URI!!,
  node_dev: process.env.NODE_DEV!!,

  cloudinary_name: process.env.CLOUDINARY_CLOUD_NAME!!,
  cloudinary_apikey: process.env.CLOUDINARY_API_KEY!!,
  cloudinary_secrete: process.env.CLOUDINARY_API_SECRETE!!,

  jwt_secrete:process.env.JWT_SECRETE!!,
  jwt_expiresin:process.env.JWT_EXPIRES!!,

};

export default Env_Config;
