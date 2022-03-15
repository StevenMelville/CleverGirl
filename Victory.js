game.Victory = me.Entity.extend({
    init : function () {
        var image = me.loader.getImage("Victory");
        this._super(me.Entity, "init", [
            me.game.viewport.width / 2,
            me.game.viewport.height / 2,
            { image : image }
        ]);
    }
  });