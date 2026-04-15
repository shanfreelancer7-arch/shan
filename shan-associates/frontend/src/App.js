import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider, useAuth } from './AuthContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Products from './components/Products';
import Contact from './components/Contact';
import Login from './components/Login';
import OrderTracking from './components/OrderTracking';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/products" element={<Products />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/track-orders" element={<PrivateRoute><OrderTracking /></PrivateRoute>} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <div style={{ marginTop: '76px' }}> {/* offset for fixed navbar */}
          <AppRoutes />
        </div>
        <Footer />
        <WhatsAppButton />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
