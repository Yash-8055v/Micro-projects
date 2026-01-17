import bcrypt from "bcrypt";
import { User } from "../models/User.model.js";

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
