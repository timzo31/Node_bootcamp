const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res
    .status(200)
    .json({ message: 'Hello from the server side!', app: 'Natours' });
});

app.post('/tours', (req, res) => {
  res.json({ message: 'Here are the available tours' });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
