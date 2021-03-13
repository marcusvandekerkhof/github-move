const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 400; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()*20)+10;
        const camp = new Campground({
            author: '60476c5ad230b5112e3e2026',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'GroepsNatuurkampeerterrein Swartduin ligt op Terschelling. Op de kaart is ons middelste Waddeneiland maar een smalle streep land tussen Noordzee en Waddenzee, maar wat een rijkdom aan natuur! Het dorp West-Terschelling ligt op loopafstand.',
            price,
            geometry: {
              type: "Point",
              coordinates: [
                  cities[random1000].longitude,
                  cities[random1000].latitude,
              ]
          },
            images: 
            [
                {
                  url: 'https://res.cloudinary.com/dggum10sh/image/upload/v1615468983/Yelpcamp/dtd6vwb3vliklpykx54m.jpg',
                  filename: 'Yelpcamp/dtd6vwb3vliklpykx54m'
                },
                {
                  url: 'https://res.cloudinary.com/dggum10sh/image/upload/v1615468983/Yelpcamp/ycf8jlfg88npt8co0uhh.jpg',
                  filename: 'Yelpcamp/ycf8jlfg88npt8co0uhh'
                },
                {
                  url: 'https://res.cloudinary.com/dggum10sh/image/upload/v1615468983/Yelpcamp/oqlvttsoowjqnjbbp8f2.jpg',
                  filename: 'Yelpcamp/oqlvttsoowjqnjbbp8f2'
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})