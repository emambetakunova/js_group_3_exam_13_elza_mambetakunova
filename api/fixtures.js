const mongoose = require('mongoose');
const config = require('./config');

const User = require('./models/User');
const Place = require('./models/Place');
const Review = require('./models/Review');
const Photo = require('./models/Photo');

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
      avatar: 'place.jpeg'
    },
    {
      user: users[0],
      title: 'Tyubeteyka',
      description: 'Tyubeteyka” restaurant is the place of inexpensive and tasty dinner.',
      avatar: 'place.jpeg'
    },
    {
      user: users[0],
      title: 'IT Ibiza',
      description: 'IT Ibiza is not only a restaurant but our daily effort to celebrate beauty, taste and simplicity. ',
      avatar: 'place.jpeg'
    }
  );

  await Review.create(
    {
      user: users[0],
      place: place[0],
      message: 'So cool!',
      qualityRating: 2,
      serviceRating: 0,
      interiorRating: 3
    },
    {
      user: users[0],
      place: place[1],
      message: 'Lol!',
      qualityRating: 2,
      serviceRating: 0,
      interiorRating: 3
    },
    {
      user: users[0],
      place: place[1],
      message: 'So cool!',
      qualityRating: 2,
      serviceRating: 0,
      interiorRating: 3
    }
  );

  await Photo.create(
    {
      user: users[0],
      place: place[0],
      image: 'place.jpeg'
    },
    {
      user: users[0],
      place: place[1],
      image: 'place.jpeg'
    },
    {
      user: users[0],
      place: place[1],
      image: 'place.jpeg'
    }
  );

  return connection.close();
};


run().catch(error => {
  console.error('Something wrong happened...', error);
});