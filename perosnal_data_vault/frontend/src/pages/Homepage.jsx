import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Homepage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      setUser({ role: 'Guest User' }); // Set role to Guest User if no user data is found
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleAddData = () => {
    if (user && user.role !== 'Guest User') {
      navigate('/create_data');
    } else {
      toast.error("Login or Register Before Adding Data", {
        onClose: () => navigate('/login')
      });
    }
  };

  const handleViewData = () => {
    if (user && user.role !== 'Guest User') {
      navigate('/view-data');
    } else {
      toast.error("Login or Register Before Viewing Data", {
        onClose: () => navigate('/login')
      });
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ marginTop: 8 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to Your Personal Data Vault, {user ? user.firstName : 'Guest'}!
        </Typography>
        <Typography variant="h6" paragraph>
          Here you can securely manage and view your personal data.
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Button variant="contained" color="primary" fullWidth onClick={handleAddData}>
              Add New Data
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button variant="contained" color="secondary" fullWidth onClick={handleViewData}>
              View Data
            </Button>
          </Grid>
        </Grid>
        <Box mt={4}>
          {user ? (
            <Button variant="outlined" color="error" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button variant="outlined" color="primary" onClick={() => navigate('/login')}>
              Login
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Homepage;
