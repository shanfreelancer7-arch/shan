import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import api from '../api';

export default function QuoteModal({ show, handleClose, product }) {
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [quoteId, setQuoteId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('quotes/', {
        product: product.id,
        quantity,
        message
      });
      setQuoteId(res.data.id);
      setSubmitted(true);
    } catch (err) {
      setError('Failed to submit quote request. Please try again.');
    }
  };

  const sendWhatsAppConfirmation = () => {
    // Replace with your actual business WhatsApp number (country code + number, no plus)
    const phoneNumber = "919876543210";
    const text = `Hi Shan Associates, I have requested a quote for ${product?.brand || ''} ${product?.name} (Qty: ${quantity}). Quote ID: ${quoteId}. Please contact me.`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    handleClose();
    setSubmitted(false);
    setQuantity(1);
    setMessage('');
  };

  const handleDone = () => {
    handleClose();
    setSubmitted(false);
    setQuantity(1);
    setMessage('');
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Request Quote for {product?.brand || ''} {product?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {submitted ? (
          <>
            <Alert variant="success">
              Quote request submitted successfully! <br />
              <strong>Quote ID: {quoteId}</strong>
            </Alert>
            <p className="mt-3">Would you like to send a confirmation via WhatsApp to speed up the process?</p>
            <div className="d-flex justify-content-between">
              <Button variant="success" onClick={sendWhatsAppConfirmation}>
                <i className="fab fa-whatsapp"></i> Send WhatsApp Confirmation
              </Button>
              <Button variant="secondary" onClick={handleDone}>
                Close
              </Button>
            </div>
          </>
        ) : (
          <>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Quantity (units)</Form.Label>
                <Form.Control 
                  type="number" 
                  min="1" 
                  value={quantity} 
                  onChange={e => setQuantity(e.target.value)} 
                  required 
                />
                <Form.Text className="text-muted">
                  Minimum order quantity may apply.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Additional Message (optional)</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={3} 
                  value={message} 
                  onChange={e => setMessage(e.target.value)} 
                  placeholder="e.g., Delivery address, timeline, special requirements..."
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Submit Quote Request
              </Button>
            </Form>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}