import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../api/axios";
import axios from "../api/axios";

const Dashboard = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
    await axios.post("/auth/logout");
  } catch (err) {
    // even if backend fails, continue logout
  }

    // Remove token
    localStorage.removeItem("token");

    //Remove token from axios headers
    setAuthToken(null);

    // Redirect to login
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
        <h1 className="text-xl font-semibold">
          Dashboard
        </h1>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
