import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { addDataApi } from '../apis/Api';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
} from '@mui/material';

const AddData = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    address: '',
    phoneNumber: '',
    email: '',
    document: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      document: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    try {
      await addDataApi(data);
      toast.success('Data added successfully');
    } catch (error) {
      toast.error('Error adding data');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Add Data
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="fullName"
                required
                fullWidth
                label="Full Name"
                onChange={handleChange}
                value={formData.fullName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="dateOfBirth"
                required
                fullWidth
                type="date"
                onChange={handleChange}
                value={formData.dateOfBirth}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="address"
                required
                fullWidth
                label="Address"
                onChange={handleChange}
                value={formData.address}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="phoneNumber"
                required
                fullWidth
                label="Phone Number"
                onChange={handleChange}
                value={formData.phoneNumber}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                required
                fullWidth
                type="email"
                label="Email"
                onChange={handleChange}
                value={formData.email}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                component="label"
                fullWidth
              >
                Upload Document
                <input
                  type="file"
                  name="document"
                  hidden
                  onChange={handleFileChange}
                />
              </Button>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add Data
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddData;
