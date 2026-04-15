import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In real app, send to backend email API
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setName(''); setEmail(''); setMessage('');
  };

  return (
    <Container>
      <h1>Contact Us</h1>
      <Row>
        <Col md={6}>
          <p><strong>Email:</strong> shanassociates2020@gmail.com</p>
          <p><strong>Working Hours:</strong><br/>Mon–Sat: 7:00 AM – 6:00 PM<br/>Sunday: 7:00 AM – 12:00 PM</p>
          <p><strong>WhatsApp:</strong> Click the green button on bottom right.</p>
          <div className="mt-4">
            <iframe
              title="Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.5!2d75.9!3d10.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7b2f0f0f0f0f%3A0x0!2zMTDCsDU0JzEyLjAiTiA3NcKwNTQnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%" height="250" style={{border:0}} allowFullScreen=""
            ></iframe>
          </div>
        </Col>
        <Col md={6}>
          <h5>Send us a message</h5>
          {sent && <Alert variant="success">Message sent! We'll reply soon.</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group><Form.Label>Name</Form.Label><Form.Control value={name} onChange={e=>setName(e.target.value)} required /></Form.Group>
            <Form.Group><Form.Label>Email</Form.Label><Form.Control type="email" value={email} onChange={e=>setEmail(e.target.value)} required /></Form.Group>
            <Form.Group><Form.Label>Message</Form.Label><Form.Control as="textarea" rows={3} value={message} onChange={e=>setMessage(e.target.value)} required /></Form.Group>
            <Button type="submit" variant="primary" className="mt-2">Send</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}