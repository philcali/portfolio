var game = {
  onload: function() {
    if (!me.video.init(320, 240, {wrapper: 'screen', scale: 'auto', scaleMethod: 'flex-width'})) {
      alert('Your browser does not support HTML5 canvas.');
      return;
    }
    if (me.game.HASH.debug === true) {
      window.onReady(function() {
        me.plugin.register.defer(this, me.debug.Panel, "debug", me.input.KEY.V);
        me.debug.renderHitBox = true;
      });
    }
    me.loader.onload = this.loaded.bind(this);
    me.loader.preload(game.resources);
    me.state.change(me.state.LOADING);
  },

  loaded: function() {
    me.state.set(me.state.PLAY, new game.PlayScreen());
    me.pool.register('mainPlayer', game.PlayerEntity);
    me.state.transition('fade', '#000000', 150);
    me.state.change(me.state.PLAY);
  }
};
