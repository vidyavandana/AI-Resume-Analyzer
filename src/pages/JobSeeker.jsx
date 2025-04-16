import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; 
import "./JobSeeker.css";

const Recruiter = () => {
  return (
    <motion.div 
      className="recruiter-container"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 1 }}
    >
      {/* Navbar Section */}
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
              <Link to="/contact">Contact Us</Link>
            </motion.li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <motion.div 
          className="hero-text"
          initial={{ x: -200 }} 
          animate={{ x: 0 }} 
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1>
            Elevate Your Career with <span className="italic">HireSync</span> 🚀
          </h1>
          <p>
            Upload your resume and let our AI-powered resume analyzer unlock your potential.
            Receive personalized skill recommendations, an overall score, and expert tips to 
            stand out in your job search.
          </p>
          <div>
            <p>Ready to take the next step in your career? Join us today! 👇</p>
            <motion.button 
              type="submit" 
              className="email-signup button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link to="/">Sign Up</Link>
            </motion.button>
            <p>Already part of HireSync? Log in and get started! 🔎</p>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link to="/login">Log in</Link>
            </motion.button>
          </div>
        </motion.div>

        {/* Image Section */}
        <motion.div 
          className="hero-image"
          initial={{ y: 100, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </section>
    </motion.div>
     
  );
};

export default Recruiter;
