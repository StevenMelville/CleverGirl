game.EndScreen = me.Stage.extend({
    onResetEvent: function() {
        me.game.world.addChild(new me.ColorLayer("background", "#000000"), 0);

        me.input.bindKey(me.input.KEY.ENTER, "enter");

        if(databoard.getResult()){
            me.game.world.addChild(me.pool.pull("victory"));
        }
        else{
            me.game.world.addChild(me.pool.pull("gameover"));
        }

        me.input.bindKey(me.input.KEY.ENTER, "enter", true);
        
        this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge){
            if(action === "enter"){
                me.state.change(me.state.PLAY);
            }
        });
    },

    onDestroyEvent: function() {
        me.input.unbindKey(me.input.KEY.ENTER, "enter");
        me.event.unsubscribe(this.handler);
    }

});
