import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../app/auth"; // Make sure this path is correct
import "./LoginPage.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("jobseeker");
  const navigate = useNavigate();
  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
  
    try {
      const res = await login(email, password);
  
      console.log(res);  // Log the response for debugging
  
      if (res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("userRole", role);
        alert("Login successful!");
  
        if (role === "recruiter") {
          navigate("/recruiter-dashboard");
        } else {
          navigate("/Jobdashboard");
        }
      } else {
        alert(res.message || "Login failed.");
      }
    } catch (err) {
      console.error("Login error:", err);  // Log the error
      alert("Something went wrong. Please try again.");
    }
  };
  

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login to HireSync</h2>

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

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />

        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>

        <p className="signup-text">
          Don't have an account? <Link to="/">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
