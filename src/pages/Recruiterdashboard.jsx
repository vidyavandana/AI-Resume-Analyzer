import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import hireImage from "../assets/img/hire3.webp";
import "./Recruiterdashboard.css";
const Recruiterdashboard = () => {
    const features = [
      {
        icon: "⚡",
        title: "Resume Hiring",
        description:
          "Helpful for recruiters by saving time and making the hiring process quicker and more efficient.",
      },
      {
        icon: "💼",
        title: "Download Resume",
        description:
          "Download resumes to help you shortlist candidates efficiently.",
      },
      {
        icon: "📄",
        title: "Search Resume",
        description:
          "Find resumes that match your job descriptions quickly and easily.",
      },
    ];
  
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
                <Link to="/">About HireSync</Link>
              </motion.li>
              <motion.li initial={{ y: -50 }} animate={{ y: 0 }} transition={{ duration: 1 }}>
                <Link to="/recruiter">Recruiters</Link>
              </motion.li>
              <motion.li initial={{ y: -50 }} animate={{ y: 0 }} transition={{ duration: 1.2 }}>
                <Link to="/JobSeeker">Job Seekers</Link>
              </motion.li>
              <motion.li initial={{ y: -50 }} animate={{ y: 0 }} transition={{ duration: 1.4 }}>
                <Link to="/">Contact Us</Link> 
              </motion.li>
            </ul>
          </nav>
        </header>
  
        {/* Features Section */}
        <div className="features-container">
          <h2 className="section-title">Recruiter Features</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className="feature-card"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default Recruiterdashboard;
  