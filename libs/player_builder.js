class PlayerBuilder {
  constructor() {
    this._player = {};
  }

  nickname(value) {
    this._player.nickname = value;
    return this;
  }

  ladderRank1v1(value) {
    this._player.ladderRank1v1 = value;
    return this;
  }

  ladderStats1v1(value) {
    const stats = value.split('/');
    this._player.ladderWins1v1 = stats[0];
    this._player.ladderLosses1v1 = stats[1];
    return this;
  }

  ladderElo1v1(value) {
    this._player.ladderElo1v1 = value;
    return this;
  }

  totalGames(value) {
    this._player.totalGames = value;
    return this;
  }

  totalWins(value) {
    this._player.totalWins = value;
    return this;
  }

  totalLosses(value) {
    this._player.totalLosses = value;
    return this;
  }

  disconnects(value) {
    this._player.disconnects = value;
    return this;
  }

  desyncs(value) {
    this._player.desyncs = value;
    return this;
  }

  build() {
    return this._player;
  }

}

module.exports = PlayerBuilder;