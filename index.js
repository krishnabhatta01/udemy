const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send({ hi: 'Hello krishna!'});
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
