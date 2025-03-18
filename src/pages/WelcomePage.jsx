import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import hireImage from "../assets/img/hire3.webp";
import "./WelcomePage.css";

// Mission and Vision Component
const MissionVision = () => {
  const features = [
    {
      icon: "⚡",
      title: "Streamlined Hiring",
      description:
        "Helpful for recruiters by saving time and making the hiring process quicker and more efficient.",
    },
    {
      icon: "💼",
      title: "Job Seeker Assistance",
      description:
        "Provides suggestions to job seekers for enhancing their skills and increasing employability.",
    },
    {
      icon: "🤖",
      title: "Chatbot for Interview Prep",
      description:
        "An AI-powered chatbot to help job seekers prepare for interviews with personalized guidance.",
    },
    {
      icon: "📄",
      title: "Resume Analyzer",
      description:
        "Offers detailed insights and personalized recommendations to improve your resume and stand out.",
    },
  ];

  return (
    <div className="mission-container">
      <h2 className="mission-title">Our Mission and Vision</h2>
      <div className="mission-cards">
        {features.map((feature, index) => (
          <div key={index} className="mission-card">
            <span className="mission-icon">{feature.icon}</span>
            <h3 className="mission-card-title">{feature.title}</h3>
            <p className="mission-card-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function WelcomePage() {
  return (
    <div>
      {/* Navigation Bar */}
      <header className="navbar">
        <motion.div 
          className="logo"
          initial={{ x: -100 }} 
          animate={{ x: 0 }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          HireSync
        </motion.div>
        <nav>
          <ul>
            <motion.li initial={{ y: -50 }} animate={{ y: 0 }} transition={{ duration: 0.8 }}>
              <a href="/">About HireSync</a>
            </motion.li>
            <motion.li initial={{ y: -50 }} animate={{ y: 0 }} transition={{ duration: 1 }}>
              <a href="/recruiter">Recruiters</a>
            </motion.li>
            <motion.li initial={{ y: -50 }} animate={{ y: 0 }} transition={{ duration: 1.2 }}>
              <a href="/JobSeeker">Job Seekers</a>
            </motion.li>
            <motion.li initial={{ y: -50 }} animate={{ y: 0 }} transition={{ duration: 1.4 }}>
              <a href="/">Contact Us</a> {/* Smooth Scroll */}
            </motion.li>
          </ul>
        </nav>
      </header>

      {/* Main Layout */}
      <div className="main-content">
        <div className="left-section">
          <div className="hero-content">
            <h1>
              <span className="highlight">HireSync</span>: Your Path to <strong>Smart <em>Hiring</em></strong>
            </h1>
            <p>
              Streamline your hiring process with our intuitive platform. Our resume analyzer 
              provides insights, helping candidates enhance their profiles and recruiters 
              manage applications.
            </p>
          </div>

          {/* Signup Box */}
          <div className="signup-box">
            <h2>Join <strong><em>HireSync</em></strong></h2>
            <form>
              <div className="role-selection">
                <button type="button" className="role-btn">Recruiter</button>
                <button type="button" className="role-btn">Job Seeker</button>
              </div>
              <input type="text" placeholder="Username" required />
              <input type="email" placeholder="Email Address" required />
              <input type="password" placeholder="Password" required />
              <input type="password" placeholder="Confirm Password" required />
              <button type="submit" className="signup-btn">Sign Up</button>
            </form>
            <p className="black-content">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </div>
        </div>

        {/* Right Section - Full Image */}
        <div className="right-section">
          <img className="image-struct" src={hireImage} alt="hiresync" />
        </div>
      </div>

      {/* Our Mission and Vision Section */}
      <MissionVision />

      {/* Footer Section - Contact Us */}
      <footer className="footer">
        <div className="footer-container">
          <div className="contact-item">
            <i class="fas fa-envelope"></i>
            <h3>Email Us</h3>
            <p>For any inquiries, reach us at <a href="mailto:support@example.com">support@example.com</a></p>
          </div>

          <div className="contact-item">
            <i class="fas fa-phone-alt"></i>
            <h3>Call Us</h3>
            <p>Feel free to reach us through call <a href="tel:+91 8309681559">+91 8309681559</a></p>
          </div>

          <div className="contact-item">
            <i class="fab fa-instagram"></i>
            <h3>Instagram</h3>
            <p>Follow our page for more updates <a href="hiresync">@Hiresync</a> </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
