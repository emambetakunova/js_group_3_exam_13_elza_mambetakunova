const mongoose = require('mongoose');
const config = require('./config');

const User = require('./models/User');
const Place = require('./models/Place');
const Review = require('./models/Review');

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

  const place = await Place.create(
    {
      user: users[0],
      title: 'Bellagio',
      description: 'Redefining the concept of buffet dining with impressive live-action cooking stations and an impeccable selection of cuisines unmatched in Las Vegas.',
      image: 'place.jpeg'
    },
    {
      user: users[0],
      title: 'Tyubeteyka',
      description: 'Tyubeteyka” restaurant is the place of inexpensive and tasty dinner.',
      image: 'place.jpeg'
    },
    {
      user: users[0],
      title: 'IT Ibiza',
      description: 'IT Ibiza is not only a restaurant but our daily effort to celebrate beauty, taste and simplicity. ',
      image: 'place.jpeg'
    }
  );

  await Review.create(
    {
      user: users[0],
      place: place[0],
      review: 'So cool!'
    },
    {
      user: users[0],
      place: place[1],
      review: 'Lol!'
    },
    {
      user: users[0],
      place: place[1],
      review: 'So cool!'
    }
  );

  return connection.close();
};


run().catch(error => {
  console.error('Something wrong happened...', error);
});