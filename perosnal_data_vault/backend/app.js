const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const dataRoutes = require('./routes/data');

mongoose.connect('mongodb://localhost:27017/personal-data-vault', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
