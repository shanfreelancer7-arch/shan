import React, { useState, useEffect } from 'react';
import api from '../api';
import { Card, Button, Row, Col, Container, Spinner, Alert } from 'react-bootstrap';
import { useAuth } from '../AuthContext';
import OrderModal from './OrderModal';
import QuoteModal from './QuoteModal';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    api.get('products/')
      .then(res => setProducts(res.data))
      .catch(err => setError('Failed to load products'))
      .finally(() => setLoading(false));
  }, []);

  const handleOrder = (product) => {
    if (!user) { alert('Please login to place an order'); return; }
    setSelectedProduct(product);
    setShowOrderModal(true);
  };
  const handleQuote = (product) => {
    if (!user) { alert('Please login to request a quote'); return; }
    setSelectedProduct(product);
    setShowQuoteModal(true);
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container>
      <h1>Our Products</h1>
      <Row>
        {products.map(p => (
          <Col md={4} key={p.id} className="mb-4">
            <Card>
              <Card.Img variant="top" src={p.image_url || 'https://via.placeholder.com/300'} />
              <Card.Body>
                <Card.Title>{p.brand} {p.name}</Card.Title>
                <Card.Text>{p.description || 'High quality material'}</Card.Text>
                <Card.Text><strong>₹{p.price}</strong> / unit</Card.Text>
                <div className="d-flex justify-content-between">
                  <Button variant="primary" onClick={() => handleOrder(p)}>Place Order</Button>
                  <Button variant="secondary" onClick={() => handleQuote(p)}>Request Quote</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <OrderModal show={showOrderModal} handleClose={() => setShowOrderModal(false)} product={selectedProduct} />
      <QuoteModal show={showQuoteModal} handleClose={() => setShowQuoteModal(false)} product={selectedProduct} />
    </Container>
  );
}