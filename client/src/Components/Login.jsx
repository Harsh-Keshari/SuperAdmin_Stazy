import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import img from "../assets/wall1.jpg";
import logo from "../assets/Symbol_Stazy_black.png";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("All fields are required!");
      return;
    }

    Axios.post("http://localhost:3000/auth/login", { email, password })
      .then((response) => {
        if (response.data.status) {
          toast.success("Login Successful! Redirecting...");
          setTimeout(() => {
            navigate("/home");
          }, 2000); // Delay navigation to allow the toast to show
        } else {
          toast.error("Invalid Credentials");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Login Failed. Please try again later.");
      });
  };

  return (
    <div
      className="container-fluid vh-100 d-flex"
      style={{ width: "100vw", marginLeft: "-30px" }}
    >
      {/* Toast Container */}
      <Toaster position="top-right" reverseOrder={false} />

      <div className="col-md-6 position-relative p-0">
        <img
          src={img}
          alt="Inspiration"
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ objectFit: "cover", zIndex: -1 }}
        />
        <div className="d-flex flex-column justify-content-center align-items-center text-white h-100 text-center p-4">
          <h3 className="mb-3 text-uppercase fw-bold">A Wise Quote</h3>
          <h1 className="display-4 fw-bold">Get Everything You Want</h1>
          <p className="mt-3" style={{ maxWidth: "400px" }}>
            You can get everything you want if you work hard, trust the process,
            and stick to the plan.
          </p>
        </div>
      </div>

      <div className="col-md-6 d-flex justify-content-center align-items-center bg-white">
        <div className="w-75">
          <div className="d-flex justify-content-center mb-4">
            <img
              src={logo}
              alt="Stazy Logo"
              className="img-fluid"
              style={{ maxWidth: "80px" }}
            />
          </div>
          <form
            className="p-4 border rounded shadow-sm"
            onSubmit={handleSubmit}
          >
            <h2 className="text-center fw-bold mb-4">Welcome Back</h2>
            <p className="text-center text-muted mb-4">
              Enter your email and password to access your account
            </p>

            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-semibold">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="rememberMe"
                />
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember me
                </label>
              </div>
              <Link to="/forgotPassword" className="text-decoration-none">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="btn btn-dark w-100 mb-3 text-uppercase fw-bold"
            >
              Sign In
            </button>

            <p className="text-center text-muted">
              Don't have an account?{" "}
              <Link to="/signup" className="text-decoration-none fw-bold">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
