const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");

// https://res.cloudinary.com/dnoerqbpt/image/upload/w_300/v1667632439/YelpCamp/zfaaowtkqtynlfrtihpw.jpg

const ImgaeSchema = new Schema({
  url: String,
  filename: String,
});

ImgaeSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_400");
});

const CampgroundSchema = new Schema({
  title: String,
  image: [ImgaeSchema],
  price: Number,
  description: String,
  location: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

CampgroundSchema.post("findOneAndDelete", async (doc) => {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

module.exports = mongoose.model("Campground", CampgroundSchema);
