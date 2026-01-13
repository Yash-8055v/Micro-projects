import express, { urlencoded } from "express";
import Users from "./users.js";
import cors from "cors";
import jwt from "jsonwebtoken";
import {verifyToken} from "./auth.js";

const app = express();
const PORT = 3000;
const jwtSecret = "supersecretkey";

app.use(express.json());
app.use(cors(
  {
    origin: "*"
  }
));
app.use(urlencoded({extended: true}))



app.get("/", (req, res) => {
  res.send("API Working");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body || {};
  

  if (!email || !password) {
    return res.status(400).json({
      status: "failure",
      message: "Both fields are required"
    });
  }

  const user = Users.find((u) => u.email === email);

  if (!user || user.password !== password) {
    return res.status(401).json({
      status: "failure",
      message: "Invalid credentials"
    });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    jwtSecret,
    { expiresIn: "1h" }
  );

  res.json({
    status: "success",
    message: "Login successful",
    token
  });
});

app.get("/profile", verifyToken, (req, res) => {
  res.json({
    message: "welcome to profile",
    user: req.user
  })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
