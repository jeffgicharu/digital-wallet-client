'use client';

import { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Alert, CircularProgress } from '@mui/material';
import { useMutation } from '@apollo/client';
import { TransferFundsDocument } from '@/graphql/generated/graphql';
import PhoneNumberInput from '@/components/PhoneNumberInput';

export default function TransferPage() {
  const [formData, setFormData] = useState({
    receiverPhoneNumber: '',
    amount: '',
  });
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const [transferFunds, { loading }] = useMutation(TransferFundsDocument, {
    optimisticResponse: (vars) => ({
      __typename: 'Mutation',
      transferFunds: {
        __typename: 'Transaction',
        id: `temp-${Date.now()}`, // A temporary, unique ID
        amount: parseFloat(vars.amount as string),
        type: 'DEBIT',
        description: `Transfer to ${vars.receiverPhoneNumber}`,
        timestamp: new Date().toISOString(),
      },
    }),
    onCompleted: () => {
      setStatusMessage({ type: 'success', message: 'Transfer successful!' });
      setFormData({ receiverPhoneNumber: '', amount: '' }); // Clear the form
    },
    onError: (error) => {
      if (error.graphQLErrors.length > 0) {
        setStatusMessage({ type: 'error', message: error.graphQLErrors[0].message });
      } else {
        setStatusMessage({ type: 'error', message: `Transfer failed: ${error.message}` });
      }
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatusMessage(null);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatusMessage(null);
    
    const amount = parseFloat(formData.amount);
    if (!formData.receiverPhoneNumber) {
      setStatusMessage({ type: 'error', message: 'Please enter a recipient phone number.' });
      return;
    }
    if (!amount || amount <= 0) {
      setStatusMessage({ type: 'error', message: 'Please enter a positive amount to transfer.' });
      return;
    }

    // Remove hyphens from phone number before sending to the backend
    const cleanedPhoneNumber = formData.receiverPhoneNumber.replace(/-/g, '');

    await transferFunds({
      variables: {
        receiverPhoneNumber: cleanedPhoneNumber,
        amount: amount,
      },
    });
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Send Money
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <PhoneNumberInput
            margin="normal"
            required
            fullWidth
            id="recipient"
            label="Recipient's Phone Number (e.g., 254-7XX-XXX-XXX)"
            name="receiverPhoneNumber"
            value={formData.receiverPhoneNumber}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="amount"
            label="Amount"
            type="number"
            id="amount"
            value={formData.amount}
            onChange={handleChange}
          />
          {statusMessage && (
            <Alert severity={statusMessage.type} sx={{ mt: 2 }}>
              {statusMessage.message}
            </Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Send'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}