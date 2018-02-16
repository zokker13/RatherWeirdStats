const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  _id: mongoose.Schema.ObjectId,
  date: {
    type: Date,
    default: Date.now,
    index: true,
  },
  nickname: String,
  game: String,
  ladderRank1v1: Number,
  ladderWins1v1: Number,
  ladderLosses1v1: Number,
  ladderElo1v1: Number,
  totalGames: Number,
  totalWins: Number,
  totalLosses: Number,
  disconnects: Number,
  desyncs: Number,
});

PlayerSchema.index({
  nickname: 1,
  game: -1,
});

class Mongo {

  initialize() {

  }

  getPlayer(game, nickname) {

  }

}

module.exports = Mongo;