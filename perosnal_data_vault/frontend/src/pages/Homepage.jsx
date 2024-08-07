import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ marginTop: 8 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to Your Personal Data Vault, {user ? user.firstName : 'User'}!
        </Typography>
        <Typography variant="h6" paragraph>
          Here you can securely manage and view your personal data.
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Button variant="contained" color="primary" fullWidth onClick={() => navigate('/add-data')}>
              Add New Data
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button variant="contained" color="secondary" fullWidth onClick={() => navigate('/view-data')}>
              View Data
            </Button>
          </Grid>
        </Grid>
        <Box mt={4}>
          <Button variant="outlined" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Homepage;
