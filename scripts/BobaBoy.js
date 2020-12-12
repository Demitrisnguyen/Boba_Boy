BobaBoyApp = {

    container: document.getElementById("Boba_container"),

    simulation: undefined,
    
    boy: null,

    init: function() {
      this.createBobaBoy()
      this.createObstacles()
      this.startGame()
      this.movement()
    },
    
    createBobaBoy: function(){
      let bobaboydiv = document.createElement("div");
      bobaboydiv.className = "boy";
      this.container.append(bobaboydiv);
      let Boy = {
        radius: 10,
        x_pos: 10,
        y_pos: 480,
        x_vel: 0,
        y_vel: 0,
        y_acc: 0,
        element: bobaboydiv,
      }
      BobaBoyApp.boy = Boy
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
      this.renderBobaBoy()
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

    movement: function(){
      //key code of a: 65, d: 68, left key: 37, right key: 39
      //key code of space bar is 32, w: 87, up key: 38
      window.onkeydown = function(event){
        if (event.keyCode == 68 || event.keyCode == 39){
          BobaBoyApp.boy.x_vel = 5
        }
        if (event.keyCode == 65 || event.keyCode == 37){
          BobaBoyApp.boy.x_vel = -5
        }
        if (event.keyCode == 32 || event.keyCode == 87 || event.keyCode == 38) {
          //can only jump when he is on a platform. in this case: the ground
          //may have to make different scenarios for platforms we add in.
          if (BobaBoyApp.boy.y_pos == 480){
          BobaBoyApp.boy.y_vel = 20
        }
        }
      }

      window.onkeyup = function(event){
        if (event.keyCode == 68 || event.keyCode == 39){
          BobaBoyApp.boy.x_vel = 0
        }
        if (event.keyCode == 65 || event.keyCode == 37){
          BobaBoyApp.boy.x_vel = 0
        }
        if (event.keyCode == 32 || event.keyCode == 87 || event.keyCode == 38) {
          if(BobaBoyApp.boy.y_vel > 0){
            //only make velocity = 0 when the velocity is positive
            //this makes it so that when the player releases jump key, bobaboy will start to fall.
            BobaBoyApp.boy.y_vel = 0
          }
        }
      }
    },

    calculateVelocity: function(){
      //calculated velocity here, factoring in gravity.
      return this.boy.y_vel = this.boy.y_vel - 1
    },

    moveBobaBoy: function(){
      this.boy.x_pos = this.boy.x_pos + this.boy.x_vel
      this.boy.y_pos = this.boy.y_pos - this.calculateVelocity()
      if (this.boy.y_pos > 480){
        this.boy.y_pos = 480
      }
    },

    renderBobaBoy: function(){
      this.boy.element.style.left = this.boy.x_pos + "px";
      this.boy.element.style.top = this.boy.y_pos + "px";
    }
  }
  
BobaBoyApp.init();