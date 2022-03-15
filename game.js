
/* Game namespace */
var game = {

    // an object where to store game information
    data : {
        // score
        score : 0
    },


    // Run on page load.
    "onload" : function () {
        // Initialize the video.
        if (!me.video.init(960, 640, {parent : "screen", scale : "auto", scaleMethod : "flex"})) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // Initialize the audio.
        me.audio.init("mp3,ogg");

        // set and load all resources.
        // (this will also automatically switch to the loading screen)
        me.loader.preload(game.resources, this.loaded.bind(this));
    },

    // Run on game resources loaded.
    "loaded" : function () {
        me.pool.register("player", game.Player);
        me.pool.register("raptor", game.Raptor);
        me.pool.register("door", game.Door);
        me.pool.register("objective", game.Objective);
        me.pool.register("victory", game.Victory);
        me.pool.register("gameover", game.GameOver);

        this.playscreen = new game.PlayScreen;
        this.endscreen = new game.EndScreen;
        me.state.set(me.state.PLAY, this.playscreen);
        me.state.set(me.state.END, this.endscreen);

        me.state.change(me.state.PLAY);
    }
};
