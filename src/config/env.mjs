import dotenv from "dotenv";
dotenv.config({path: "../.env"});

export const ENV = {
  SERVER_PORT: process.env.SERVER_PORT,
  DB_SCHEMA: process.env.DB_SCHEMA,
  DB_AUTHORITY: process.env.DB_AUTHORITY,
  DB_NAME: process.env.DB_NAME,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  JWT_SECRET: process.env.JWT_SECRET
}


