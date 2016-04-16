game.Dialog = me.GUI_Object.extend({
  init: function(options) {
    var settings = {
      image: "dialog",
      framewidth: 238,
      frameheight: 60,
      x: 160,
      y: 45
    };
    this._super(me.GUI_Object, "init", [settings.x, settings.y, settings]);
    this.pos.z = 10;
    this.alpha = 0.80;
    this.border = new game.DialogBorder(settings.x, settings.y);
  },

  draw: function(renderer) {
    this._super(me.GUI_Object, 'draw', [ renderer ]);
    this.border.draw(renderer);
  }
});

game.DialogBorder = me.GUI_Object.extend({
  init: function(x, y, options) {
    var settings = {
      framewidth: 238,
      frameheight: 60,
      image: 'dialog_border'
    };
    this._super(me.GUI_Object, "init", [x, y, settings]);
    this.pos.z = 15;
  }
});
