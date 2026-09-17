import "dotenv/config";

import app from "./app";
import { connectDb } from "./config/db.config";

import Env_Config from "./config/ENV_CONFIG";

const Port = Env_Config.Port;
const DB_URI = Env_Config.db_uri;

connectDb(DB_URI);

app.listen(Port, () => {
  console.log(`Server is running at http://localhost:${Port}`);
});
