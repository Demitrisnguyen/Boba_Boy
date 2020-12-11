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
        x_vel: 10,
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
      this.moveBobaBoy()
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

    moveBobaBoy: function(){
      this.Boy.x_pos = this.Boy.x_pos + this.Boy.x_vel
      this.Boy.y_pos = this.Boy.y_pos - this.Boy.y_vel
      
//these go in a render function:
      //this.Boy.element.style.left = this.Boy.x_pos
      //this.Boy.element.style.top = this.Boy.y_pos
    },
  }
  
BobaBoyApp.init();