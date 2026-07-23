import "dotenv/config";

const Env_Config ={
        Port:process.env.PORT!!,
        db_uri:process.env.DB_URI!!,
        node_dev:process.env.NODE_DEV!!,

}

export default Env_Config;