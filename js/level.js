var Level = Class.extend({
  CANVAS_PADDING: 15,
  COLOR_SETS: [
    ["#ef608a", "#de1841"], ["#fabb5b", "#f5861a"], ["#faef5e", "#f5de1a"],
    ["#a3ea63", "#5dd517"], ["#5cb9e4", "#1680ca"], ["#a052e4", "#6016ca"],
    ["#fa8858", "#f6451a"], ["#fad85e", "#f6b41a"], ["#eaf557", "#d6eb19"],
    ["#57e4b7", "#15ca7f"], ["#5771e4", "#152aca"], ["#e350dc", "#ca16bd"],
    ["#aac2d1", "#6c90a9"], ["#7196a8", "#2b526a"]
  ],

  init: function (game, level, startScore) {
    console.log('Level initialized!');
    this.game = game;
    this.stageWidth = game.stage.getWidth();
    this.stageHeight = game.stage.getHeight();
    this.padding = this.CANVAS_PADDING;
    this.level = level || -1;
    this.startScore = startScore || 0;
  },

  getLevel: function () { return this.level; },

  getStartScore: function () {
    return this.startScore;
  },

  randomCoords: function (radius) {
    var x = Math.random() * this.stageWidth;
    var y = Math.random() * this.stageHeight;

    if (x < radius)
      x = radius + this.padding;
    if (x > this.stageWidth - radius)
      x = this.stageWidth - radius - this.padding;

    if (y < radius)
      y = radius + this.padding;
    if (y > this.stageHeight - radius)
      y = this.stageHeight - radius - this.padding;

    return { x: x, y: y };
  },

  centerCoords: function (radius) {
    return {
      x: this.stageWidth / 2 - radius / 2,
      y: this.stageHeight / 2 - radius / 2
    };
  },

  getShapeCoords: function (isFirstShape, radius) {
    return isFirstShape ? this.centerCoords(radius) : this.randomCoords(radius);
  },

  getShape: function (isFirstShape, radius, colorSet, sides) {
    var coords = this.getShapeCoords(isFirstShape, radius);

    if (sides == null) {
      sides = Util.rand(3, 7);
    }

    var shape = new Kinetic.RegularPolygon({
      x: coords.x, y: coords.y, sides: sides, radius: radius, stroke: '#444', strokeWidth: 1,
      //shadowColor: 'black', shadowBlur: 5, shadowOffset: 2, shadowOpacity: 0.5,
      fillLinearGradientStartPoint: [-50, -50],
      fillLinearGradientEndPoint: [50, 50],
      fillLinearGradientColorStops: [0, colorSet[0], 1, colorSet[1]]
    });

    return shape;
  }
});

Level.create = function (game, options) {
  var level = options.level || 1;
  var score = options.score || 0;

  if (level === 2)
    return new Level2(game, score);

  if (level === 3)
    return new Level3(game, score);

  return new Level1(game, score);
};

Level.next = function (level) {
  return level.getLevel() + 1;
}
