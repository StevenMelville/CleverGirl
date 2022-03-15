game.PlayScreen = me.Stage.extend({
    onResetEvent: function() {
        if(Math.floor(Math.random() * 2) % 2 === 0){
            me.levelDirector.loadLevel("clevergirlmap");
        }
        else{
            me.levelDirector.loadLevel("clevergirlmap2");
        }
        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.UP, "up");
        me.input.bindKey(me.input.KEY.DOWN, "down");
        me.input.bindKey(me.input.KEY.A, "left");
        me.input.bindKey(me.input.KEY.D, "right");
        me.input.bindKey(me.input.KEY.W, "up");
        me.input.bindKey(me.input.KEY.S, "down");
    },

    onDestroyEvent: function() {
        me.input.unbindKey(me.input.KEY.LEFT, "left");
        me.input.unbindKey(me.input.KEY.RIGHT, "right");
        me.input.unbindKey(me.input.KEY.UP, "up");
        me.input.unbindKey(me.input.KEY.DOWN, "down");
        me.input.unbindKey(me.input.KEY.A, "left");
        me.input.unbindKey(me.input.KEY.D, "right");
        me.input.unbindKey(me.input.KEY.W, "up");
        me.input.unbindKey(me.input.KEY.S, "down");
    }

});
