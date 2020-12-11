BobaBoyApp = {

    container: document.getElementById("Boba_container"),

    simulation: undefined,

    init: function() {
      this.createBobaBoy()
      this.createObstacles()
    },
    
    createBobaBoy: function(){
      let bobaboydiv = document.createElement("div");
      bobaboydiv.className = "boy";
      this.container.append(bobaboydiv);
      let Boy = {
        radius: 10,
        x_pos: Math.random() * 700,
        y_pos: Math.random() * 500,
        x_vel: 0,
        y_vel: 0,
        element: bobaboydiv,
      }
      return Boy
    },
    startGame: function(){
      this.simulation = setInterval(this.animate.bind(BobaBoyApp), 30)
    },

    createObstacles: function(){
      let platformdiv = document.createElement("div");
      platformdiv.className = "platform";
      this.container.append(platformdiv);
      let platform = {
        element: platformdiv,
      }
      return platform
    },

    createHearts: function(){

    },

    createBoba: function(){

    },

    createPlatforms: function(){

    },

    animate: function(){

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
  
BobaBoyApp.init();