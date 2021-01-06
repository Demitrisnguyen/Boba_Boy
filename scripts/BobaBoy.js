BobaBoyApp = {

  container: document.getElementById("Boba_container"),

  simulation: undefined,

  boy: null,

  platforms: [],

  Levels: [],

  obstacles: [],

  boba: [],

  goal: null,

  init: function () {
    this.createBobaBoy()

    let pic = document.createElement("img");
    pic.setAttribute("src", "images/boba.png");
    pic.setAttribute("height", "20");
    pic.setAttribute("width", "20");
    this.boy.element.appendChild(pic);

    this.createGoal()

    this.startGame()
    this.movement()

    for (let i = 0; i < 4; i++) {
      BobaBoyApp.platforms.push(this.createPlatforms())
    }
    for (let i = 0; i < 4; i++) {
      this.platforms[i].x_pos = Math.random() * 30 + 120 + i * 120
      this.platforms[i].y_pos = Math.random() * 60 + 400 - i * 100
    }

    //this.platforms[3].x_pos = 520
    this.platforms[3].y_pos = 160

    for (let i = 0; i < 1; i++) {
      BobaBoyApp.obstacles.push(this.createObstacles())
    }

    for (let i = 0; i < this.platforms.length; i++) {
      BobaBoyApp.boba.push(this.createBoba())
    }
    for (let i = 0; i < this.platforms.length; i++) {
      this.boba[i].x_pos = this.platforms[i].x_pos + this.platforms[i].x_length / 2
      this.boba[i].y_pos = this.platforms[i].y_pos - 15
    }
  },

  createlevel: function () { },

  createGoal: function () {
    let goaldiv = document.createElement("div");
    goaldiv.id = "goal"
    this.container.append(goaldiv)
    let goal = {
      x_pos: 679,
      y_pos: 50,
      width: 20,
      height: 50,
      element: goaldiv,
    }
    BobaBoyApp.goal = goal
  },

  createBobaBoy: function () {
    let bobaboydiv = document.createElement("div");
    bobaboydiv.className = "boy";
    this.container.append(bobaboydiv);
    let Boy = {
      radius: 10,
      x_pos: 10,
      //left side of the circle + the radius = center
      y_pos: 480,
      //top of the circle + radius = center
      x_vel: 0,
      y_vel: 0,
      onPlatform: false,
      obstacleCollision: false,
      bobascollected: 0,
      lives: 3,
      element: bobaboydiv,
    }
    BobaBoyApp.boy = Boy
  },

  startGame: function () {
    this.simulation = setInterval(this.animate.bind(BobaBoyApp), 20)
  },

  createObstacles: function () {
    let obstaclediv = document.createElement("div");
    obstaclediv.className = "obstacle";
    this.container.append(obstaclediv);
    let obstacle = {
      radius: 15,
      x_pos: 110,
      y_pos: 400,
      x_vel: 0,
      y_vel: -1,
      x_max: 100,
      y_max: 100,
      element: obstaclediv
    }
    return obstacle
  },

  createHearts: function () {

  },

  createBoba: function () {
    let bobadiv = document.createElement("div");
    bobadiv.className = "boba";
    this.container.append(bobadiv);
    let boba = {
      radius: 5,
      x_pos: 0,
      y_pos: 0,
      element: bobadiv
    }
    return boba
  },

  createPlatforms: function () {
    let platformdiv = document.createElement("div");
    platformdiv.className = "platform";
    this.container.append(platformdiv);
    let platform = {
      element: platformdiv,
      x_pos: Math.random() * 30 + 100,
      y_pos: Math.random() * 60 + 400,
      x_length: 100,
      y_length: 10,
    }
    return platform
  },

  animate: function () {
    this.moveBobaBoy()
    this.moveObstacles()
    this.renderBobaBoy()
    this.determinePlatform()
    this.collision()
  },

  startLevel: function () {

  },

  pause: function () {

  },

  resume: function () {

  },

  endGame: function () {
    //need to show time/score and restart button
    this.container.removeChild(this.boy.element)
    this.boy.x_pos = null
    this.boy.y_pos = null
    for (let i = 0; i < this.platforms.length; i++) {
      this.container.removeChild(this.platforms[i].element)
    }
    for (let i = 0; i < this.boba.length; i++) {
      if (this.boba[i].x_pos != null) {
        this.container.removeChild(this.boba[i].element)
        this.boba[i].x_pos = null
        this.boba[i].y_pos = null
      }
    }
    for (let i = 0; i < this.obstacles.length; i++) {
      this.container.removeChild(this.obstacles[i].element)
    }
    this.container.removeChild(this.goal.element)

  },

  collision: function () {

    for (let i = 0; i < this.platforms.length; i++) {
      let x_point = this.clamp(this.platforms[i].x_pos, this.platforms[i].x_pos + 100, this.boy.x_pos)
      let y_point = this.clamp(this.platforms[i].y_pos, this.platforms[i].y_pos + 10, this.boy.y_pos)

      let distance = Math.sqrt((x_point - this.boy.x_pos) * (x_point - this.boy.x_pos) + (y_point - this.boy.y_pos) * (y_point - this.boy.y_pos))

      if (distance <= this.boy.radius) {
        if (this.boy.y_pos <= this.platforms[i].y_pos) {
          this.boy.onPlatform = true;
          this.boy.y_vel = 0;
          this.boy.y_pos = this.platforms[i].y_pos - 10
          //console.log("top")
        }
        else if (this.boy.y_pos >= this.platforms[i].y_pos && this.boy.y_vel > 0) {
          this.boy.y_vel = 0
          this.boy.y_pos = this.platforms[i].y_pos + 20
        }
        else if (this.boy.x_pos + 10 >= this.platforms[i].x_pos && this.boy.x_pos + 10 < this.platforms[i].x_pos + 5) {
          this.boy.x_vel = 0
        }
        else if (this.boy.x_pos - 10 <= this.platforms[i].x_pos + 110 && this.boy.x_pos - 10 > this.platforms[i].x_pos + 95) {
          this.boy.x_vel = 0
          this.boy.x_pos = this.platforms[i].x_pos + 110
        }
        else {
          if (this.boy.x_pos <= this.platforms[i].x_pos)
            this.boy.x_pos = x_point - 10
          this.boy.x_vel = 0
          this.boy.y_vel = 0
          if (this.boy.x_pos >= this.platforms[i].x_pos + 105)
            this.boy.x_pos = x_point + 15
          this.boy.y_vel = 0
          this.boy.x_vel = 0
        }
      }
    }

    for (let i = 0; i < this.boba.length; i++) {
      let x_dif = (this.boy.x_pos + this.boy.radius - (this.boba[i].x_pos + this.boba[i].radius))
      let y_dif = (this.boy.y_pos + this.boy.radius - (this.boba[i].y_pos + this.boba[i].radius))
      let dist = Math.sqrt(x_dif * x_dif + y_dif * y_dif)

      if (dist <= this.boy.radius + this.boba[i].radius && this.boba[i].x_pos != null) {
        //console.log("collision")
        //this.boba.splice(i,i)
        //dont know if this ^ is needed. Removing the element from the array...
        //...messes the "removeChild" code down below. (makes it delete wrong element.)
        this.boba[i].x_pos = null
        this.boba[i].y_pos = null
        this.container.removeChild(this.boba[i].element)
        this.boy.bobascollected = this.boy.bobascollected + 1
        console.log("boba balls:", this.boy.bobascollected)
      }
    }

    //collision for the goal
    let x_pnt = this.clamp(this.goal.x_pos, this.goal.x_pos + this.goal.width, this.boy.x_pos)
    let y_pnt = this.clamp(this.goal.y_pos, this.goal.y_pos + this.goal.height, this.boy.y_pos)

    let dist = Math.sqrt((x_pnt - this.boy.x_pos)*(x_pnt - this.boy.x_pos) + (y_pnt - this.boy.y_pos)*(y_pnt - this.boy.y_pos))

    if (dist <= this.boy.radius) {
      
      console.log("Drink Delivered!")
      this.endGame()
    }
  },

  movement: function () {
    //key code of a: 65, d: 68, left key: 37, right key: 39
    //key code of space bar is 32, w: 87, up key: 38
    window.onkeydown = function (event) {
      if (event.keyCode == 68 || event.keyCode == 39) {
        BobaBoyApp.boy.x_vel = 4
      }
      if (event.keyCode == 65 || event.keyCode == 37) {
        BobaBoyApp.boy.x_vel = -4
      }
      if (event.keyCode == 32 || event.keyCode == 87 || event.keyCode == 38) {
        //can only jump when he is on a platform. in this case: the ground
        //may have to make different scenarios for platforms we add in.
        if (BobaBoyApp.boy.onPlatform == true) {
          BobaBoyApp.boy.y_vel = 8.9
        }
      }
    }

    window.onkeyup = function (event) {
      if (event.keyCode == 68 || event.keyCode == 39) {
        BobaBoyApp.boy.x_vel = 0
      }
      if (event.keyCode == 65 || event.keyCode == 37) {
        BobaBoyApp.boy.x_vel = 0
      }
      if (event.keyCode == 32 || event.keyCode == 87 || event.keyCode == 38) {
        if (BobaBoyApp.boy.onPlatform == false) {
          if (BobaBoyApp.boy.y_vel > 0) {
            //only make velocity decrease when the velocity is positive
            //this makes it so that when the player releases jump key, bobaboy will start to fall.
            //gives player more control over jump.
            BobaBoyApp.boy.y_vel = BobaBoyApp.boy.y_vel - BobaBoyApp.boy.y_vel * 0.7
            //making the value "0.7" higher makes it harder to jump, but more control.
            //8 seems like a good integer to use for a natural jump.
          }
        }
      }
    }
  },

  calculateVelocity: function () {
    //calculated velocity here, factoring in gravity.
    if (this.boy.onPlatform == true) {
      return this.boy.y_vel = this.boy.y_vel
    }
    else {
      return this.boy.y_vel = this.boy.y_vel - 0.25;
    }
  },

  moveBobaBoy: function () {
    this.boy.x_pos = this.boy.x_pos + this.boy.x_vel
    this.boy.y_pos = this.boy.y_pos - this.calculateVelocity()
    if (this.boy.y_pos > 480) {
      this.boy.y_pos = 480
    }
  },

  moveObstacles: function () {
    for (let i = 0; i < this.obstacles.length; i++) {
      this.obstacles[i].x_pos = this.obstacles[i].x_pos + this.obstacles[i].x_vel
      this.obstacles[i].y_pos = this.obstacles[i].y_pos + this.obstacles[i].y_vel
    }
    if(this.obstacles[0].y_pos <= 300) {
      this.obstacles[0].y_vel = this.obstacles[0].y_vel * -1;
    } else if (this.obstacles[0].y_pos >= 400) {
      this.obstacles[0].y_vel = this.obstacles[0].y_vel * -1;
    }
  },

  renderBobaBoy: function () {
    this.boy.element.style.left = this.boy.x_pos + "px";
    this.boy.element.style.top = this.boy.y_pos + "px";
    //this.boy.element.style.borderRadius = this.boy.radius + "px";
    for (let i = 0; i < this.platforms.length; i++) {
      this.platforms[i].element.style.left = this.platforms[i].x_pos + 10 + "px";
      this.platforms[i].element.style.top = this.platforms[i].y_pos + 10 + "px";
    }
    for (let i = 0; i < this.obstacles.length; i++) {
      this.obstacles[i].element.style.left = this.obstacles[i].x_pos + "px";
      this.obstacles[i].element.style.top = this.obstacles[i].y_pos + "px";
    }
    for (let i = 0; i < this.boba.length; i++) {
      this.boba[i].element.style.left = this.boba[i].x_pos + this.boba[i].radius + "px";
      this.boba[i].element.style.top = this.boba[i].y_pos + this.boba[i].radius + "px";
    }

    this.goal.element.style.left = this.goal.x_pos + "px";
    this.goal.element.style.top = this.goal.y_pos + "px";
    this.goal.element.style.width = this.goal.width + "px";
    this.goal.element.style.height = this.goal.height + "px";
  },

  determinePlatform: function () {
    //480 is position of the ground. we need to add in the other platforms.
    if (this.boy.y_pos == 480) {
      this.boy.onPlatform = true
    }
    else {
      this.boy.onPlatform = false
    }

  },

  clamp: function (min, max, pos) {
    if (pos < min) {
      return min;
    }
    else if (pos > max) {
      return max;
    }
    else {
      return pos;
    }
  }

}

BobaBoyApp.init();