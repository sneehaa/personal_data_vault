import React from 'react';
import { Container, Typography, Box, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

// Styled component for buttons
const CustomButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5),
  fontSize: '1rem',
  textTransform: 'none',
  borderRadius: '8px',
  boxShadow: theme.shadows[2],
}));

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleManageUsers = () => {
    navigate('/admin/manage-users');
  };

  const handleManageData = () => {
    navigate('/admin/manage-data');
  };

  const handleSettings = () => {
    navigate('/admin/settings');
  };

  return (
    <Container component="main" maxWidth="lg">
      <Box sx={{ marginTop: 8, textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom sx={{ color: '#333', fontWeight: 'bold' }}>
          Admin Dashboard
        </Typography>
        <Typography variant="h6" paragraph sx={{ color: '#666', mb: 4 }}>
          Manage users, data, and application settings from here.
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <CustomButton
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleManageUsers}
              sx={{ bgcolor: '#1976d2', '&:hover': { bgcolor: '#1565c0' }, mb: 2 }}
            >
              Manage Users
            </CustomButton>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomButton
              variant="contained"
              color="error"
              fullWidth
              onClick={handleManageData}
              sx={{ bgcolor: '#f44336', '&:hover': { bgcolor: '#c62828' }, mb: 2 }}
            >
              Manage Data
            </CustomButton>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomButton
              variant="contained"
              color="info"
              fullWidth
              onClick={handleSettings}
              sx={{ bgcolor: '#0288d1', '&:hover': { bgcolor: '#0277bd' }, mb: 2 }}
            >
              Settings
            </CustomButton>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AdminDashboard;
