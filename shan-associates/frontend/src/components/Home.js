import React, { useEffect, useRef } from 'react';
import { Container, Row, Col, Button, Card, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Home() {
  const fadeRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2 }
    );
    fadeRefs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const products = [
    { name: 'TMT Bars', desc: 'Fe-500 / Fe-550', brands: 'Kairali, Bharathy, Prince, Steelex' },
    { name: 'Cement', desc: 'OPC & PPC', brands: 'ACC, UltraTech, Chettinad, JSW, Dalmia' },
    { name: 'Pipes', desc: 'PVC / CPVC', brands: 'Demac, Apollo' },
    { name: 'Roofing Sheets', desc: 'Galvalume, Polycarbonate', brands: 'Jindal' },
    { name: 'Tile Adhesives', desc: 'Premium quality', brands: 'UltraTech' },
    { name: 'UPVC Gutters', desc: 'Rainwater management', brands: 'Aizer' },
  ];

  return (
    <>
      {/* Hero Carousel */}
      <Carousel fade interval={4000} controls indicators className="mb-5">
        <Carousel.Item style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1600')", backgroundSize: 'cover' }}>
          <Carousel.Caption>
            <h3>Premium Building Materials</h3>
            <p>Trusted by contractors & homeowners across Kerala</p>
            <Button as={Link} to="/products" variant="primary">Shop Now</Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600')", backgroundSize: 'cover' }}>
          <Carousel.Caption>
            <h3>Best Quality Cement & TMT</h3>
            <p>Top brands – ACC, UltraTech, JSW</p>
            <Button as={Link} to="/products" variant="primary">Explore</Button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <Container>
        {/* Product Categories */}
        <div className="text-center mb-5" ref={el => fadeRefs.current[0] = el} className="fade-up">
          <h2>Our Products</h2>
          <p className="lead">Wide range of construction essentials</p>
        </div>
        <Row>
          {products.map((item, idx) => (
            <Col md={4} key={item.name} className="mb-4" ref={el => fadeRefs.current[idx+1] = el} className="fade-up">
              <Card className="h-100 shadow-sm product-card">
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>{item.desc}</Card.Text>
                  <small className="text-muted">{item.brands}</small>
                </Card.Body>
                <Card.Footer className="bg-transparent border-0 text-center">
                  <Button as={Link} to="/products" variant="outline-primary" size="sm">View Products</Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Testimonials */}
        <div className="mt-5 pt-4 text-center" ref={el => fadeRefs.current[7] = el} className="fade-up">
          <h2>What Our Customers Say</h2>
          <Row className="justify-content-center mt-4">
            <Col md={4}>
              <Card className="border-0 shadow">
                <Card.Body><i className="fas fa-quote-left fa-2x text-primary mb-3"></i><p>Best quality TMT at competitive price. Timely delivery.</p><footer className="blockquote-footer">Ramesh, Contractor</footer></Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="border-0 shadow">
                <Card.Body><i className="fas fa-quote-left fa-2x text-primary mb-3"></i><p>Excellent customer support and genuine materials.</p><footer className="blockquote-footer">Suhara, Homeowner</footer></Card.Body>
              </Card>
            </Col>
          </Row>
        </div>

        {/* CTA Banner */}
        <div className="bg-primary text-white p-5 rounded-4 mt-5 text-center" ref={el => fadeRefs.current[8] = el} className="fade-up">
          <h3>Need a custom quote?</h3>
          <p>Contact us today for bulk orders and special pricing.</p>
          <Button as={Link} to="/contact" variant="light" size="lg">Get a Quote</Button>
        </div>
      </Container>
    </>
  );
}
