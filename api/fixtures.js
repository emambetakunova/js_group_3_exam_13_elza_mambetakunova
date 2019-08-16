const mongoose = require('mongoose');
const config = require('./config');

const User = require('./models/User');

const run = async () => {
  await mongoose.connect(config.dbUrl, config.mongoOptions);

  const connection = mongoose.connection;

  const collections = await connection.db.collections();

  for (let collection of collections) {
    await collection.drop();
  }

  const users = await User.create(
    {
      username: 'User',
      password: '123',
      token: 'token',
      role: 'user'
    },
    {
      username: 'Admin',
      password: '123',
      token: 'token1',
      role: 'admin'
    }
  );

  return connection.close();
};


run().catch(error => {
  console.error('Something wrong happened...', error);
});