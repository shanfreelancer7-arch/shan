import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={4}>
            <h5>Shan Associates</h5>
            <p>Building materials supplier since 2010. Quality you can trust.</p>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/track-orders">Track Orders</Link></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contact</h5>
            <p>Email: shanassociates2020@gmail.com</p>
            <p>WhatsApp: +91 98765 43210</p>
            <p>Tirur, Kerala, India</p>
            <div>
              <a href="#" className="me-2"><i className="fab fa-facebook fa-lg"></i></a>
              <a href="#" className="me-2"><i className="fab fa-instagram fa-lg"></i></a>
              <a href="#"><i className="fab fa-whatsapp fa-lg"></i></a>
            </div>
          </Col>
        </Row>
        <hr className="bg-secondary" />
        <div className="text-center">
          <small>&copy; {new Date().getFullYear()} Shan Associates. All rights reserved.</small>
        </div>
      </Container>
    </footer>
  );
}
