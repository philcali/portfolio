game.PlayScreen = me.ScreenObject.extend({
  onResetEvent: function() {
    me.levelDirector.loadLevel("dashboard");
  }
});