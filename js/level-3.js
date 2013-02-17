var Level3 = Level.extend({
  init: function (game, score) {
    this._super(game, 3, score);
    console.log('Level 3 initialized!', this);
  },

  getShapeToDraw: function (isFirstShape) {
    var radius = Math.random() * 20 + 25;
    var colorSet = this.COLOR_SETS[Math.round(Math.random() * (this.COLOR_SETS.length / 2))];
    var sides = Util.rand(4, 5);
    return this.getShape(isFirstShape, radius, colorSet, sides);
  },

  completed: function () {
    return this.game.countShapes() === 20;
  },

  getScore: function () {
    var score = (this.game.countShapes() - 1) * 35;
    score += this.getStartScore();

    if (this.completed()) {
      score += 50;
    }
    return score;
  }
});
