const mongoose = require('mongoose');
const moment = require('moment');

const PlayerStatsSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  legacyAt: {
    type: Date,
    default: moment().add(30, 'seconds').toDate(),
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

PlayerStatsSchema.index({
  nickname: 1,
  game: -1,
});

module.exports = PlayerStatsSchema;