const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config');

const users = require('./app/users');
const places = require('./app/places');
const reviews = require('./app/reviews');
const photo = require('./app/photos');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const port = 8000;

mongoose.connect(config.dbUrl, config.mongoOptions).then(() => {
  app.use('/users', users);
  app.use('/places', places);
  app.use('/review', reviews);
  app.use('/photo', photo);

  app.listen(port, () => {
    console.log(`Server started on ${port} port`);
  });
});