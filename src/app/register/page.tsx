'use client';

import { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Link, Alert } from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';
import { RegisterUserDocument } from '@/graphql/generated/graphql';
import { useAuth } from '@/hooks/useAuth'; // Import the useAuth hook

export default function RegisterPage() {
  const router = useRouter();
  const { setToken } = useAuth(); // Get the setToken function from our context
  const [formData, setFormData] = useState({
    username: '',
    phoneNumber: '',
    pin: '',
  });
  const [formError, setFormError] = useState('');

  const [registerUser, { loading, error, client }] = useMutation(RegisterUserDocument, {
    onCompleted: async (data) => {
      setToken(data.registerUser.token);
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
    if (!formData.username || !formData.phoneNumber || !formData.pin) {
      setFormError('All fields are required.');
      return;
    }
    await registerUser({ variables: { ...formData } });
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Create Account
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
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
            {loading ? 'Registering...' : 'Register'}
          </Button>
          <Link component={NextLink} href="/login" variant="body2" sx={{ textAlign: 'center', display: 'block' }}>
            {"Already have an account? Sign In"}
          </Link>
        </Box>
      </Box>
    </Container>
  );
}