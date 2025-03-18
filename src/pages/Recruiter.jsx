import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion
import "./Recruiter.css";

const Recruiter = () => {
  return (
    <motion.div 
      className="recruiter-container"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 1 }}
    >
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
            <motion.li initial={{ y: -50 }} animate={{ y: 0 }} transition={{ duration: 0.8 }}><a href="/">About HireSync</a></motion.li>
            <motion.li initial={{ y: -50 }} animate={{ y: 0 }} transition={{ duration: 1 }}><a href="/recruiter">Recruiters</a></motion.li>
            <motion.li initial={{ y: -50 }} animate={{ y: 0 }} transition={{ duration: 1.2 }}><a href="/JobSeeker">Job Seekers</a></motion.li>
            <motion.li initial={{ y: -50 }} animate={{ y: 0 }} transition={{ duration: 1.4 }}><a href="/
            ">Contact Us</a></motion.li>
          </ul>
        </nav>
      </header>

      <section className="hero">
        <motion.div 
          className="hero-text"
          initial={{ x: -200 }} 
          animate={{ x: 0 }} 
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1>
            Simplify Your <span className="italic">Hiring</span> Process Today
          </h1>
          <p>
            HireSync’s recruiter portal offers advanced tools to streamline your hiring process. 
            Manage profiles, track applications, and connect with top talent efficiently.
          </p>
          <div>
            <p>Why late 🤔!! Create an account and explore 👇👇👇</p>
            <motion.button 
              type="submit" 
              className="email-signup button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link to="/">Sign Up</Link>
            </motion.button>
            <p>Already have an account 👍?? Then login 👇👇👇</p>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link to="/login">Log in</Link>
            </motion.button>
          </div>
        </motion.div>
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
