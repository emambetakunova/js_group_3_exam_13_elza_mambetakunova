const express = require('express');
const router = express.Router();

const auth = require('../middleWare/auth');
const permit = require('../middleWare/permit');
const Photo = require('../models/Photo');

router.get('/', async (req, res) => {
  Photo.find()
    .then(result => {
      if (result) return res.send(result);
      res.sendStatus(404)
    })
    .catch(error => res.status(500).send(error));

});

router.get('/:id', async (req, res) => {
  try {
    const review = await Photo.find({place: req.params.id}).populate('user');
    return res.send(review)
  } catch (error) {
    return res.status(400).send(error)
  }
});

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
  await Photo.findByIdAndDelete(req.params.id);

  res.send('success');
});


module.exports = router;