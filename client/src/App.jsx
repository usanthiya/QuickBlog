import React from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Layout from "./pages/admin/Layout";
import Dashboard from "./pages/admin/Dashboard";
import AddBlog from "./pages/admin/AddBlog";
import ListBlog from "./pages/admin/ListBlog";
import Comments from "./pages/admin/Comments";
import Login from "./components/admin/Login";
import Signup from "./components/admin/Signup";
import "quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

const App = () => {
  const { token } = useSelector((state) => state.auth);

  return (
    <div>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        closeOnClick={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/admin" element={token ? <Layout /> : <Login />}>
          <Route index element={<Dashboard />} />
          <Route path="addBlog" element={<AddBlog />} />
          <Route path="listBlog" element={<ListBlog />} />
          <Route path="comments" element={<Comments />} />
        </Route>
        <Route path="/admin/signup" element={<Signup />} />
      </Routes>
    </div>
  );
};

export default App;
