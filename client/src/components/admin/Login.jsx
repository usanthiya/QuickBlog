import React, { useState } from "react";
import { login } from "../../api/auth.js";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../slice/authSlice";
import { assets } from "../../assets/assets";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const response = await login(email, password);
        if(response.success){
          alert(response.message);
          dispatch(loginSuccess({ token: response.data.token, user: response.data.user }));
          navigate('/admin');
        }else{
          alert(response.message);
        }
    }catch(error){
      alert(response.message || "Login failed. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="QuickBlog Logo"
        className="w-40 cursor-pointer mb-8"
      />
      <div className="w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full py-6 text-center">
            <h1 className="text-3xl font-bold">
              <span className="text-primary">Admin</span> Login
            </h1>
            <p className="font-light">
              Enter your credentials to access the admin panel.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="w-full mt-6  sm:max-w-md text-gray-600">
            <div className="flex flex-col">
              <lable>Email</lable>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                placeholder="Your email Id"
                className="border-b-2 border-gray-300 p-2 outline-none mb-6"
              />
            </div>
            <div className="flex flex-col">
              <lable>Password</lable>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
                placeholder="Your password"
                className="border-b-2 border-gray-300 p-2 outline-none mb-6"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 font-medium bg-primary text-white rounded cursor-pointer hover:bg-primary/90 transition-all"
            >
              Login
            </button>
            <p className="mt-4 text-center">Don't have an account? <Link to="/admin/signup" className="text-primary hover:underline">Signup</Link></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
