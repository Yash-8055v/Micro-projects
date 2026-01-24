import bcrypt from "bcrypt";
import { User } from "../models/User.model.js";
import jwt from "jsonwebtoken";
import { cookieOptions } from "../config/cookies.js";
import generateToken from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
  
    //* 1. validate email or password
    if(!email|| !password) return res.status(400).json({status: "failure", message: "both fields are required"});
  
    //* 2 Check if user already exists
    const user = await User.findOne({email: email});
  
    if(user) return res.status(409).json({status: "failure", message: "user with this email already exist"});
  
    //* 3 hash password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    //* 4 Save user in DB
    const newUser = new User({
      email: email,
      password: hashedPassword,
      authProvider: "local"
    })
  
    await newUser.save();
  
    //* 5 send final response
    return res.status(201).json({status: "success", message: "User created successfully"});
  } catch (error) {
    return res.status(500).json({
      status: "failure",
      message: "Internal server error"
    });
  }


};

export const login = async (req, res) => {

  try {
    //* 1 Read email & password
    const {email, password} = req.body;
    
  
    //* 2 Validate email and password
    if(!email|| !password) return res.status(400).json({status: "failure", message: "both fields are required"});
  
    //* 3 Find user by email
    const user = await User.findOne({email: email});
  
    if(!user) return res.status(403).json({status: "failure", message: "invalid credential"});

    if(user.authProvider !== "local") {
      return res.status(400).json({
        status: "failure",
        message: "Please login using Google"
      })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
  
    if(!isPasswordValid) return res.status(403).json({status: "failure", message: "invalid credential"});
    
    
    const {newAccessToken, newRefreshToken} = await generateToken(user);
    

    user.refreshToken = newRefreshToken;
      await user.save();

    res.cookie("accessToken", newAccessToken, cookieOptions);
    res.cookie("refreshToken", newRefreshToken, cookieOptions);


    res.status(200).json({
      status: "success",
      message: "login successful",
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      },
      
    })

  } catch (error) {
    return res.status(500).json({
      status: "failure",
      message: "Internal server error"
    });
  }

};

export const logout = (req, res) => {
  res.clearCookie("accessToken", cookieOptions);
  res.clearCookie("refreshToken", cookieOptions);

  res.status(200).json({status: "success", message: "logout successfully"});
}

export const getMe = (req, res) => {
  res.status(200).json({
    user: req.user,
  });
}

export const refresh = async (req, res) => {
  try {
    const {refreshToken} = req.cookies;
    if (!refreshToken) {
  return res.status(401).json({
    status: "failure",
    message: "Refresh token missing",
  });
}

    const decoded = await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user || user.refreshToken !== refreshToken) {
      res.clearCookie("accessToken", cookieOptions);
      res.clearCookie("refreshToken", cookieOptions);
      return res.status(401).json({status: "failure", message: "reusing token"});
    }

    const {newAccessToken, newRefreshToken} = generateToken(user);

    user.refreshToken = newRefreshToken;
      await user.save();

    res.cookie("accessToken", newAccessToken, cookieOptions);
    res.cookie("refreshToken", newRefreshToken, cookieOptions);


    res.status(200).json({
      status: "success",
      message: "new refresh token assign",
      accessToken: newAccessToken,
    })

  } catch (error) {
    return res.status(401).json({
      status: "failure",
      message: "Invalid or expired refresh token"
    })
  }
}

export const googleCallback = async (req, res) => {
  try {
    const user = req.user; // from passport
    


    const { newAccessToken, newRefreshToken } = await generateToken(user);
    

    res.cookie("accessToken", newAccessToken, cookieOptions);
    res.cookie("refreshToken", newRefreshToken, cookieOptions);

    // role-based redirect
    if (user.role === "admin") {
      return res.redirect("http://localhost:5173/dashboard");
    }

    return res.redirect("http://localhost:5173/dashboard");

  } catch (error) {
    console.log("error in googlecallback");
    return res.redirect("http://localhost:5173/login");
  }
};