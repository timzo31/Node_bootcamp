const express = require('express');
const fs = require('fs');
const port = 3000;
const tours = require('./dev-data/data/tours-simple.json');

const toursSimple = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const app = express();

app.use(express());

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Here are your data',
    status: 'success',
  });
});

app.get('/api/v1/tours', (req, res) => {});

app.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params);

  res.status(200).json({
    status: 'success',
  });
});

app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
});

app.delete('/api/v1/tours/:id', (req, res) => {});

app.update('/api/v1/tours', (req, res) => {});

app.update('/api/v1/tours/:id', (req, res) => {});

app.listen(process.env.PORT || port);
