import { v2 as cloudinary } from "cloudinary";
import Env_Config from "./ENV_CONFIG";
//api keys
cloudinary.config({
        cloud_name:Env_Config.cloudinary_name,
        api_key:Env_Config.cloudinary_apikey,
        api_secret:Env_Config.cloudinary_secrete,
});

export default cloudinary;