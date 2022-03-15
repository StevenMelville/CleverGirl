const raptorState = {
    "prowling": 1,
    "ambushing": 2,
    "hunting": 3,
    "sprinting": 4
}
Object.freeze(raptorState);

const playerState = {
    "gas": 1,
    "generator": 2,
    "radio": 3,
    "landing": 4
}
Object.freeze(playerState);

let databoard = {
        constructor: function(){
        },

        reset: function(){
            this.playerx = 0;
            this.playery = 0;
            this.state = playerState.gas;
            this.result = false;
        },

        getResult: function(){
            return this.result;
        },

        setResult: function(result){
            this.result = result;
        },

        getx: function(){
            return this.playerx;
        },

        gety: function(){
            return this.playery;
        },
    
        updateplayer: function(x, y){
            this.playerx = x;
            this.playery = y;
        },

        completeTask: function(task){
            console.log(task);
            switch(this.state){
                case playerState.gas: if(task === "gas"){
                    this.state = playerState.generator;
                }
                    break;
                case playerState.generator:  if(task === "power"){
                    this.state = playerState.radio;
                }
                    break;
                case playerState.radio:  if(task === "radio"){
                    this.state = playerState.landing;
                }
                    break;
                case playerState.landing:  if(task === "landing"){
                    this.result = true;
                    me.state.change(me.state.END);
                }
                    break;
            }
        }
    };