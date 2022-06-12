const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const Campground = require('./models/campground');

// MongoDB app Connect 
mongoose.connect('mongodb://localhost:27017/camping_proj');
const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => console.log("✅ MongoDB Connected"));

const app = express();

// View Setting
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('home');
})

// All Campgrounds
app.get('/campgrounds', async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render('campgrounds/index', { campgrounds });
})

// Create Campground
app.get('/campgrounds/new', (req, res) => {
  res.render('campgrounds/new');
})

app.post('/campgrounds', async (req, res) => {
  const campground = new Campground(req.body.campground);
  await campground.save();
  res.redirect(`/campgrounds/${campground._id}`);
})

// Show Campground
app.get('/campgrounds/:id', async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  res.render('campgrounds/show', { campground });
})

app.listen(3000, () => {
  console.log('✅ Serving on port 3000')
})