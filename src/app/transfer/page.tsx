'use client';

import { Box, Container, Typography, TextField, Button } from '@mui/material';
import withAuth from '@/components/withAuth'; // Import our HOC

function TransferPage() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Send Money
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="recipient"
            label="Recipient's Phone Number"
            name="recipient"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="amount"
            label="Amount"
            type="number"
            id="amount"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Send
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

// Wrap the component with the HOC before exporting
export default withAuth(TransferPage);