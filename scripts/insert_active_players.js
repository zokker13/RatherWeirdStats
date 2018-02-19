const path = require('path');

const Promise = require('bluebird');
const _ = require('underscore');
const nconf = require('nconf');
const got = require('got');
const mongoose = require('mongoose');

const constants = require('./../constants');

const ActivePlayerSchema = require('./../db/active_player_schema');

nconf.file({
  file: path.join(__dirname, '..', 'sample_config.json'),
});


function getAllPlayers() {

  return Promise.try(async() => {

    const resp = await got(constants.INFO_SERVER);
    const data = JSON.parse(resp.body);

    let users = [];
    _.each(data, (subtrees, game) => {
      const extendedUsers = _.map(subtrees.users, (user) => {
        user.game = game;
        return user;
      });

      users = users.concat(extendedUsers);
    });

    return users;
  });
}

function insertIntoDatabase(players) {

  return Promise.try(async() => {

    mongoose.connect(nconf.get('mongo').url);
    const ActivePlayerModel = mongoose.model('ActivePlayer', ActivePlayerSchema);

    await ActivePlayerModel.remove();
    const createPlayerCalls = _.map(players, (player) => {
      return ActivePlayerModel.create(player);
    });

    await Promise.all(createPlayerCalls);
  });
}

let errorCode = 0;
return getAllPlayers()
  .then((players) => {
    return insertIntoDatabase(players);
  })
  .catch((err) => {
    console.error('Something awful happened', err);
    errorCode = 1;
  })
  .finally(async() => {
    await mongoose.connection.close();
    process.exit(errorCode);
  });