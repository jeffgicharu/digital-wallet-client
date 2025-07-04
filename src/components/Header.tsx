'use client';

import { AppBar, Toolbar, Typography, Button, Box, CircularProgress } from '@mui/material';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { GetUserDocument } from '@/graphql/generated/graphql';

export default function Header() {
  const router = useRouter();
  const { data, loading, error } = useQuery(GetUserDocument);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    // We use router.replace to prevent the user from going "back" to a protected route
    router.replace('/login');
    // A full page reload can also help ensure all cached data is cleared
    window.location.reload();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Digital Wallet
        </Typography>
        
        {/* Handle Loading State */}
        {loading && <CircularProgress color="inherit" size={24} />}
        
        {/* Handle Error State */}
        {error && <Typography color="error" variant="body2">Couldn't load data</Typography>}
        
        {/* Handle Success State */}
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