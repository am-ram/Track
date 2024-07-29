const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for tracking pixel
app.get('/tracking-pixel', async (req, res) => {
  try {
    // Log tracking information
    const logEntry = `${new Date().toISOString()} - Email opened by ${req.ip}\n`;
    await fs.appendFile('tracking.log', logEntry);

    // Send a 1x1 transparent pixel
    res.setHeader('Content-Type', 'image/png');
    res.sendFile(path.join(__dirname, 'public', 'pixel.png'));
  } catch (error) {
    console.error('Error handling tracking request:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Default route for root URL
app.get('/', (req, res) => {
  res.send('Server!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
