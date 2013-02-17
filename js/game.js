var Game = Class.extend({
  VERSION: 'v0.1',
  KEY_HIGHSCORE: 'ShapeShift.HighScore',
  KEY_SCORE: 'ShapeShift.Score',
  KEY_LEVEL: 'ShapeShift.Level',

  init: function () {
    this.currentShape = null;
    this.mainLayer = new Kinetic.Layer();
    this.stage = new Kinetic.Stage({
      container: 'stage',
      width: window.innerWidth - 190,
      height: window.innerHeight - 30
    });
    this.stage.add(this.mainLayer);
    this.stageElement = document.getElementById('stage');
    this.level = Level.create(this, {
      score: parseInt(localStorage[this.KEY_SCORE]),
      level: parseInt(localStorage[this.KEY_LEVEL])
    });

    this.wrongGuesses = 0;
    this.clickLocked = false;
    this.setupButtons();
    this.updateSidebar();
  },

  start: function () {
    this.drawNextShape(true);
  },

  setupButtons: function () {
    var retryButton = document.getElementById('retry-button');
    var $this = this;
    retryButton.addEventListener('click', function () {
      if (confirm('Retry level?')) {
        $this.reset();
      }
      return false;
    }, true);

    var nextLevelButton = document.getElementById('next-level-button');
    nextLevelButton.addEventListener('click', function () {
      $this.nextLevel();
      return false;
    }, true);

    var retryLevelButton = document.getElementById('retry-failed-button');
    retryLevelButton.addEventListener('click', function () {
      $this.reset();
      return false;
    }, true);

    var restartButton = document.getElementById('restart-button');
    restartButton.addEventListener('click', function () {
      if (confirm('Restart game?')) {
        localStorage[$this.KEY_SCORE] = 0;
        localStorage[$this.KEY_LEVEL] = 1;
        $this.reset();
      }
      return false;
    }, true);
  },

  onShapeTapOrClick: function (tappedShape) {
    if (this.clickLocked)
      return;

    this.clickLocked = true;

    if (this.currentShape._id === tappedShape._id) {
      if (this.level.completed()) {
        console.log('Player has completed this level!');
        this.levelWon();
      } else {
        this.stageElement.className = 'hide';
        var $this = this;
        setTimeout(function () {
          $this.drawNextShape();
          $this.mainLayer.draw();
          $this.stageElement.className = 'show';
          $this.clickLocked = false;
        }, 500);
      }
    } else {
      this.wrongGuesses += 1;
      tappedShape.setStroke('red');
      tappedShape.setStrokeWidth(3);
      this.mainLayer.draw();
      this.clickLocked = false;
      if (this.wrongGuesses === 3) {
        this.levelFailed();
      }
    }
  },

  drawNextShape: function (isFirstShape) {
    this.currentShape = this.level.getShapeToDraw(isFirstShape);
    this.mainLayer.add(this.currentShape);
    this.mainLayer.draw();
    this.updateSidebar();
    var $this = this;
    this.currentShape.on('click tap', function () {
      $this.onShapeTapOrClick.call($this, this);
    });
  },

  updateSidebar: function () {
    var score = this.level.getScore();
    var highScore = parseInt(localStorage[this.KEY_HIGHSCORE]);
    if (isNaN(highScore)) {
      highScore = 0;
    }

    document.getElementById('score').innerHTML = score;
    document.getElementById('high-score').innerHTML = highScore;
    document.getElementById('level').innerHTML = this.level.getLevel();
    document.getElementById('game-info').innerHTML = this.VERSION;
  },

  countShapes: function () {
    return this.mainLayer.children.length;
  },

  getShapes: function () {
    return this.mainLayer.children;
  },

  reset: function () {
    window.location.reload();
  },

  showDialog: function (dialogId) {
    var overlay = document.getElementById('overlay');
    overlay.className = 'show';
    var dialogEl = document.getElementById(dialogId);
    dialogEl.className = 'show smiley-' + dialogId + '-' + Math.floor(Math.random()*4);
    var left = window.innerWidth / 2 - dialogEl.offsetWidth / 2;
    var top = window.innerHeight / 2 - dialogEl.offsetHeight / 2 - 50;
    dialogEl.style.left = left + "px";
    dialogEl.style.top = top + "px";

    var scoreEl = document.getElementById(dialogId + '-score');
    scoreEl.innerHTML = this.level.getScore();
  },

  levelWon: function () {
    var score = this.level.getScore();
    var highScore = parseInt(localStorage[this.KEY_HIGHSCORE]);

    if (isNaN(highScore)) {
      highScore = score;
    }
    if (score > highScore) {
      highScore = score;
    }

    localStorage[this.KEY_HIGHSCORE] = highScore;

    this.updateSidebar();
    this.showDialog('level-completed');
  },

  levelFailed: function () {
    localStorage[this.KEY_SCORE] = this.level.getStartScore();
    this.showDialog('level-failed');
  },

  nextLevel: function () {
    localStorage[this.KEY_SCORE] = this.level.getScore();
    localStorage[this.KEY_LEVEL] = Level.next(this.level);
    this.reset();
  }
});
