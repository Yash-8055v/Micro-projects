import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import "./config/passport.js"

const app = express();

app.use(cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true,               //REQUIRED for cookies
  }))

app.use(express.json());
app.use(urlencoded({extended: true}))
app.use(cookieParser())

app.use(passport.initialize())

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";


app.use("/api/auth", authRoutes);

app.use("/api/user", userRoutes)


export default app;
