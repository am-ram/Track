const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/tracking-pixel', (req, res) => {
  // Log tracking information
  const logEntry = `${new Date().toISOString()} - Email opened by ${req.ip}\n`;
  fs.appendFile('tracking.log', logEntry, (err) => {
    if (err) throw err;
  });

  // Send a 1x1 transparent pixel
  res.setHeader('Content-Type', 'image/png');
  res.sendFile(path.join(__dirname, 'public', 'pixel.png'));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
