// ✅ Seed Data

const mongoose = require('mongoose');

const Campground = require('./models/campground');
const user = require('./models/user');

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
    title: '포천 울미숲 럭셔리 캠핑장',
    price: 40000, 
    description: '포천 럭셔리 캠핑장',
    host: '62af361239be9b16ffec3c33',
    image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    location: '경기도 포천시 군내면 꽃배산2길 105',
  });
  
  const camp2 = new Campground({ 
    title: '해여림빌리지',
    price: 15000, 
    description: '서울 근교 프라이빗한 산속 캠핑장과 독채펜션 차박이 가능한 사이트들과 프라이빗 사이트',
    host: '62af361239be9b16ffec3c33',
    image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    location: '경기도 여주시 산북면 해여림로 78',
  });

  await camp1.save();
  await camp2.save();
}

seedDB().then(() => mongoose.connection.close());