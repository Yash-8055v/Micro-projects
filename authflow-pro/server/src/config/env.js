import dotenv from "dotenv";

dotenv.config();

if (!process.env.GOOGLE_CLIENT_ID) {
  console.warn("⚠️ GOOGLE_CLIENT_ID is missing");
}
