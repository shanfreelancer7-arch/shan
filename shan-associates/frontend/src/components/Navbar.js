import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { Navbar as BsNavbar, Nav, Container, Button } from 'react-bootstrap';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <BsNavbar expand="lg" className={scrolled ? 'navbar-scrolled' : ''} fixed="top">
      <Container>
        <BsNavbar.Brand as={Link} to="/" className="fw-bold text-white">
          SHAN ASSOCIATES
        </BsNavbar.Brand>
        <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BsNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="text-white">Home</Nav.Link>
            <Nav.Link as={Link} to="/about" className="text-white">About</Nav.Link>
            <Nav.Link as={Link} to="/products" className="text-white">Products</Nav.Link>
            <Nav.Link as={Link} to="/contact" className="text-white">Contact</Nav.Link>
            <Nav.Link as={Link} to="/track-orders" className="text-white">Track Orders</Nav.Link>
          </Nav>
          <Nav>
            {user ? (
              <Button variant="outline-light" onClick={handleLogout}>Logout ({user.username})</Button>
            ) : (
              <Nav.Link as={Link} to="/login" className="text-white">Login / Sign Up</Nav.Link>
            )}
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
}
