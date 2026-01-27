import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";


const app = express();

app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true,               //REQUIRED for cookies
}))

import webhookRoutes from "./routes/webhook.routes.js";

// ❌ DO NOT apply json middleware here
app.use("/api/webhooks", 
   express.raw({ type: "application/json" }),
    webhookRoutes);

app.use(urlencoded({extended: true}))
app.use(cookieParser())

app.use(passport.initialize())


// ✅ AFTER webhook
app.use(express.json());

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js"
import paymentRoutes from "./routes/payment.routes.js";

app.use("/api/payments", paymentRoutes);




app.use("/api/auth", authRoutes);

app.use("/api/user", userRoutes)


app.use("/api/admin", adminRoutes);




export default app;
