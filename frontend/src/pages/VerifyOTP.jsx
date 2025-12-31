import { useState } from "react";
import axios from "../api/axios.js";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyOtp = ()=>{
    const [otp, setOtp]= useState("");
    const {state} = useLocation();
    const navigate = useNavigate();

    if(!state?.email){
        navigate("/register");
        return null;
    }

    const submit =  async()=>{
        await axios.post("/auth/verify-otp",{
            email: state.email,
            otp
        });
        navigate("/login");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">

                <h2 className="text-2xl font-semibold text-center mb-2">
                    Verify OTP
                </h2>

                <p className="text-sm text-gray-600 text-center mb-6">
                Enter the OTP sent to <br />
                <span className="font-medium">{state.email}</span>
                </p>
        
                <input 
                    className="w-full mb-6 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-center tracking-widest" 
                    placeholder="Enter OTP"
                    onChange={(e)=> setOtp(e.target.value)}
                />

                <button 
                onClick={submit}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                    Verify
                </button>

            </div> 
        </div>
    );
};

export default VerifyOtp;