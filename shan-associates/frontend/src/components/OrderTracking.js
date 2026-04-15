import React, { useState, useEffect } from 'react';
import api from '../api';
import { Table, Container, Spinner, Alert, Badge } from 'react-bootstrap';
import { useAuth } from '../AuthContext';

export default function OrderTracking() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      api.get('my-orders/')
        .then(res => setOrders(res.data))
        .catch(() => setOrders([]))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user]);

  if (!user) return <Alert variant="info">Please login to view your orders.</Alert>;
  if (loading) return <Spinner animation="border" />;

  return (
    <Container>
      <h2 className="my-4">My Orders</h2>
      {orders.length === 0 ? (
        <Alert variant="secondary">No orders placed yet.</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead><tr><th>Order ID</th><th>Product</th><th>Quantity</th><th>Total</th><th>Status</th><th>Date</th></tr></thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td><td>{order.product_name}</td><td>{order.quantity}</td><td>₹{order.quantity * order.product_price}</td>
                <td><Badge bg={order.status === 'Delivered' ? 'success' : 'warning'}>{order.status}</Badge></td>
                <td>{new Date(order.ordered_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
