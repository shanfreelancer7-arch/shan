import React, { useState, useEffect } from 'react';
import api from '../api';
import { Card, Button, Row, Col, Container, Spinner, Alert, Badge } from 'react-bootstrap';
import { useAuth } from '../AuthContext';
import OrderModal from './OrderModal';
import QuoteModal from './QuoteModal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      .catch(() => setError('Failed to load products'))
      .finally(() => setLoading(false));
  }, []);

  const handleOrder = (product) => {
    if (!user) { toast.warn('Please login to place an order'); return; }
    setSelectedProduct(product);
    setShowOrderModal(true);
  };
  const handleQuote = (product) => {
    if (!user) { toast.warn('Please login to request a quote'); return; }
    setSelectedProduct(product);
    setShowQuoteModal(true);
  };

  if (loading) {
    return (
      <Container className="mt-5">
        <Row>
          {[1,2,3].map(i => <Col md={4} key={i}><Card className="mb-4"><Card.Body><Spinner animation="border" /></Card.Body></Card></Col>)}
        </Row>
      </Container>
    );
  }

  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container>
      <h1 className="my-4">Our Products</h1>
      <Row>
        {products.map(p => (
          <Col md={4} key={p.id} className="mb-4">
            <Card className="h-100 product-card">
              <Card.Img variant="top" src={p.image_url || 'https://via.placeholder.com/300x200?text=Product'} className="product-img" />
              <Card.Body>
                <Card.Title>{p.brand} {p.name}</Card.Title>
                <Card.Text>{p.description || 'Premium construction material'}</Card.Text>
                <h5>₹{p.price} <small className="text-muted">/ unit</small></h5>
                {p.stock < 10 && <Badge bg="warning" text="dark">Low Stock</Badge>}
              </Card.Body>
              <Card.Footer className="bg-transparent d-flex justify-content-between">
                <Button variant="primary" onClick={() => handleOrder(p)}>Order</Button>
                <Button variant="secondary" onClick={() => handleQuote(p)}>Quote</Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
      <OrderModal show={showOrderModal} handleClose={() => setShowOrderModal(false)} product={selectedProduct} />
      <QuoteModal show={showQuoteModal} handleClose={() => setShowQuoteModal(false)} product={selectedProduct} />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </Container>
  );
}
