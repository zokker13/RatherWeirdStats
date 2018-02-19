const _ = require('underscore');
const nconf = require('nconf');
const pino = require('pino')();

const gatherAllPlayers = require('./gather').allPlayers;
const mongo = require('./mongo');

class Controller {

  constructor() {
    
  }

  async initialize() {
    return await mongo.initialize();
  }

  getActivePlayers(game) {
    return gatherAllPlayers.allPlayers(game)
      .then((players) => {
        return mongo.insertActivePlayers(players);
      });
  }

  async test(game, nickname) {
    const players = await gatherAllPlayers.specificPlayer(game, nickname);
    _.each(players, async (player) => {
      try {
        const dbPlayer = await mongo.getFreshPlayer(game, player.nickname);
        if (dbPlayer == null) {
          console.log('player not found - will insert')
          await mongo.insertPlayer(player);
        } else {
          pino.info('Look at this player', dbPlayer);
        }
      } catch (err) {

      }
    });
  }
}

const controller = new Controller();

module.exports = controller;
module.exports.Controller = Controller;
