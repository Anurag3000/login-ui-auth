import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { generateOTP } from "../utils/generateOTP.js";
import { sendEmail } from "../utils/sendEmail.js";
import BlacklistedToken from "../models/BlacklistedToken.js";


export const register= async(req, res)=>{
    try{
        const {username, email, password}=req.body;

        if(!username || !email || !password){
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const existingUser= await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const passwordHash=await bcrypt.hash(password, 10);

        const otp=generateOTP();
        const otpExpiresAt= new Date(Date.now() + 10*60*1000); // 10 minutes from now


        await User.create({
            username,
            email,
            passwordHash,
            isVerified: false,
            otp,
            otpExpiresAt
        });

        await sendEmail(email, otp);

        res.status(201).json({
            message: "Registration successful. OTP sent to email.",
            // userId: user._id,
        });
    }
    catch(error){
        console.error("Register error: ", error);
        res.status(500).son({
            message: "Server error"
        });
    }
};

export const verifyOTP=async(req, res)=>{
    try{
        const {email, otp}=req.body;

        if(!email||!otp){
            return res.status(400).json({
                message: "Email and OTP are required"
            });
        }

        const user= await User.findOne({email});

        if(!user){
            return res.status(400).json({
                message: "User not found"
            });
        }

        if(user.isVerified){
            return res.status(400).json({
                message: "User already verified"
            });
        }

        if(
            user.otp!==otp||user.otpExpiresAt<Date.now()
        ){
            return res.status(400).json({
                message: "Invalid or expired OTP"
            });
        }

        user.isVerified=true;
        user.otp=undefined;
        user.otpExpiresAt=undefined;

        await user.save();

        res.json({
            message: "email verified successfully"
        });
    }
    catch(error){
        console.error("Verify OTP error: ", error);
        res.status(500).json({
            message: "Server error"
        });
    }

}

export const login=async(req, res)=>{
    try{
        const{email, password}=req.body;

        if(!email || !password){
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const user=await User.findOne({email});

        if(!user){
            return res.status(400).json({
                message: "User not found"
            });
        }

        if(!user.isVerified){
            return res.status(400).json({
                message: "Email not verified"
            });
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);

        if(!isMatch){
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            {userId: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        )

        res.json({
            message: "Login successful",
            token
        });
    }
    catch(error){
        console.error("Login error: ", error);
        res.status(500).json({
            message: "Server error"
        });
    }
}

export const logout = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];

    const decoded = jwt.decode(token);

    await BlacklistedToken.create({
      token,
      expiresAt: new Date(decoded.exp * 1000)
    });

    res.json({
      message: "Logged out successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Logout failed"
    });
  }
};