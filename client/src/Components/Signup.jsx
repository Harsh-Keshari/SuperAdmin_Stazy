import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import img from "../assets/wall1.jpg";
import logo from "../assets/Symbol_Stazy_black.png";
import toast, { Toaster } from "react-hot-toast";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      toast.error("All fields are required!");
      return;
    }

    Axios.post("http://localhost:3000/auth/signup", {
      username,
      email,
      password,
    })
      .then((response) => {
        if (response.data.status) {
          toast.success("Signup Successful! Redirecting...");
          setTimeout(() => {
            navigate("/login");
          }, 2000); // Delay navigation for toast display
        } else {
          toast.error("Signup Failed. Please try again.");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("An error occurred during signup. Try again later.");
      });
  };

  return (
    <div
      className="container-fluid p-0 vh-100 d-flex"
      style={{ margin: "0", padding: "0" }}
    >
      {/* Toast Container */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* Signup Form Section */}
      <div
        className="col-md-6 d-flex justify-content-center align-items-center bg-white"
        style={{ height: "100vh" }}
      >
        <div className="w-75">
          <div className="d-flex justify-content-center mb-4">
            <img
              src={logo}
              alt="Stazy Logo"
              className="img-fluid"
              style={{ maxWidth: "80px" }}
            />
          </div>

          <form className="p-4 border rounded shadow-sm" onSubmit={handleSubmit}>
            <h2 className="text-center fw-bold mb-4">Create an Account</h2>
            <p className="text-center text-muted mb-4">
              Fill in the details below to sign up and join us.
            </p>

            <div className="mb-3">
              <label htmlFor="username" className="form-label fw-semibold">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

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

            <button
              type="submit"
              className="btn btn-dark w-100 mb-3 text-uppercase fw-bold"
            >
              Sign Up
            </button>

            <p className="text-center text-muted">
              Already have an account?{" "}
              <Link to="/login" className="text-decoration-none fw-bold">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Inspirational Section */}
      <div
        className="col-md-6 p-0 position-relative"
        style={{ height: "100vh" }}
      >
        <img
          src={img}
          alt="Inspiration"
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ objectFit: "cover", zIndex: -1 }}
        />
        <div className="d-flex flex-column justify-content-center align-items-center text-white h-100 text-center p-4">
          <h3 className="mb-3 text-uppercase fw-bold">A Wise Quote</h3>
          <h1 className="display-4 fw-bold">Start Your Journey</h1>
          <p className="mt-3" style={{ maxWidth: "400px" }}>
            Take the first step to achieve greatness. Believe in yourself, stay
            committed, and success will follow.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
