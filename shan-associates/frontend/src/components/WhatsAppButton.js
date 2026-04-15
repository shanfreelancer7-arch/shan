import React from 'react';
import { Button } from 'react-bootstrap';

const WhatsAppButton = () => {
  // Replace with your actual business WhatsApp number (country code + number, no plus)
  const phoneNumber = "919876543210"; // Example: India +91 98765 43210
  const message = "Hello Shan Associates, I need assistance with building materials.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
      }}
    >
      <Button
        variant="success"
        style={{
          borderRadius: '50px',
          padding: '12px 20px',
          fontSize: '1.1rem',
          fontWeight: 'bold',
          boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <i className="fab fa-whatsapp" style={{ fontSize: '1.4rem' }}></i>
        Chat with us
      </Button>
    </a>
  );
};

export default WhatsAppButton;