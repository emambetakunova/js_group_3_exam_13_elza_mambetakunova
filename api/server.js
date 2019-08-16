const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config');

const users = require('./app/users');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const port = process.env.NODE_ENV === 'test' ? 8010 : 8000;

mongoose.connect(config.dbUrl, config.mongoOptions).then(() => {
  app.use('/users', users);

  app.listen(port, () => {
    console.log(`Server started on ${port} port`);
  });
});