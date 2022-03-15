game.Player = me.Entity.extend({
    init: function(x, y, settings){
        this._super(me.Entity, "init", [x, y, settings]);

        this.vel = 150;
        this.alwaysUpdate = true;
        databoard.reset();
        databoard.updateplayer(this.pos.x, this.pos.y);

        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH, 0.4);
    },

    update: function(time){

        if(me.input.isKeyPressed("left")){
            this.pos.x -= this.vel * time / 1000;
        }

        if(me.input.isKeyPressed("right")){
            this.pos.x += this.vel * time / 1000;
        }

        if(me.input.isKeyPressed("up")){
            this.pos.y -= this.vel * time / 1000;
        }

        if(me.input.isKeyPressed("down")){
            this.pos.y += this.vel * time / 1000;
        }

        this.pos.x = me.Math.clamp(this.pos.x, 0, 2240);
        this.pos.y = me.Math.clamp(this.pos.y, 0, 1280);


        databoard.updateplayer(this.pos.x, this.pos.y);

        me.collision.check(this);

        return true;
    },

    onCollision: function(response, other){
        if(other.name == "door"){
            return false;
        }
        else if(other.name == "objective"){
            databoard.completeTask(other.type);
            return false;
        }
        return true;
    }
});