import { Box, Container, Typography, Paper } from '@mui/material';

export default function DashboardPage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Current Balance</Typography>
          <Typography variant="h3">$0.00</Typography>
        </Paper>
      </Box>
    </Container>
  );
}
