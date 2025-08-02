import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; // <-- Import the new Header component
import LandingPage from './pages/LandingPage';
import DoctorProfilePage from './pages/DoctorProfilePage';
import AppointmentForm from './components/AppointmentForm';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header /> {/* <-- Use the Header component here */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/doctor/:id" element={<DoctorProfilePage />} />
          <Route path="/book/:id" element={<AppointmentForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;