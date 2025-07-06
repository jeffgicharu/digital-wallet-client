'use client';

import { Box, Container, Typography, Paper, CircularProgress, Alert, List, ListItem, ListItemText, Divider } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GetMyProfileDocument } from '@/graphql/generated/graphql';

export default function DashboardPage() {
  const { data, loading, error } = useQuery(GetMyProfileDocument);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{`Error loading profile: ${error.message}`}</Alert>;

  const { me } = data!;

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome, {me.username}!
        </Typography>
        <Paper sx={{ p: 2, mb: 4 }}>
          <Typography variant="h6">Account Summary</Typography>
          <Typography>Phone Number: {me.phoneNumber}</Typography>
          <Typography>Balance: ${me.account.balance.toFixed(2)}</Typography>
        </Paper>

        <Typography variant="h5" component="h2" gutterBottom>
          Recent Transactions
        </Typography>
        <Paper sx={{ p: 2 }}>
          {me.account.transactions.length > 0 ? (
            <List>
              {me.account.transactions.map((tx, index) => (
                <div key={tx.id}>
                  <ListItem>
                    <ListItemText
                      primary={`${tx.description}`}
                      secondary={`Type: ${tx.type} - ${new Date(tx.timestamp).toLocaleString()}`}
                    />
                    <Typography color={tx.type === 'DEBIT' ? 'error' : 'success.main'}>
                      {tx.type === 'DEBIT' ? '-' : '+'}${tx.amount.toFixed(2)}
                    </Typography>
                  </ListItem>
                  {index < me.account.transactions.length - 1 && <Divider />}
                </div>
              ))}
            </List>
          ) : (
            <Typography>No recent transactions.</Typography>
          )}
        </Paper>
      </Box>
    </Container>
  );
}
