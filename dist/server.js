"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = __importDefault(require("./app"));
const db_config_1 = require("./config/db.config");
const ENV_CONFIG_1 = __importDefault(require("./config/ENV_CONFIG"));
const Port = ENV_CONFIG_1.default.Port;
const DB_URI = ENV_CONFIG_1.default.db_uri;
(0, db_config_1.connectDb)(DB_URI);
app_1.default.listen(Port, () => {
    console.log(`Server is running at http://localhost:${Port}`);
});
