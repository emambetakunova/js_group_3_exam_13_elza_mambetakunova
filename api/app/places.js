const express = require('express');
const config = require('../config');
const multer = require('multer');
const path = require('path');
const nanoid = require('nanoid');

const auth = require('../middleWare/auth');
const permit = require('../middleWare/permit');
const Place = require('../models/Place');
const Photo = require('../models/Photo');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  }
});

const upload = multer({storage});

const router = express.Router();

router.post('/', [auth, upload.single('image')], async (req, res) => {
  try {
    const placeData = req.body;
    placeData.user = req.user._id;
    if (req.file) {
      placeData.image = req.file.filename;
    }

    const place = await new Place(placeData);
    place.save();
    return res.send({'message': 'ok'})
  } catch (error) {
    return res.status(400).send(error)
  }
});

router.post('/:id/addPhoto', [auth, upload.array('images', 10)], async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    const photos = [];
    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i].filename;
      const photo = new Photo({
            user: req.user._id,
            place: place,
            image: file
          });
      await photo.save();
      photos.push(photo);
    }
    return res.send(photos)
  } catch (error) {
    return res.status(400).send(error)
  }
});

router.get('/', async (req, res) => {
  try {
    const place = await Place.find().populate('user');
    return res.send(place)
  } catch (error) {
    return res.status(400).send(error)
  }
});

router.get('/:id', async (req, res) => {
  try {
    const place = await Place.findById(req.params.id).populate('user');
    return res.send(place)
  } catch (error) {
    return res.status(400).send(error)
  }
});

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
  await Place.findByIdAndDelete(req.params.id);

  res.send('success');
});


module.exports = router;