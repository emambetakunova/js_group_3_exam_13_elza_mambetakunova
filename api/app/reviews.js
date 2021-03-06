const express = require('express');
const router = express.Router();

const auth = require('../middleWare/auth');
const permit = require('../middleWare/permit');
const Review = require('../models/Review');

router.get('/', async (req, res) => {
  Review.find().populate('user')
    .then(result => {
      if (result) return res.send(result);
      res.sendStatus(404)
    })
    .catch(error => res.status(500).send(error));

});

router.post('/:id', auth, async (req, res) => {
  try {
    const message = new Review({
      data: new Date().toLocaleString("ru-RU"),
      user: req.user._id,
      message: req.body.message,
      qualityRating: req.body.qualityRating,
      serviceRating: req.body.serviceRating,
      interiorRating: req.body.interiorRating,
      place: req.body.place
    });
    message.save();
    return res.send(message);
  } catch (error) {
    return res.status(400).send(error)
  }
});

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
  await Review.findByIdAndDelete(req.params.id);

  res.send('success');
});

module.exports = router;