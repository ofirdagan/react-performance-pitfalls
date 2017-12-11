const express = require('express');
const giphy = require('quick-giphy');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../dist')));
app.use((request, response, next) => {
  console.log(`GOT URL - ${request.url}`);
  next();
});

app.listen(port);
console.log(`Server running on http://localhost:${port}`);