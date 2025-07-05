'use client';

import { AppBar, Toolbar, Typography, Button, Box, CircularProgress } from '@mui/material';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { GetMyProfileDocument } from '@/graphql/generated/graphql';
import { useAuth } from '@/hooks/useAuth'; // Import the useAuth hook

export default function Header() {
  const router = useRouter();
  const { logout } = useAuth(); // Get the logout function from context
  const { data, loading, error } = useQuery(GetMyProfileDocument);

  const handleLogout = () => {
    logout(); // Use the context's logout function
    router.replace('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Digital Wallet
        </Typography>
        
        {loading && <CircularProgress color="inherit" size={24} />}
        
        {error && <Typography color="error" variant="body2">Couldn't load data</Typography>}
        
        {data?.me && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Typography>
              Balance: <strong>${data.me.account.balance.toFixed(2)}</strong>
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
