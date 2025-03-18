import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./pages/LoginPage";
import Recruiter from "./pages/Recruiter";
import JobSeeker from "./pages/JobSeeker";
import Jobdashboard from "./pages/Jobdashboard";
import Recruiterdashboard from "./pages/Recruiterdashboard";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/JobSeeker" element={<JobSeeker />} />s
        <Route path="/Jobdashboard" element={<Jobdashboard />} />
        <Route path="/recruiter" element={<Recruiter />} />
        <Route path="/Recruiterdashboard" element={<Recruiterdashboard />} />
      </Routes>
    </Router>
  );
}

export default App;