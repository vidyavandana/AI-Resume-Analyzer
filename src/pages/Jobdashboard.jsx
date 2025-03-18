// Jobdashboard.jsx

import React, { useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import "./jobdashboard.css";

const Jobdashboard = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [recommendations, setRecommendations] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert('Please upload a resume!');
      return;
    }

    // Simulated API Call
    setRecommendations({
      skills: ['JavaScript', 'React', 'Node.js'],
      score: 85,
      tips: ['Customize your resume for the role', 'Use clear and concise language']
    });
  };

  return (
    <div className="jobseeker-container">
      <h1>Upload Your Resume</h1>
      <div className="upload-section">
        <label className="upload-label">
          <FaUpload className="upload-icon" /> Choose File
          <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
        </label>
        {selectedFile && <p>Uploaded: {selectedFile.name}</p>}
        <button onClick={handleSubmit}>Get Recommendations</button>
      </div>

      {recommendations && (
        <div className="recommendations">
          <h2>Your Recommendations</h2>
          <p><b>Skills to Add:</b> {recommendations.skills.join(', ')}</p>
          <p><b>Overall Score:</b> {recommendations.score}%</p>
          <p><b>Tips:</b></p>
          <ul>
            {recommendations.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Jobdashboard;


