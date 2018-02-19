class PlayerBuilder {
  constructor() {
    this._player = {};
  }

  game(value) {
    this._player.game = value;
    return this;
  }

  nickname(value) {
    this._player.nickname = value;
    return this;
  }

  ladderRank1v1(value) {
    this._player.ladderRank1v1 = parseInt(value, 10);
    return this;
  }

  ladderStats1v1(value) {
    const stats = value.split('/');
    this._player.ladderWins1v1 = parseInt(stats[0], 10);
    this._player.ladderLosses1v1 = parseInt(stats[1], 10);
    return this;
  }

  ladderElo1v1(value) {
    this._player.ladderElo1v1 = parseInt(value, 10);
    return this;
  }

  totalGames(value) {
    this._player.totalGames = parseInt(value, 10);
    return this;
  }

  totalWins(value) {
    this._player.totalWins = parseInt(value, 10);
    return this;
  }

  totalLosses(value) {
    this._player.totalLosses = parseInt(value, 10);
    return this;
  }

  disconnects(value) {
    this._player.disconnects = parseInt(value, 10);
    return this;
  }

  desyncs(value) {
    this._player.desyncs = parseInt(value, 10);
    return this;
  }

  build() {
    return this._player;
  }

}

module.exports = PlayerBuilder;