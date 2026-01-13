
import jwt from "jsonwebtoken";
const jwtSecret = "supersecretkey";

export const verifyToken = async (req, res, next ) => {
  const authHeader = req.headers.authorization;

  if(!authHeader) return res.status(401).json({message: "no token provided"})

  const token = authHeader.split(" ")[1];


  try {
    const decodedInfo = await jwt.verify(token, jwtSecret);
    req.user = decodedInfo
    next()
  } catch (error) {
    return res.status(401).json({message: "token invalid or expire"})
  }

  
}

