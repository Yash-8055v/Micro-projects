import express, { json } from "express";
import jwt from "jsonwebtoken";
import { Users } from "./Users.js";
import cors from "cors";

const app = express();
app.use(json());

const PORT = 3000;
const jwtSecret = "mySecret";

app.use(cors(
  {
    origin: "http://localhost:5173"
  }
))


app.post("/login", async (req, res) => {
  const {email, password} = req.body;

  if(!email || !password) res.status(401).json({status: "failure", message: "both fields required"});

  const user = Users.find((user) => (
    user.email === email && user.password === password
  ))

  if(!user) return res.status(401).json({status: "failure", message: "invalid credentials"});

  const payload = {
    id: user.id,
    email: user.email,
    role: user.role

  }
  const token = await jwt.sign(payload, jwtSecret, {expiresIn: "1h"});

  if(!token) return res.status(500).json({status: "failure", message: "server error try again"});

  const safeUser = {
  id: user.id,
  email: user.email,
  role: user.role
};
  res.status(200).json({
    status: "success",
    user: safeUser,
    token
  })
  
  
})

app.listen(PORT, () => {
  console.log(`server is on http://localhost:${PORT}/login`);
})