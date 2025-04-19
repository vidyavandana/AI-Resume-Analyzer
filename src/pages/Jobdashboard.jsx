import React, { useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import "./jobdashboard.css";
import ChatlingWidget from './ChatlingWidget';

const Jobdashboard = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Add state for errors

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert('Please upload a resume!');
      return;
    }

    setLoading(true);
    setError(null); // Reset any previous errors

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://localhost:8000/parse-resume', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch recommendations');
      }

      const data = await response.json();
      console.log("Parsed resume data:", data); // Debug log to check what we are getting

      // Set recommendations with the backend data
      setRecommendations({
        skills: data.skills || [],
        score: data.score || 0,
        tips: data.improvements || [],
        video: data.video_recommendation || 'No video available',
        predicted_role: data.predicted_role || 'Role not predicted'
      });
    } catch (error) {
      console.error(error);
      setError(error.message);  // Display detailed error message to user
    } finally {
      setLoading(false);
    }
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
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Analyzing Resume...' : 'Get Recommendations'}
        </button>
      </div>

      {error && <p className="error">{error}</p>} {/* Show error message if any */}

      {recommendations && (
        <div className="results-section">
          <div className="recommendations">
            <h2>Your Recommendations</h2>
            <p><strong>Skills to Add:</strong> {recommendations.skills.join(', ') || 'None'}</p>
            <p><strong>Overall Score:</strong> {recommendations.score}%</p>
            {recommendations.tips.length > 0 && (
              <ul>
                {recommendations.tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            )}
          </div>

          {recommendations.video && (
            <div className="video-section">
              <h3>Suggested Role: {recommendations.predicted_role}</h3>
              <p>Watch this video to learn more:</p>
              <a href={recommendations.video} target="_blank" rel="noopener noreferrer">
                {recommendations.video}
              </a>
            </div>
          )}
        </div>
      )}

      <ChatlingWidget />
    </div>
  );
};

export default Jobdashboard;
