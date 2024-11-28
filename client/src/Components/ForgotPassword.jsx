import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import img from "../assets/wall1.jpg"; 
import logo from "../assets/Symbol_Stazy_black.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required!");
      return;
    }

    Axios.post("http://localhost:3000/auth/forgot-password", { email })
      .then((response) => {
        if (response.data.status) {
          toast.success("Check your email for the reset password link");
          navigate("/login");
        } else {
          toast.error("Error sending reset link.");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("An error occurred.");
      });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
      }}
    >
      <Toaster position="top-right" reverseOrder={false} />
      
      <div
        className="w-100 p-4 border rounded shadow-sm"
        style={{ maxWidth: "400px", backgroundColor: "rgba(255, 255, 255, 0.8)" }}
      >
        <div className="d-flex justify-content-center mb-4">
            <img
              src={logo}
              alt="Stazy Logo"
              className="img-fluid"
              style={{ maxWidth: "60px" }}
            />
          </div>
        <h2 className="text-center fw-bold mb-4">Forgot Password</h2>
        <p className="text-center text-muted mb-4">
          Enter your registered email to reset your password.
        </p>

        <form onSubmit={handleSubmit}>
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

          <button
            type="submit"
            className="btn btn-dark w-100 mb-3 text-uppercase fw-bold"
          >
            Send Reset Link
          </button>

          <p className="text-center text-muted">
            Remembered your password?{" "}
            <Link to="/login" className="text-decoration-none fw-bold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
