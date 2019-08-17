const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
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
  images: {
    type: Array
  },

});

const Photo = mongoose.model('Photo', PhotoSchema);

module.exports = Photo;