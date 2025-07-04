import { Box, Container, Typography, Paper } from '@mui/material';

export default function DashboardPage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Paper sx={{ p: 2 }}>
          <Typography>Welcome to your wallet dashboard.</Typography>
          <Typography>Recent transactions will appear here.</Typography>
        </Paper>
      </Box>
    </Container>
  );
}
