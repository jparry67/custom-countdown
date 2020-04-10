const { v4: uuidv4 } = require('uuid');
const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/countdown', {
  useNewUrlParser: true
});

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

// Create a scheme for items in the museum: a title and a path to an image.
const countdownSchema = new mongoose.Schema({
  title: String,
  time: Number,
  path: String,
  verticalAlign: String,
  horizontalAlign: String,
  color: String,
  size: Number,
});

// Create a model for items in the museum.
const Countdown = mongoose.model('Countdown', countdownSchema);

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

// Create a new item in the museum: takes a title and a path to an image.
app.post('/api/countdowns', async (req, res) => {
  const countdown = new Countdown({
    id: uuidv4(),
    title: req.body.title,
    time: req.body.time,
    path: req.body.path,
    verticalAlign: req.body.verticalAlign,
    horizontalAlign: req.body.horizontalAlign,
    color: req.body.color,
    size: req.body.size,
  });
  try {
    await countdown.save();
    res.send(countdown);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.get("/api/countdowns/:id", async (req, res) => {
  try {
    let countdown = await Countdown.findOne({
      _id: req.params.id
    });
    res.send(countdown);
  } catch(error) {
    res.sendStatus(500);
  }
});

app.get('/api/countdowns', async (req, res) => {
  try {
    let countdowns = await Countdown.find();
    res.send(countdowns);
  } catch(error) {
    res.sendStatus(500);
  }
});

app.listen(3001, () => console.log('Server listening on port 3001!'));
