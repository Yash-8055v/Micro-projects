import bcrypt from "bcrypt";
import { User } from "../models/User.model.js";
import jwt from "jsonwebtoken";
import { cookieOptions } from "../config/cookies.js";

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
    
    
    const payload = {
      userId: user._id,
      email: user.email,
      role: user.role
      
    }
    
    const accessToken = await jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRY});

    const refreshToken = await jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: process.env.REFRESH_TOKEN_EXPIRY});

    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", refreshToken, cookieOptions);


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
  res.status(200).json(req.user)
}

export const googleCallback = async (req, res) => {
  try {
    /**
     * STEP 1: Get Google user profile from Passport
     * Passport automatically attaches it to req.user
     */
    const googleUser = req.user;

    /**
     * Google profile structure (important to know):
     * googleUser.id
     * googleUser.emails[0].value
     * googleUser.displayName
     */

    const email = googleUser.emails[0].value;
    const googleId = googleUser.id;

    /**
     * STEP 2: Check if user already exists in DB
     */
    let user = await User.findOne({ email });

    /**
     * STEP 3: If user does NOT exist → create one
     */
    if (!user) {
      user = await User.create({
        email,
        googleId,
        authProvider: "google"
      });
    }

    /**
     * STEP 4: Create JWT payload
     * (same structure as normal login)
     */
    const payload = {
      userId: user._id,
      email: user.email,
      role: user.role,
    };

    /**
     * STEP 5: Generate tokens
     */
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );

    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: process.env.JWT_REFRESH_EXPIRY }
    );

    /**
     * STEP 6: Set HttpOnly cookies
     */
    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", refreshToken, cookieOptions);

    /**
     * STEP 7: Redirect user to frontend dashboard
     * IMPORTANT: OAuth uses redirects, NOT JSON
     */
    return res.redirect("http://localhost:5173/dashboard");

  } catch (error) {
    console.error("Google OAuth Error:", error);

    return res.redirect("http://localhost:5173/login?error=oauth");
  }
};