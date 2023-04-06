const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Database Connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      location: `${cities[random].city}, ${cities[random].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis rem, at libero sequi provident quia amet iusto magnam quos sit repellendus maiores laudantium reprehenderit, praesentium nulla cum a autem explicabo.",
      price,
      author: "635f700a1dc911f0f054bfb1",
      image: [
        {
          url: "https://res.cloudinary.com/dnoerqbpt/image/upload/v1668059382/YelpCamp/ila5mgwahs06mpg8utcw.jpg",
          filename: "YelpCamp/ila5mgwahs06mpg8utcw.jpg",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
