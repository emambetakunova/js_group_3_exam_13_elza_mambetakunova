const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  review: {
    type: String,
    require: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  place: {
    type: Schema.Types.ObjectId,
    ref: 'Place',
    required: true
  },
  overallRatings: {
    type: Number
  },
  qualityRating: [{userId: String, rating: Number}],
  serviceRating: [{userId: String, rating: Number}],
  interiorRating: [{userId: String, rating: Number}]
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;