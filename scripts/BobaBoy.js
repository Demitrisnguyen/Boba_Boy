BobaBoyApp = {

  container: document.getElementById("Boba_container"),

  simulation: undefined,

  timer: undefined,

  time: null,

  boy: null,

  platforms: [],

  obstacles: [],

  boba: [],

  boba_position: [], //needed in order to move the platforms.

  goal: null,

  score: {

  },

  init: function () {
    this.createBobaBoy()

    this.boy.pic = document.createElement("img");
    this.boy.element.appendChild(this.boy.pic);
    this.boy.pic.setAttribute("src", "images/Bobaboy_stand.png");
    this.boy.pic.setAttribute("height", "40");
    this.boy.pic.setAttribute("width", "40");
    this.boy.pic.className = "bobapic"

    this.createGoal()
    this.goal.pic = document.createElement("img");
    this.goal.element.append(this.goal.pic);
    this.goal.pic.setAttribute("src","images/goal (1).png");
    this.goal.pic.id = "goalpic";
    this.goal.pic.setAttribute("height","80");

    

    this.startGame()
    this.createTimer()
    this.startTimer()
    this.movement()

    for (let i = 0; i < 9; i++) {
      BobaBoyApp.platforms.push(this.createPlatforms())
    }
    for (let i = 0; i < 4; i++) {
      this.platforms[i].x_pos = Math.random() * 30 + 130 + i * 130
      this.platforms[i].y_pos = Math.random() * 60 + 400 - i * 100
    }
    for (let i = 4; i < 7; i++) {
      this.platforms[i].x_pos = Math.random() * 150 + 50
      this.platforms[i].y_pos = Math.random() * 60 + 50 + (i - 4) * 100
    }

    for (let i = 7; i < 9; i++) {
      this.platforms[i].y_pos = Math.random() * 60 + (i - 4) * 100
    }
    this.platforms[7].x_pos = Math.random() * 80 + 520
    this.platforms[8].x_pos = Math.random() * 180 + 390

    for (let i = 0; i < this.platforms.length; i++) {
      BobaBoyApp.obstacles.push(this.createObstacles())
      this.obstacles[i].x_pos = this.platforms[i].x_pos - 20
      this.obstacles[i].y_pos = this.platforms[i].y_pos - 20
    }

    for (let i = 0; i < this.platforms.length; i++) {
      BobaBoyApp.boba.push(this.createBoba())
    }
    for (let i = 0; i < this.platforms.length; i++) {
      this.boba[i].x_pos = this.platforms[i].x_pos + this.platforms[i].x_length / 2
      this.boba[i].y_pos = this.platforms[i].y_pos - 15
    }

    
      this.platforms[Math.round(Math.random()*2)].x_vel = Math.random() * 3 - 1.5
      this.platforms[Math.round(Math.random()) + 3].x_vel = Math.random() * 3 - 1.5
      this.platforms[Math.round(Math.random()) + 5].x_vel = Math.random() * 3 - 1.5
      this.platforms[Math.round(Math.random()) + 7].x_vel = Math.random() * 3 - 1.5

    for(let i = 0; i < this.platforms.length; i++){
    if(this.platforms[i].x_vel != 0){
      this.boba_position[i] = this.boba[i].x_pos
      if(this.platforms[i].x_vel < 1.5 && this.platforms[i].x_vel >= 0){
        this.platforms[i].x_vel = 1.5
      }
      else if(this.platforms[i].x_vel > -1.5 && this.platforms[i].x_vel <= 0){
        this.platforms[i].x_vel = -1.5
      }
    }
  }

  },

  createGoal: function () {
    let goaldiv = document.createElement("div");
    goaldiv.id = "goal"
    this.container.append(goaldiv)
    let goal = {
      x_pos: 679,
      y_pos: 50,
      width: 70,
      height: 50,
      pic: null,
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
      killed: false,
      pic: null,
      element: bobaboydiv,
    }
    BobaBoyApp.boy = Boy
  },

  startGame: function () {
    this.simulation = setInterval(this.animate.bind(BobaBoyApp), 20)
  },

  startTimer: function(){
    this.timer = setInterval(this.timer.bind(BobaBoyApp), 10)
  },

  timer: function(){
    this.time.value = this.time.value + 0.01
    //console.log(this.time.value)
    
    this.time.element.textContent = this.time.value.toFixed(2) + " " + "sec"
    // "toFixed" rounds to 2 decimal places
  },

  createTimer: function(){
    let timerdiv = document.createElement("div")
    timerdiv.id = "time"
    this.container.append(timerdiv);
    let timer = {
      value: 0,
      element: timerdiv
    }
    BobaBoyApp.time = timer
  },

  clearTimer: function(){
    window.clearInterval(this.timer)
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

  createScore: function(){
    let scorediv = document.createElement("div");
    scorediv.id = "score";
    this.container.append(scorediv)
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
      x_vel: 0,
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

  //startLevel: function () {},

  pause: function () {

  },

  resume: function () {

  },

  endGame: function () {
    //need to show time/score and restart button
    this.createScore()
    if(this.boy.killed == true){
    score = 0
    } else {
      let score = Math.round((500 + this.boy.bobascollected * 1000) - (this.time.value * 50))
      if(score < 0){
        score = 0
      }
    }
    document.getElementById("score").textContent = "Score:" + " " + score
    
    this.container.removeChild(this.boy.element)
    this.boy = null
    for (let i = 0; i < this.platforms.length; i++) {
      this.container.removeChild(this.platforms[i].element)
    }
    this.platforms = []
    for (let i = 0; i < this.boba.length; i++) {
      if (this.boba[i].x_pos != null) {
        this.container.removeChild(this.boba[i].element)
        this.boba[i].x_pos = null
        this.boba[i].y_pos = null
      }
    }
    this.boba = []
    for (let i = 0; i < this.obstacles.length; i++) {
      this.container.removeChild(this.obstacles[i].element)
    }
    this.obstacles = []

    window.clearInterval(this.simulation)

    this.clearTimer()

    this.container.removeChild(this.goal.element)

    this.createRestart()
    
    document.getElementById("restart_button").onclick = function(){
      //console.log("restart")
      BobaBoyApp.container.removeChild(BobaBoyApp.time.element)
      BobaBoyApp.container.removeChild(document.getElementById("restart_button"))
      BobaBoyApp.container.removeChild(document.getElementById("score"))
      BobaBoyApp.init()
      BobaBoyApp.startTimer()
    }
  },

  createRestart(){
    let restartdiv = document.createElement("div")
    restartdiv.id = "restart_button"
    if(this.boy.killed == true){
      restartdiv.textcontent = "You dropped your drink!"
      } else {
        restartdiv.textContent = "Drink delivered! Play Again"
      }
    this.container.appendChild(restartdiv)
  },

  collision: function () {
//platform collision
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
//boba ball collision
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
    if (this.boy.x_pos >= this.goal.x_pos && this.boy.x_pos + 2*this.boy.radius <= this.goal.x_pos + this.goal.width && this.boy.y_vel <= 0){
      let distance = Math.abs(this.goal.y_pos - this.boy.y_pos)
      if (distance <= this.boy.radius){
        console.log("Drink Delivered!")
        this.endGame()
      }
    }
    //obstacle collision
  for (let i = 0; i < this.obstacles.length; i++) {
    let x_point = this.clamp(this.obstacles[i].x_pos, this.obstacles[i].x_pos + 20, this.boy.x_pos)
    let y_point = this.clamp(this.obstacles[i].y_pos, this.obstacles[i].y_pos + 20, this.boy.y_pos)

    let distance = Math.sqrt((x_point - this.boy.x_pos) * (x_point - this.boy.x_pos) + (y_point - this.boy.y_pos) * (y_point - this.boy.y_pos))

   if(distance <= this.boy.radius) {
    this.boy.killed = true;
    this.endGame()
   } 
     
  }
    //let x_pnt = this.clamp(this.goal.x_pos, this.goal.x_pos + this.goal.width, this.boy.x_pos)
    //let y_pnt = this.clamp(this.goal.y_pos, this.goal.y_pos + this.goal.height, this.boy.y_pos)

    //let dist = Math.sqrt((x_pnt - this.boy.x_pos)*(x_pnt - this.boy.x_pos) + (y_pnt - this.boy.y_pos)*(y_pnt - this.boy.y_pos))

    //if (dist <= this.boy.radius) {
      
      //console.log("Drink Delivered!")
      //this.endGame()
    //}
  },

  movement: function () {
    //key code of a: 65, d: 68, left key: 37, right key: 39
    //key code of space bar is 32, w: 87, up key: 38
    window.onkeydown = function (event) {
      if (event.keyCode == 68 || event.keyCode == 39) {
        BobaBoyApp.boy.x_vel = 4
        BobaBoyApp.boy.pic.setAttribute("src", "images/Bobaboy_right (1).png");
        
      }
      if (event.keyCode == 65 || event.keyCode == 37) {
        BobaBoyApp.boy.x_vel = -4
        BobaBoyApp.boy.pic.setAttribute("src", "images/Bobaboy_left.png")
      }
      if (event.keyCode == 32 || event.keyCode == 87 || event.keyCode == 38) {
        //can only jump when he is on a platform. in this case: the ground
        //may have to make different scenarios for platforms we add in.
        if (BobaBoyApp.boy.onPlatform == true) {
          BobaBoyApp.boy.y_vel = 8.9
          BobaBoyApp.boy.pic.setAttribute("src", "images/Bobaboy_jump.png")
        }
      }
    }

    window.onkeyup = function (event) {
      if (event.keyCode == 68 || event.keyCode == 39) {
        BobaBoyApp.boy.x_vel = 0
        BobaBoyApp.boy.pic.setAttribute("src", "images/Bobaboy_stand.png")
      }
      if (event.keyCode == 65 || event.keyCode == 37) {
        BobaBoyApp.boy.x_vel = 0
        BobaBoyApp.boy.pic.setAttribute("src", "images/Bobaboy_stand.png")
      }
      if (event.keyCode == 32 || event.keyCode == 87 || event.keyCode == 38) {
        if (BobaBoyApp.boy.onPlatform == false) {
            BobaBoyApp.boy.pic.setAttribute("src", "images/Bobaboy_stand.png")
          
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

    for(i = 0; i < this.platforms.length; i++){
      if(this.platforms[i].x_vel != 0){ 
      if(this.platforms[i].x_pos >= this.boba_position[i] + 5){
        this.platforms[i].x_vel = this.platforms[i].x_vel * -1
      }
      else if(this.platforms[i].x_pos <= this.boba_position[i] + 5 - 100){
        this.platforms[i].x_vel = this.platforms[i].x_vel * -1
      }
      
      this.platforms[i].x_pos = this.platforms[i].x_pos + this.platforms[i].x_vel
    }
    }
  },

  moveObstacles: function () {
    for (let i = 0; i < this.obstacles.length; i++) {
      this.obstacles[i].x_pos = this.obstacles[i].x_pos + this.obstacles[i].x_vel
      this.obstacles[i].y_pos = this.obstacles[i].y_pos + this.obstacles[i].y_vel
      if(this.obstacles[i].y_pos <= this.platforms[i].y_pos - 70) {
        this.obstacles[i].y_vel = this.obstacles[i].y_vel * -1;
      } else if (this.obstacles[i].y_pos >= this.platforms[i].y_pos + 10) {
        this.obstacles[i].y_vel = this.obstacles[i].y_vel * -1;
      }
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

//BobaBoyApp.startTimer();
BobaBoyApp.init();