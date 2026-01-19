import express, { urlencoded } from "express";
import cors from "cors"

const app = express();

app.use(cors())

app.use(express.json());
app.use(urlencoded({extended: true}))


import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

app.use("/api/auth", authRoutes);

app.use("/api/user", userRoutes)


export default app;
