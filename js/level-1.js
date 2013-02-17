var Level1 = Level.extend({
  init: function (game, score) {
    this._super(game, 1, score);
    this.colorIndex = Math.round(Math.random() * (this.COLOR_SETS.length - 1));
    this.radius = Math.random() * 10 + 50;
    console.log('Level 1 initialized!', this);
  },

  getShapeToDraw: function (isFirstShape) {
    this.colorIndex = (this.colorIndex + 1) % this.COLOR_SETS.length;
    var colorSet = this.COLOR_SETS[this.colorIndex];

    return this.getShape(isFirstShape, this.radius, colorSet);
  },

  completed: function () {
    return this.game.countShapes() === 10;
  },

  getScore: function () {
    var score = (this.game.countShapes() - 1) * 10;
    score += this.getStartScore();

    if (this.completed()) {
      score += 10;
    }
    return score;
  }
});
