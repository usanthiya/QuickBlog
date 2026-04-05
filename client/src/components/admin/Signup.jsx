import React, { useState } from "react";
import { signup } from "../../api/auth.js";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const response = await signup(name, email, password, mobile);
        if(response.success){
          alert(response.message);
          navigate('/admin');
        }else{
          alert(response.message);
        }
    }catch(error){
      alert(response.message || "Signup failed. Please try again.");
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full py-6 text-center">
            <h1 className="text-3xl font-bold">
              <span className="text-primary">Admin</span> Signup
            </h1>
            <p className="font-light">
                Enter your details to create a new admin account.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="w-full mt-6  sm:max-w-md text-gray-600">
             <div className="flex flex-col">
              <lable>Name</lable>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                required
                placeholder="Your name"
                className="border-b-2 border-gray-300 p-2 outline-none mb-6"
              />
            </div>
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
            <div className="flex flex-col">
              <lable>Mobile</lable>
              <input
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                type="text"
                required
                placeholder="Your mobile number"
                className="border-b-2 border-gray-300 p-2 outline-none mb-6"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 font-medium bg-primary text-white rounded cursor-pointer hover:bg-primary/90 transition-all"
            >
              Signup
            </button>
            <p className="mt-4 text-center">Already have an account? <Link to="/admin" className="text-primary hover:underline">Login</Link></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
