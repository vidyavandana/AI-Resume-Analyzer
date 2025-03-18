import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("jobseeker"); // Default role selection
  const navigate = useNavigate(); 

  const handleLogin = () => {
    console.log("Login Attempt:", { email, role });

    // Simulating authentication (Replace with API call)
    if (email && password) {
      localStorage.setItem("userRole", role); // Store user role
      if (role === "recruiter") {
        navigate("/recruiter-dashboard"); // Redirect to Recruiter Dashboard ✅
      } else {
        navigate("/Jobdashboard"); // Redirect to Job Seeker Dashboard (to be created)
      }
    } else {
      alert("Please enter valid credentials!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login to HireSync</h2>

        {/* Role Selection */}
        <div className="role-buttons">
          <button
            className={`role-button ${role === "recruiter" ? "active" : ""}`}
            onClick={() => setRole("recruiter")}
          >
            Recruiter
          </button>
          <button
            className={`role-button ${role === "jobseeker" ? "active" : ""}`}
            onClick={() => setRole("jobseeker")}
          >
            Job Seeker
          </button>
        </div>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />

        {/* Login Button */}
        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>

        {/* Sign Up Link */}
        <p className="signup-text">
          Don't have an account? <Link to="/">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
