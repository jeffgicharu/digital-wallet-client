'use client';

import { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Link, Alert } from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';
import { LoginDocument } from '@/graphql/generated/graphql';
import { useAuth } from '@/hooks/useAuth'; // Import the useAuth hook
import PhoneNumberInput from '@/components/PhoneNumberInput';

export default function LoginPage() {
  const router = useRouter();
  const { setToken } = useAuth(); // Get the setToken function from our context
  const [formData, setFormData] = useState({
    phoneNumber: '',
    pin: '',
  });
  const [formError, setFormError] = useState('');

  const [loginUser, { loading, client }] = useMutation(LoginDocument, {
    onCompleted: async (data) => {
      setToken(data.login.token);
      await client.resetStore(); // Reset cache to refetch queries with new token
      router.push('/dashboard');
    },
    onError: (error) => {
      // Log the error to the console for debugging
      console.error("Login failed:", error);

      // Optionally, you can set a more specific error message based on the error type
      if (error.graphQLErrors.length > 0) {
        setFormError(error.graphQLErrors[0].message);
      } else if (error.networkError) {
        setFormError('Network error: Please check your connection.');
      } else {
        setFormError('An unexpected error occurred.');
      }
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
    // Remove hyphens from phone number before sending to the backend
    const cleanedPhoneNumber = formData.phoneNumber.replace(/-/g, '');
    await loginUser({ variables: { ...formData, phoneNumber: cleanedPhoneNumber } });
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <PhoneNumberInput
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Phone Number (e.g., 254-7XX-XXX-XXX)"
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