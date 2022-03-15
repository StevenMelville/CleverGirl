game.Raptor = me.Entity.extend({
    init: function(x, y, settings){
        this._super(me.Entity, "init", [x, y, settings]);
        this.alwaysUpdate = true;
        this.vel = 100;
        this.spotcount = 0;

        this.playerx = me.game.viewport.width / 2;
        this.playery = me.game.viewport.height / 2;
        this.doorvel = 5;
        this.doortime = 0;
        this.elapsed = 0;
        this.state = raptorState.prowling;
    },

    update: function(time){
        this.openingDoor = false;

        me.collision.check(this);

        let distance = this.getdistance();
        let playerdistance = this.getplayerdistance();

        this.elapsed += time;
        this.vel = this.getvel(time);

        switch(this.state){
            case raptorState.hunting: 
                if(this.elapsed > 2000){
                    this.updateRaptor(raptorState.ambushing);
                    this.elapsed = 0;
                }
                this.updatelocation();
                break;
            case raptorState.prowling: 
                if(distance < 10 || this.elapsed > 2000){
                    if(this.spotcount > 3){
                        this.updateRaptor(raptorState.hunting);
                        this.spotcount = 0;
                    }
                    else{
                        this.spotcount += 1;
                    }
                    this.updatelocation();
        
                    this.elapsed = 0;
                }
                break;
            case raptorState.ambushing: 
                if(playerdistance < 400){
                    this.updateRaptor(raptorState.sprinting);
                    this.elapsed = 0;
                }
                else if(this.elapsed > 1500){
                    this.updateRaptor(raptorState.prowling);
                    this.elapsed = 0;
                }
                break;
            case raptorState.sprinting: 
                if(this.elapsed > 4000){
                    this.updateRaptor(raptorState.prowling);
                    this.elapsed = 0;
                }
                this.updatelocation();
                break;
        }

        //Player is right
        if(this.pos.x < this.playerx){
            this.pos.x += this.vel * time / 1000;
        }
        //Player is left
        else if(this.pos.x > this.playerx){
            this.pos.x -= this.vel * time / 1000;
        }

        //Player is down
        if(this.pos.y < this.playery){
            this.pos.y += this.vel * time / 1000;
        }
        //Player is up
        else if(this.pos.y > this.playery){
            this.pos.y -= this.vel * time / 1000;
        }

        return true;
    },

    getdistance: function(){
        return Math.abs(Math.sqrt((this.playerx - this.pos.x) * (this.playerx - this.pos.x) + (this.playery - this.pos.y) * (this.playery - this.pos.y)));
    },

    getplayerdistance: function(){
        return Math.abs(Math.sqrt((databoard.getx() - this.pos.x) * (databoard.getx() - this.pos.x) + (databoard.gety() - this.pos.y) * (databoard.gety() - this.pos.y)));
    },

    onCollision: function(response, other){
        if(other.name == "door"){
            this.openingDoor = true;
            return false;
        }
        else if(other.name == "raptor" || other.name == "objective"){
            return false;
        }
        else if(other.name == "player"){
            me.game.world.removeChild(other);
            databoard.setResult(false);
            me.state.change(me.state.END);
        }
        else return true;
    },
    
    updateRaptor: function(state){
        this.state = state;
    },

    updatelocation: function(){
        this.playerx = this.getx();
        this.playery = this.gety();

        this.playerx = me.Math.clamp(this.playerx, 0, 2240);
        this.playery = me.Math.clamp(this.playery, 0, 1280);
    },

    updateRaptor: function(){
        switch(this.state){
            case raptorState.hunting: this.state = raptorState.prowling;
                break;
            case raptorState.prowling: this.state = raptorState.ambushing;
                break;
            case raptorState.ambushing: this.state = raptorState.sprinting;
                break;
            case raptorState.sprinting: this.state = raptorState.hunting;
                break;
        }
        console.log(this.state);
    },
    
    getx: function(){
        if(this.state === raptorState.sprinting || this.state === raptorState.hunting){
            return databoard.getx();
        }
        else{
            return this.pos.x + Math.floor(Math.random() * 200) * this.getsign();
        }
    },

    gety: function(){
        if(this.state === raptorState.sprinting || this.state === raptorState.hunting){
            return databoard.gety();
        }
        else{
            return this.pos.y + Math.floor(Math.random() * 200) * this.getsign();
        }
    },

    getvel: function(time){
        if(this.openingDoor){
            this.doortime += time;
            
            if(this.doortime > 1000){
                this.doortime = 0;
                this.doorvel += 5;
            }

            return this.doorvel;
        }
        else if(this.state === raptorState.sprinting){
            return 155;
        }
        else if(this.state === raptorState.ambushing){
            return 0;
        }
        else{
            return 100;
        }
    },

    getsign: function(){
        return Math.floor(Math.random() * 10) % 2 ? 1 : -1;
    },
});