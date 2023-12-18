// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

// Create event handler
app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  // Check if event type is comment created
  if (type === 'CommentCreated') {
    // Check if comment contains word 'orange'
    const status = data.content.includes('orange') ? 'rejected' : 'approved';

    // Emit comment moderated event
    await axios.post('http://localhost:4005/events', {
      type: 'CommentModerated',
      data: {
        id: data.id,
        content: data.content,
        status,
      },
    });
  }

  // Send response
  res.send({});
});

// Start server
app.listen(4003, () => {
  console.log('Listening on 4003');
});