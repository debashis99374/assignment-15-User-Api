const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
      },
      text: String,
      rating:{
        type:Number,
        default:0,
        max:10,
        min:0
      }
    },
  ],
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;