BobaBoy = {

    container: document.getElementById("Boba_container"),

    init: function() {
      this.createBobaBoy()
    },
    
    createBobaBoy: function(){
      let bobaboydiv = document.createElement("div");
      bobaboydiv.classname = "boy"
      this.container.append(bobaboydiv)
      let BobaBoy = {
        color: "black",
        radius: 10,
        x_pos: Math.random() * 700,
        y_pos: Math.random() * 500,
        x_vel: 0,
        y_vel: 0,
      }
    },

    createObstacles: function(){

    },

    createHearts: function(){

    },

    createBoba: function(){

    },

    createPlatforms: function(){

    },

    animateBobaBoy: function(){

    },

    startLevel: function(){

    },

    pause: function(){

    },

    resume: function(){

    },

    collision: function(){
      //decide if this is going to be the player checking for collisions with objects
      // or the objects checking for collisions with the player.
    },

    jump: function(){

    },

    walk: function(){

    },
  }
  
BobaBoy.init();