import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      if (isLogin) {
        await login(username, password);
        setSuccess('Login successful! Redirecting...');
        setTimeout(() => navigate('/products'), 1500);
      } else {
        await register(username, email, password);
        setSuccess('Registration successful! Logging you in...');
        await login(username, password);
        setTimeout(() => navigate('/products'), 1500);
      }
    } catch (err) {
      setError(isLogin ? 'Invalid username or password' : 'Registration failed. Username may already exist.');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
      <Card className="mx-auto" style={{ maxWidth: '450px', width: '100%' }}>
        <Card.Body>
          <h2 className="text-center mb-4">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="text-center text-muted mb-4">
            {isLogin ? 'Login to place orders or request quotes' : 'Sign up to start ordering'}
          </p>
          
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter username" 
                value={username} 
                onChange={e => setUsername(e.target.value)} 
                required 
              />
            </Form.Group>
            
            {!isLogin && (
              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control 
                  type="email" 
                  placeholder="Enter email" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  required 
                />
              </Form.Group>
            )}
            
            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Enter password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required 
              />
            </Form.Group>
            
            <Button variant="primary" type="submit" className="w-100 mb-3">
              {isLogin ? 'Login' : 'Register'}
            </Button>
          </Form>
          
          <div className="text-center">
            <Button variant="link" onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setSuccess('');
            }}>
              {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}