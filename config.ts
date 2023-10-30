import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

const env = process.env.NODE_ENV == "development" ? "dev" : "prod";
export const API_URL = process.env.API_URL?.replace("env", env);
export const PORT = process.env.PORT || 3000;
