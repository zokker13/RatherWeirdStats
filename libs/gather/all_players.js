const util = require('util');

const _ = require('underscore');
const got = require('got');
const cheerio = require('cheerio');
const pino = require('pino')();

const PlayerBuilder = require('./../player_builder');

const INFOSERVER = 'https://info.server.cnc-online.net/';
const STATSSERVER = 'http://shatabrick.com/cco/%s/index.php?g=%s&a=sp&name=%s'; // 1. game 2. short game 3. playername

const SHORTGAMENAME = {
  ra3: 'ra',
};


async function allPlayers() {

  try {
    const resp = await got(INFOSERVER);
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
  } catch (err) {
    pino.error('Something awful happened', err);
    throw err;
  }
}

async function specificPlayer(game, player) {
  try {
    const targetUrl = util.format(STATSSERVER, game, SHORTGAMENAME[game], player);
    pino.info('targetUrl:', targetUrl);
    const rawHtml = await got(targetUrl)
    const $ = cheerio.load(rawHtml.body);
    const players = [];
    $('li[id=calendar] div[id=calendar_wrap] table').first().children('tbody').children().each(function(idx, el) {
      // All the accounts for that user
      const desiredFields = [];
      $(this).children().each(function(idx, el) {
        desiredFields.push($(this).text());
      });

      const playerStats = new PlayerBuilder()
        .game(game)
        .nickname(desiredFields[1])
        .ladderRank1v1(desiredFields[2])
        .ladderStats1v1(desiredFields[3])
        .ladderElo1v1(desiredFields[4])
        .totalGames(desiredFields[5])
        .totalWins(desiredFields[6])
        .totalLosses(desiredFields[7])
        .disconnects(desiredFields[8])
        .desyncs(desiredFields[9])
        .build();

      players.push(playerStats);
    });

    return players;
  } catch (err) {
    pino.error('Something awful happened', err);
    throw err;
  }
}

module.exports = {
  allPlayers: allPlayers,
  specificPlayer: specificPlayer,
};
