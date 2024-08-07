const express = require('express');
const app = express();

// Enable CORS
app.use(cors());

// Add a route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to my server!');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});