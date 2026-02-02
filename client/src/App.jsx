import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { VibeProvider } from './context/VibeContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';

import Login from './components/auth/Login';
import AdminDashboard from './pages/AdminDashboard';
import Resources from './pages/Resources';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <HelmetProvider>
      <VibeProvider>
        <Router>
          <div className="bg-dark min-h-screen text-white font-body selection:bg-primary selection:text-black">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>
        </Router>
      </VibeProvider>
    </HelmetProvider>
  );
}

export default App;
