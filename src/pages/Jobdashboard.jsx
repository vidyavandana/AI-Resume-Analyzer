import React, { useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import {
  PieChart, Pie, Cell, Tooltip, Legend
} from 'recharts';
import "./jobdashboard.css";

const Jobdashboard = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);

  const COLORS = ['#00C49F', '#FF8042'];

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setRecommendations(null);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert('Please upload a resume!');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile); // <-- fixed key here

    try {
      setLoading(true);
      const response = await fetch('http://127.0.0.1:8000/parse-resume', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch recommendations');
      }

      const data = await response.json();
      setRecommendations(data);
    } catch (error) {
      console.error('Error uploading resume:', error);
      alert('Something went wrong while uploading resume.');
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
          {loading ? 'Analyzing...' : 'Get Recommendations'}
        </button>
      </div>

      {recommendations && (
        <div className="recommendations">
          <h2>Your Resume Analysis</h2>

          <p><b>Skills Found:</b> {recommendations.skills.join(', ') || 'None detected'}</p>
          <p><b>Recommended Skills:</b> {recommendations.recommended_skills.length > 0 ? recommendations.recommended_skills.join(', ') : 'No suggestions, great job!'}</p>
          <p><b>Overall Score:</b> {recommendations.score}%</p>

          <div>
            <PieChart width={300} height={250}>
              <Pie
                data={[
                  { name: 'Score', value: recommendations.score },
                  { name: 'Missing', value: 100 - recommendations.score }
                ]}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                <Cell fill={COLORS[0]} />
                <Cell fill={COLORS[1]} />
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>

          <p><b>Suggestions to Improve:</b></p>
          <ul>
            {recommendations.improvements.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Jobdashboard;
