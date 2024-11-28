import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import img from "../assets/wall1.jpg"; 
import logo from "../assets/Symbol_Stazy_black.png";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    Axios.post("http://localhost:3000/auth/reset-password/"+token, { password })
      .then((response) => {
        if (response.data.status) {
          toast.success("Password reset successful. Please login.");
          navigate("/login");
        } else {
          toast.error("Error resetting password.");
          navigate("/login");
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
        style={{
          maxWidth: "400px",
          backgroundColor: "rgba(255, 255, 255, 0.8)", // semi-transparent background
        }}
      >
        <div className="d-flex justify-content-center mb-4">
            <img
              src={logo}
              alt="Stazy Logo"
              className="img-fluid"
              style={{ maxWidth: "60px" }}
            />
          </div>
        <h2 className="text-center fw-bold mb-4">Reset Password</h2>
        <p className="text-center text-muted mb-4">
          Enter your new password below to reset it.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">
              New Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-dark w-100 mb-3 text-uppercase fw-bold"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
