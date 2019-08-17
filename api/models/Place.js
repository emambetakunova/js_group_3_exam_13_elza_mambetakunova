const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
  title: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  image: {
    type: String,
    require: true
  },
  images: {
    type: Array
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reviews: {
    type: Array
  },
  overallRatings: {
    type: Number
  },
  qualityRating: [{userId: String, rating: Number}],
  serviceRating: [{userId: String, rating: Number}],
  interiorRating: [{userId: String, rating: Number}]
});

const Place = mongoose.model('Place', PlaceSchema);

module.exports = Place;