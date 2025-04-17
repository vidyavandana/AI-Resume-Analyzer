import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./pages/LoginPage";
import Recruiter from "./pages/Recruiter";
import JobSeeker from "./pages/JobSeeker";
import Jobdashboard from "./pages/Jobdashboard";
import Recruiterdashboard from "./pages/Recruiterdashboard";
import ChatlingWidget from "./pages/ChatlingWidget.jsx"; // Chatling bot


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/JobSeeker" element={<JobSeeker />} />
          <Route path="/Jobdashboard" element={<Jobdashboard />} />
          <Route path="/recruiter" element={<Recruiter />} />
          <Route path="/recruiter-dashboard" element={<Recruiterdashboard />} />
        </Routes>
      
      </div>
    </Router>
  );
}

export default App;
