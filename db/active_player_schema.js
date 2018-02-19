const mongoose = require('mongoose');

const ActivePlayerSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  nickname: {
    type: String,
  },
  game: {
    type: String,
    index: true,
  },
  id: Number,
  pid: Number,
});

module.exports = ActivePlayerSchema;