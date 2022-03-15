game.GameOver = me.Sprite.extend({
    init : function () {
        var image = me.loader.getImage("GameOver");
        this._super(me.Sprite, "init", [
            me.game.viewport.width / 2,
            me.game.viewport.height / 2,
            { image : image }
        ]);
    }
  });