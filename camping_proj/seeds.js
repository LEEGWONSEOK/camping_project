// ✅ Seed Data

const mongoose = require('mongoose');

const Campground = require('./models/campground');

// MongoDB app Connect 
mongoose.connect('mongodb://localhost:27017/camping_proj');
const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => console.log("✅ MongoDB Connected"));

// Seed
const seedDB = async () => {
  await Campground.deleteMany({});  // Reset DB
  
  // Create Seed
  const camp1 = new Campground({ 
    title: 'First Camp',
    price: 10000, 
    description: 'First description',
    host: '62af361239be9b16ffec3c33',
    image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    location: '부산시 금정구 남산동',
  });
  const camp2 = new Campground({ 
    title: 'Second Camp',
    price: 15000, 
    description: 'Second description',
    host: '62af361239be9b16ffec3c33',
    image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    slocation: '부산시 해운대구 우1동',
  });
  await camp1.save();
  await camp2.save();
}

seedDB().then(() => mongoose.connection.close());