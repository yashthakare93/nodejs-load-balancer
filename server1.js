const express = require('express');
const app = express();
const port = 3001;

// Root endpoint
app.get('/', (req, res) => {
  res.send('Hello from Server 1');
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('Healthy');
});

// Start the server
app.listen(port, () => {
  console.log(`Server 1 is running on port ${port}`);
});
