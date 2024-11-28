import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Symbol_Stazy.jpg";
import toast, { Toaster } from "react-hot-toast";

const Home = () => {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    // Verify user authentication
    axios
      .get("http://localhost:3000/auth/verify")
      .then((res) => {
        if (!res.data.status) {
          navigate("/login");
        } else {
          // Fetch features dynamically (simulate API call)
          const fetchedFeatures = [
            {
              title: "Listing Management",
              description: "Create and manage property listings with ease.",
              type: "free",
            },
            {
              title: "Rent Collection Automation",
              description: "Automate rent reminders and payments.",
              type: "free",
            },
            {
              title: "Financial Management",
              description: "Track income, expenses, and financial performance.",
              type: "free",
            },
            {
              title: "Multi-Property Management",
              description: "Manage multiple properties in one place.",
              type: "pro",
            },
            {
              title: "AI-Powered Matching",
              description: "Find perfect rental matches intelligently.",
              type: "pro",
            },
            {
              title: "Advanced Rental Management",
              description: "Automate tenant communication and updates.",
              type: "pro",
            },
          ];
          setFeatures(fetchedFeatures);
          setLoading(false);
        }
      })
      .catch((err) => console.error(err));
  }, [navigate]);

  const handleLogout = () => {
    axios
      .get("http://localhost:3000/auth/logout")
      .then((res) => {
        if (res.data.status) {
          toast.success("Logout successful!");
          navigate("/login");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="home-container bg-light">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <a
            className="navbar-brand d-flex flex-column align-items-center"
            href="#"
          >
            <img src={logo} alt="Stazy Logo" style={{ height: "40px" }} />
            <span className="fw-bold mt-1">Stazy</span>{" "}
            {/* Reduced margin-top */}
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#features">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#process">
                  How it Works
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#download">
                  Download
                </a>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="btn btn-dark ms-3">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-primary text-white text-center py-5">
        <div className="container">
          <h1 className="display-4 fw-bold">Supercharge Your Rentals</h1>
          <p className="lead mb-4">
            Drive growth and maximize your rental income with AI-powered
            solutions.
          </p>
          <div className="input-group w-50 mx-auto">
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email address"
            />
            <button className="btn btn-dark">Subscribe</button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-5 bg-light">
  <div className="container">
  <h2 className="text-center fw-bold mb-4 text-primary" style={{ fontSize: '2.5rem', letterSpacing: '1px' }}>
  Our Features
</h2>
<p className="text-center text-muted mb-5" style={{ fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
  Discover how our platform helps you manage and grow your rental business effortlessly, with advanced tools and an intuitive interface. Make your property management smooth and efficient.
</p>

    {loading ? (
      <p className="text-center">Loading features...</p>
    ) : (
      <div className="row g-4">
        {features.map((feature, index) => (
          <div className="col-md-4" key={index}>
            <div
              className={`card h-100 shadow-lg border-0 rounded-4 ${feature.type === "pro" ? "border-primary" : ""}`}
              style={{
                background: `linear-gradient(135deg, #f8f9fa, #ffffff)`,
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";  // Only scale on hover
                e.currentTarget.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.2)"; // Enhance shadow
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";  // Return to original scale
                e.currentTarget.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.1)";  // Reset shadow
              }}
            >
              <div
                className="card-body d-flex flex-column justify-content-between p-4"
                style={{ minHeight: "100px" }}
              >
                <div className="mb-3">
                  <div className="d-flex align-items-center">
                    <div
                      className="icon-container bg-black text-white rounded-circle d-flex justify-content-center align-items-center me-3"
                      style={{
                        width: "30px",
                        height: "30px",
                        fontSize: "24px",
                        flexShrink: 0,
                      }}
                    >
                      <i
                        className={`${
                          feature.type === "pro"
                            ? "bi bi-lightning-charge-fill"
                            : "bi bi-check-circle-fill"
                        }`}
                      ></i>
                    </div>
                    <h5 className="card-title mb-0 fs-4 fw-bold" style={{ color: "#333" }}>
                      {feature.title}
                      {feature.type === "pro" && (
                        <span className="badge bg-primary ms-2">Pro</span>
                      )}
                    </h5>
                  </div>
                </div>
                <p className="card-text text-muted mb-4" style={{ fontSize: "14px", lineHeight: "1.5" }}>
                  {feature.description}
                </p>
              </div>
              <div className="card-footer bg-white border-0 text-center py-3">
                <button
                  className={`btn btn-lg w-100 ${
                    feature.type === "pro"
                      ? "btn-outline-primary"
                      : "btn-outline-dark"
                  } rounded-3`}
                  style={{ transition: "background-color 0.3s ease, color 0.3s ease" }}
                >
                  {feature.type === "pro" ? "Learn More" : "Get Started"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
</section>




      {/* Process Section */}
      <section id="process" className="bg-light py-5">
  <div className="container">
    <h2
      className="text-center fw-bold mb-5 text-primary text-animated"
      style={{
        fontSize: '2rem',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        fontWeight: '300',
        textShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', // subtle text shadow for better visibility
      }}
    >
      How It Works
    </h2>

    <div className="row justify-content-center">
      {/* Step 1 */}
      <div className="col-md-4 mb-5 mb-md-0">
        <div
          className="process-step"
          style={{
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            padding: "30px",
            background: "white",
            borderRadius: "15px",
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            height: "100%",
            cursor: "pointer", // Adding cursor for better interaction feel
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.1)";
          }}
        >
          <h5
            className="fw-bold mb-3"
            style={{
              fontSize: "1.5rem",
              color: "#28a745", // Green for Step 1
              letterSpacing: "0.5px",
              transition: "color 0.3s ease",
            }}
          >
            Step 1
          </h5>
          <p
            className="text-muted mb-4"
            style={{
              fontSize: "1rem",
              color: "#666",
              lineHeight: "1.6",
            }}
          >
            Register as a tenant or landlord, providing the necessary details to get started.
          </p>
          <button
            className="btn btn-success w-75"
            style={{
              textTransform: "uppercase",
              letterSpacing: "1px",
              fontWeight: "500",
              transition: "background-color 0.3s ease",
            }}
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Step 2 */}
      <div className="col-md-4 mb-5 mb-md-0">
        <div
          className="process-step"
          style={{
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            padding: "30px",
            background: "white",
            borderRadius: "15px",
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            height: "100%",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.1)";
          }}
        >
          <h5
            className="fw-bold mb-3"
            style={{
              fontSize: "1.5rem",
              color: "#007bff", // Blue for Step 2
              letterSpacing: "0.5px",
              transition: "color 0.3s ease",
            }}
          >
            Step 2
          </h5>
          <p
            className="text-muted mb-4"
            style={{
              fontSize: "1rem",
              color: "#666",
              lineHeight: "1.6",
            }}
          >
            Search for available rentals or list your property to reach potential tenants.
          </p>
          <button
            className="btn btn-primary w-75"
            style={{
              textTransform: "uppercase",
              letterSpacing: "1px",
              fontWeight: "500",
              transition: "background-color 0.3s ease",
            }}
          >
            Find Rentals
          </button>
        </div>
      </div>

      {/* Step 3 */}
      <div className="col-md-4 mb-5 mb-md-0">
        <div
          className="process-step"
          style={{
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            padding: "30px",
            background: "white",
            borderRadius: "15px",
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            height: "100%",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.1)";
          }}
        >
          <h5
            className="fw-bold mb-3"
            style={{
              fontSize: "1.5rem",
              color: "#ffc107", // Yellow for Step 3
              letterSpacing: "0.5px",
              transition: "color 0.3s ease",
            }}
          >
            Step 3
          </h5>
          <p
            className="text-muted mb-4"
            style={{
              fontSize: "1rem",
              color: "#666",
              lineHeight: "1.6",
            }}
          >
            Connect with landlords or tenants directly and finalize your rental agreement.
          </p>
          <button
            className="btn btn-warning w-75"
            style={{
              textTransform: "uppercase",
              letterSpacing: "1px",
              fontWeight: "500",
              transition: "background-color 0.3s ease",
            }}
          >
            Start Connecting
          </button>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* Download Section */}
<section id="download" className="text-center py-5 bg-light">
  <div className="container">
    <h2 className="fw-bold mb-4 text-primary text-animated" style={{ fontSize: '2.5rem', letterSpacing: '1px' }}>
      Download the Stazy App
    </h2>
    <p className="mb-5 text-muted" style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
      Take your rental management to the next level. Available for Android and iOS.
    </p>

    <div className="d-flex justify-content-center">
      <button
        className="btn btn-lg btn-primary me-3 shadow-lg"
        style={{
          padding: '12px 30px',
          fontSize: '1rem',
          borderRadius: '50px',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 5px 10px rgba(0, 0, 0, 0.1)';
        }}
      >
        Download for Android
      </button>

      <button
        className="btn btn-lg btn-dark shadow-lg"
        style={{
          padding: '12px 30px',
          fontSize: '1rem',
          borderRadius: '50px',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 5px 10px rgba(0, 0, 0, 0.1)';
        }}
      >
        Download for iOS
      </button>
    </div>
  </div>
</section>

{/* Footer */}
<footer className="bg-dark text-white text-center py-4" style={{ boxShadow: '0 -5px 10px rgba(0, 0, 0, 0.1)' }}>
  <p className="mb-0" style={{ fontSize: '1rem' }}>
    © 2024 Stazy. All rights reserved.
  </p>
</footer>

    </div>
  );
};

export default Home;
