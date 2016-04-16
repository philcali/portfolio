game.PlayScreen = me.ScreenObject.extend({
  onResetEvent: function() {
    me.levelDirector.loadLevel("dashboard", {
      onLoaded: function() {
        me.game.world.addChild(new game.Dialog());
      }
    });
  }
});
