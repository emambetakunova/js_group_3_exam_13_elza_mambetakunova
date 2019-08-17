const express = require('express');
const router = express.Router();

const auth = require('../middleWare/auth');
const Photo = require('../models/Photo');

router.get('/:id', async (req, res) => {
  try {
    const review = await Photo.find({place: req.params.id}).populate('user');
    return res.send(review)
  } catch (error) {
    return res.status(400).send(error)
  }
});


router.post('/:id', [auth], async (req, res) => {
  try {
    const photo = new Photo({
      user: req.user._id,
      place: req.body.place,
      images: req.body.images
    });
    photo.save();
    return res.send(photo);
  } catch (error) {
    return res.status(400).send(error)
  }
});

module.exports = router;