import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    //* 1️ read Authorization header
    const authHeader = req.headers.authorization;
  
    if(!authHeader) return res.status(401).json({status: "failure", message: "token is not provided"});
  
    //* 2️ extract token
    if (!authHeader.startsWith("Bearer ")) return res.status(401).json({status: "failure", message: "invalid token"});
    const token = authHeader.split(" ")[1];
    
    // or const token = authHeader.replace("Bearer ", "");


    //* 3️ verify token
    const user = jwt.verify(token, process.env.JWT_SECRET);
  
    
  
    //* 4️ attach payload to req.user
    req.user = user;
  
    //* 5️ call next()
    next();
  } catch (error) {
    return res.status(401).json({
      status: "failure",
      message: "invalid token or token is expire"
    });
  }
}