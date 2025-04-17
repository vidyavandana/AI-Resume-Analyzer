import React, { useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import "./jobdashboard.css";
import ChatlingWidget from './ChatlingWidget';

const Jobdashboard = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false); // New loading state

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert('Please upload a resume!');
      return;
    }

    setLoading(true); // Start loading

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
      setRecommendations({
        skills: data.skills,
        score: data.score,
        tips: data.improvements,
        video: data.video_recommendation,
        predicted_role: data.predicted_role
      });
    } catch (error) {
      console.error(error);
      alert('Error analyzing resume. Please try again.');
    } finally {
      setLoading(false); // End loading
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

      {recommendations && (
        <>
          <div className="recommendations">
            <h2>Your Recommendations</h2>
            <p><b>Skills to Add:</b> {recommendations.skills?.join(', ')}</p>
            <p><b>Overall Score:</b> {recommendations.score}%</p>
            <p><b>Tips:</b></p>
            <ul>
              {recommendations.tips?.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>

          <div className="video-section">
            <h3>Suggested Role: {recommendations.predicted_role}</h3>
            <p>Watch this video to learn more:</p>
            <a href={recommendations.video} target="_blank" rel="noopener noreferrer">{recommendations.video}</a>
          </div>
        </>
      )}
    
      <ChatlingWidget />
    </div>
  );
};

export default Jobdashboard;
