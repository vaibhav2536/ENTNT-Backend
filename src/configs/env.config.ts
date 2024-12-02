import dotenv from "dotenv";

dotenv.config({
  path: ".env",
});

const ENV_CONFIG = {
  BACKEND_PORT: process.env.PORT || 3000,
  ENVIRONMENT: process.env.NODE_ENV || "",
  MONGO_URI: process.env.MONGO_URI || "",
  MONGO_DB_NAME: process.env.MONGO_DB_NAME || "",
  MONGO_PORT: process.env.MONGO_PORT || 0,
  JWT_SECRET: process.env.JWT_SECRET || "",
  JWT_REFRESH_TOKEN_EXPIRY: process.env.JWT_REFRESH_TOKEN_EXPIRY || "30d",
  JWT_ACCESS_TOKEN_EXPIRY: process.env.JWT_ACCESS_TOKEN_EXPIRY || "7d",
  GOOGLE_GEMINI_API_KEY: process.env.GOOGLE_GEMINI_API_KEY || "",
  RAPIDAPI_KEY: process.env.RAPIDAPI_KEY || "",
  LOG_TAIL_TOKEN: process.env.LOG_TAIL_TOKEN || "",
  REDIS_PASSWORD: process.env.REDIS_PASSWORD || "",
  REDIS_HOST: process.env.REDIS_HOST || "localhost",
  REDIS_PORT: process.env.REDIS_PORT || "6379",
  DB_URL: process.env.DB_URL || "",

  // encoding
  ENCRYPTION_SECRET:
    process.env.ENCRYPTION_SECRET ?? "e0e84e4138y2e5creaf2e6d22f33a647",
  IV_HEX_STRING:
    process.env.IV_HEX_STRING ?? "1a583e157cfdf819305f7a7409163c89",

  // google oauth
  GOOGLE_OAUTH_CLIENT_ID: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
  GOOGLE_OAUTH_CLIENT_SECRET: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
  GOOGLE_OAUTH_REDIRECT_URI: process.env.GOOGLE_OAUTH_REDIRECT_URI || "",
  GOOGLE_API_BASE_URL: process.env.GOOGLE_API_BASE_URL || "",
};

export default ENV_CONFIG;
