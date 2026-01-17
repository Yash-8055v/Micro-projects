import express from "express";

const app = express();

app.use(express.json());

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

app.use("/api/auth", authRoutes);

app.use("/api/user", userRoutes)


export default app;
