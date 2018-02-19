const _ = require('underscore');
const moment = require('moment');
const nconf = require('nconf');
const mongoose = require('mongoose');

const PlayerStatsSchema = require('./player_stats_schema');
const ActivePlayerSchema = require('./active_player_schema');

class Mongo {

  constructor() {
    this._playerStatsModel = null;
    this._activePlayerModel = null;
    this._connection = null;

  }

  initialize() {
    this._connection = mongoose.createConnection(nconf.get('mongo').url);
    this._playerStatsModel = this._connection.model('PlayerStats', PlayerStatsSchema);
    this._activePlayerModel = this._connection.model('ActivePlayer', ActivePlayerSchema);
  }

  insertActivePlayers(players) {
    return this._activePlayerModel.remove()
      .then(() => {
        const createPlayerCalls = _.map(players, (player) => {
          return this._activePlayerModel.create(player);
        });

        return Promise.all(createPlayerCalls);
      });
  }

  getFreshPlayer(game, nickname) {

    const now = moment();
    return this._playerStatsModel.findOne({
      game: game,
      nickname: nickname,   
      legacyAt: {
        $gte: now.toDate(),
      }
    });
  }

  insertPlayer(player) {
    const dbPlayer = new this._playerStatsModel(player);
    console.log('about tosave')

    return dbPlayer.save()
    .then(() => {
      console.log('saved')
    })
    .catch((err) => {
      console.log('shit ', err)
    })
  }

}

const mongo = new Mongo();

module.exports = mongo;