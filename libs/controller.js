const gatherAllPlayers = require('./gather').allPlayers;

class Controller {

  constructor() {

  }

  async test() {
    const players = await gatherAllPlayers.specificPlayer('ra3', 'cWc.zokker13');
  }
}

const controller = new Controller();

module.exports = controller;
module.exports.Controller = Controller;
