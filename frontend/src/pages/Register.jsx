import { useState } from "react";
import axios from "../api/axios.js";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const submit = async () => {
    await axios.post("/auth/register", form);
    navigate("/verify-otp", { state: { email: form.email } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Create Account
        </h2>

        <input 
        className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
        placeholder="Username" onChange={e => setForm({...form, username: e.target.value})} 
        />

        <input className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
        placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />

        <input className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
        placeholder="Password" type="password" onChange={e => setForm({...form, password: e.target.value})} />

        <button 
        onClick={submit} 
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Register
        </button>

      </div>
    </div>
  );
};

export default Register;
