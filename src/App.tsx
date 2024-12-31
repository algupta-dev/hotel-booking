import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import ManageBookings from './Pages/ManageBookings';
import Navbar from './Components/NavBar';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bookings" element={<ManageBookings />} />
      </Routes>
    </Router>
  );
};

export default App;
