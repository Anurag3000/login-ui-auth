import { useState } from "react";
import axios, {setAuthToken} from "../api/axios.js";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //for UX only
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const submit =async() => {
        setLoading(true);
        setError("");

        try{
            const res = await axios.post("/auth/login",{
            email,
            password,
        });

        const token=res.data.token;

        localStorage.setItem("token", token);
        setAuthToken(token);

        navigate("/dashboard");
        }
        catch(err){
            setError(
                err.response?.data?.message||"Login Failed"
            )
        }
        finally{
            setLoading(false);
        }
        }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center mb-2">
                    Welcome Back
                </h2>

                <p className="text-sm text-gray-600 text-center mb-6">
                    Sign in to continue
                </p>

                {error && (
                <div className="mb-4 text-sm text-red-600 text-center">
                    {error}
                </div>
                )}

                <input 
                className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="Email" 
                onChange={(e) => setEmail(e.target.value)} />

                <input type="password" 
                className="w-full mb-6 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="Password" 
                onChange={(e)=> setPassword(e.target.value)} />

                <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition" 
                onClick={submit}>
                    {/* Login */}
                
                {loading ? "Logging in..." : "Login"}
                </button>
            </div>            
        </div>
    )
}

export default Login;