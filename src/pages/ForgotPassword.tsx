import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PageContainer } from '../components/Layout/PageContainer';
import { Card } from '../components/UI/Card';
import { Input } from '../components/UI/Input';
import { Button } from '../components/UI/Button';

export const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setIsLoading(true);
    try {
      const success = await resetPassword(email);
      if (success) {
        setMessage('Reset link sent! Check your email for instructions.');
        setError('');
      } else {
        setError('No account found with this email address');
        setMessage('');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      setMessage('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <Card 
        title="Verify Your Email" 
        showCloseButton 
        onClose={() => navigate('/sawa')}
      >
        <p className="text-sm text-gray-600 text-center mb-6">
          Please enter your email address to receive a password reset link.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {message && (
            <p className="text-sm text-green-600 text-center">{message}</p>
          )}

          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}

          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </Button>

          <button
            type="button"
            onClick={() => navigate('/login')}
            className="w-full text-sawa-orange hover:underline text-sm"
          >
            Back to Login
          </button>
        </form>
      </Card>
    </PageContainer>
  );
};