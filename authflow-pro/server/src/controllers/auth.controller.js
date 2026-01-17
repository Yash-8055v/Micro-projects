import bcrypt from "bcrypt";
import { User } from "../models/User.model.js";
import jwt from "jsonwebtoken";

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

    const isPasswordValid = await bcrypt.compare(password, user.password);
  
    if(!isPasswordValid) return res.status(403).json({status: "failure", message: "invalid credential"});
    
    
    const payload = {
      userId: user._id,
      email: user.email,
      role: user.role
      
    }
    
    const token = await jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRY});

    res.status(200).json({
      status: "success",
      message: "login successful",
      token
    })

  } catch (error) {
    return res.status(500).json({
      status: "failure",
      message: "Internal server error"
    });
  }

};
