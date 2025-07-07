'use client';

import { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Link, Alert } from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';
import { RegisterUserDocument } from '@/graphql/generated/graphql';
import { useAuth } from '@/hooks/useAuth';
import PhoneNumberInput from '@/components/PhoneNumberInput';
import * as Yup from 'yup';
import 'yup-phone-lite';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  phoneNumber: Yup.string()
    .phone('KE', 'Invalid Kenyan phone number')
    .required('Phone number is required'),
  pin: Yup.string()
    .required('PIN is required')
    .matches(/^[0-9]{4}$/, 'PIN must be a 4-digit number'),
});

export default function RegisterPage() {
  const router = useRouter();
  const { setToken } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    phoneNumber: '',
    pin: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formError, setFormError] = useState('');

  const [registerUser, { loading, client }] = useMutation(RegisterUserDocument, {
    onCompleted: async (data) => {
      setToken(data.registerUser.token);
      await client.resetStore();
      router.push('/dashboard');
    },
    onError: (error) => {
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
    setErrors({});

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      const cleanedPhoneNumber = formData.phoneNumber.replace(/-/g, '');
      await registerUser({ variables: { ...formData, phoneNumber: cleanedPhoneNumber } });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const newErrors: { [key: string]: string } = {};
        err.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path] = error.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Create Account
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
            autoFocus
          />
          <PhoneNumberInput
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Phone Number (e.g., 254-7XX-XXX-XXX)"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber}
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
            error={!!errors.pin}
            helperText={errors.pin}
          />
          {formError && <Alert severity="error" sx={{ mt: 2 }}>{formError}</Alert>}
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
            {'Already have an account? Sign In'}
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
