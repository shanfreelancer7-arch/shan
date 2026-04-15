import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <div className="bg-primary text-white text-center p-5 rounded">
        <h1>Shan Associates</h1>
        <p>Your Trusted Partner for Quality Building Materials</p>
        <Button as={Link} to="/products" variant="light" className="me-2">View Products</Button>
        <Button as={Link} to="/contact" variant="outline-light">Get Quote</Button>
      </div>
      <Container className="mt-5">
        <h2>Our Products</h2>
        <Row>
          {['TMT Bars', 'Cement', 'Pipes', 'Roofing Sheets', 'Tile Adhesives', 'Gutters'].map((item) => (
            <Col md={4} key={item} className="mb-3">
              <Card>
                <Card.Body><Card.Title>{item}</Card.Title><Card.Text>Premium quality materials</Card.Text></Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}