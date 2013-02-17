var Level2 = Level.extend({
  init: function (game, score) {
    this._super(game, 2, score);
    console.log('Level 2 initialized!', this);
  },

  getShapeToDraw: function (isFirstShape) {
    var radius = Math.random() * 20 + 30;
    var colorSet = this.COLOR_SETS[Math.round(Math.random() * (this.COLOR_SETS.length - 1))];

    return this.getShape(isFirstShape, radius, colorSet);
  },

  completed: function () {
    return this.game.countShapes() === 15;
  },

  getScore: function () {
    var score = (this.game.countShapes() - 1) * 15;
    score += this.getStartScore();

    if (this.completed()) {
      score += 15;
    }
    return score;
  }
});
