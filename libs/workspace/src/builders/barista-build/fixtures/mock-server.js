const express = require('express');
const server = express();

const port = process.env.PORT || 4000;

server.get('*', (req, res) => {
  res.send('<html></html');
});

server.listen(port, () => {
  console.log(`Node Express server listening on http://localhost:${port}`);
});
