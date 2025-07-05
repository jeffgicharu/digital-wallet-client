'use client';

import { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Link, Alert } from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';
import { LoginDocument } from '@/graphql/generated/graphql';
import { useAuth } from '@/hooks/useAuth'; // Import the useAuth hook

export default function LoginPage() {
  const router = useRouter();
  const { setToken } = useAuth(); // Get the setToken function from our context
  const [formData, setFormData] = useState({
    phoneNumber: '',
    pin: '',
  });
  const [formError, setFormError] = useState('');

  const [loginUser, { loading, error, client }] = useMutation(LoginDocument, {
    onCompleted: async (data) => {
      setToken(data.login.token);
      await client.resetStore(); // Reset cache to refetch queries with new token
      router.push('/dashboard');
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError('');
    if (!formData.phoneNumber || !formData.pin) {
      setFormError('All fields are required.');
      return;
    }
    await loginUser({ variables: { ...formData } });
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="pin"
            label="PIN"
            type="password"
            id="pin"
            value={formData.pin}
            onChange={handleChange}
          />
          {formError && <Alert severity="error" sx={{ mt: 2 }}>{formError}</Alert>}
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error.message}</Alert>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
          <Link component={NextLink} href="/register" variant="body2" sx={{ textAlign: 'center', display: 'block' }}>
            {"Don't have an account? Register"}
          </Link>
        </Box>
      </Box>
    </Container>
  );
}