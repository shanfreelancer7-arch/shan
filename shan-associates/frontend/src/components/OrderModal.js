import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import api from '../api';

export default function OrderModal({ show, handleClose, product }) {
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('orders/', { product: product.id, quantity, address, phone });
      setSubmitted(true);
      setTimeout(() => { handleClose(); setSubmitted(false); setQuantity(1); setAddress(''); setPhone(''); }, 2000);
    } catch { setError('Order failed. Try again.'); }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton><Modal.Title>Order {product?.brand} {product?.name}</Modal.Title></Modal.Header>
      <Modal.Body>
        {submitted && <Alert variant="success">Order placed! We'll contact you.</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group><Form.Label>Quantity</Form.Label><Form.Control type="number" min="1" value={quantity} onChange={e=>setQuantity(e.target.value)} required /></Form.Group>
          <Form.Group><Form.Label>Delivery Address</Form.Label><Form.Control as="textarea" rows={2} value={address} onChange={e=>setAddress(e.target.value)} required /></Form.Group>
          <Form.Group><Form.Label>Phone Number</Form.Label><Form.Control type="tel" value={phone} onChange={e=>setPhone(e.target.value)} required /></Form.Group>
          <Button type="submit" variant="success" className="mt-2">Place Order</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}