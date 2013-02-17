var Util = {
  rand: function (min, max) {
    if (!min) min = 0;
    if (!max) max = min + 100;

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};