import { config } from "dotenv";
config();

export const MONGODB_URI =
  process.env.MONGODB_URI_PROD || process.env.MONGODB_URI_DEV;
