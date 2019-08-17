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
  overallRatings: {
    type: Number
  },
  qualityRating:  Number,
  serviceRating: Number,
  interiorRating: Number
});

const Place = mongoose.model('Place', PlaceSchema);

module.exports = Place;