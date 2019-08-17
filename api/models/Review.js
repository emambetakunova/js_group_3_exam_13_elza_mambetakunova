const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  message: {
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
  qualityRating: Number,
  serviceRating: Number,
  interiorRating: Number
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;