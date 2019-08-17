const express = require('express');
const router = express.Router();

const auth = require('../middleWare/auth');
const Review = require('../models/Review');


router.post('/review/:id', [auth], async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate('user');
    const message = {
      data: new Date().toLocaleString("ru-RU"),
      user: req.user.username,
      message: req.body.message,
      qualityRating: req.body.qualityRating,
      serviceRating: req.body.serviceRating,
      tasteRatings: req.body.interiorRating
    };
    review.reviews.push(message);

    review.save();
    console.log(review);
    return res.send(review);
  } catch (error) {
    return res.status(400).send(error)
  }
});



module.exports = router;