var trexRunning, trexCollided, cloudImage, groundImage, gameOverImage, restartImage, obstacle1Image, obstacle2Image, obstacle3Image, obstacle4Image, obstacle5Image, obstacle6Image, count, PLAY = 1
  END = 0,
  gameState = PLAY

var trexSprite, groundSprite, invisibleGround, count = 0,gameOverSprite,restartSprite;
var cloudsGroup, obstacleGroup;

// PRELOAD FUNCTION IS RESPONSIBLE FOR LOADING IMAGES,SOUNDS AND ANIMATIONS
function preload() {
  groundImage = loadImage("ground2.png")
  trexCollided = loadImage("trex_collided.png")
  //file name - is a string, hence it will be in ""
  cloudImage = loadImage('cloud.png')
  obstacle1Image = loadImage("obstacle1.png")
  obstacle2Image = loadImage("obstacle2.png")
  obstacle3Image = loadImage("obstacle3.png")
  obstacle4Image = loadImage("obstacle4.png")
  obstacle5Image = loadImage("obstacle5.png")
  obstacle6Image = loadImage("obstacle6.png")
  trexRunning = loadAnimation("trex1.png", "trex3.png", "trex4.png")
  gameOverImage = loadImage("gameOver.png")
  restartImage = loadImage("restart.png")
  
}

function setup() {
  createCanvas(600, 200);

  // creating a sprite for trex and making it run
  trexSprite = createSprite(50, 150, 20, 50)
  trexSprite.addAnimation('running', trexRunning)
  trexSprite.scale = 1 / 2

  // creating a sprite for ground and setting the animation
  groundSprite = createSprite(300, 180, 600, 10)
  groundSprite.addImage(groundImage)

  invisibleGround = createSprite(300, 190, 600, 10)
  invisibleGround.visible = false
  
  gameOverSprite = createSprite(300,100)
  gameOverSprite.addImage(gameOverImage)
  gameOverSprite.scale = 0.5
  gameOverSprite.visible = false
  restartSprite = createSprite(300,150)
  restartSprite.addImage(restartImage)
  restartSprite.scale = 0.5
  restartSprite.visible = false

  groundSprite.velocityX = -7
  cloudsGroup = new Group();
  obstacleGroup = new Group();
}

function draw() {
  background(180);
  fill('green')
  text("Score:" + count, 385, 50)
  trexSprite.collide(invisibleGround);
  drawSprites();



  if (gameState === PLAY) {
    // MAKING THE TREX JUMP
    if (keyDown('space') && trexSprite.y > 161) {
      trexSprite.velocityY = -10;
    }
    if (frameCount % 7 === 0) {
      count = count + 1
    }
    //moving the ground
    if (groundSprite.x < 0) {
      groundSprite.x = groundSprite.width / 2
    }
    spawnClouds();
    spawnObstacles();
    trexSprite.velocityY = trexSprite.velocityY + 0.5;
    if (trexSprite.isTouching(obstacleGroup)) {
      gameState = END
    }
  } else if (gameState === END) {
    trexSprite.velocityY = 0;
    groundSprite.velocityX = 0;
    
    gameOverSprite.visible = true
    restartSprite.visible = true
    
    obstacleGroup.setVelocityXEach(0)
    obstacleGroup.setLifetimeEach = -1
    cloudsGroup.setVelocityXEach(0)  
    cloudsGroup.setLiftimeEach = -1
  }
  }

function spawnClouds() {
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600, random(80, 120), 40, 10);
    cloud.velocityX = -2;
    //variable names never come in ""
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.depth = trexSprite.depth;
    trexSprite.depth = trexSprite.depth + 1;
    cloud.lifetime = 300;
    cloudsGroup.add(cloud)
  }
}

function spawnObstacles() {
  if (frameCount % 100 === 0) {
    var obstacle = createSprite(600, 160, 20, 50)
    obstacle.velocityX = -5;
    var rand = Math.round(random(1, 6));
    //when random no generated is 1 -> obstacle1Image
    switch (rand) {
      case 1:
        obstacle.addImage(obstacle1Image);
        break;
      case 2:
        obstacle.addImage(obstacle2Image);
        break;
      case 3:
        obstacle.addImage(obstacle3Image);
        break;
      case 4:
        obstacle.addImage(obstacle4Image);
        break;
      case 5:
        obstacle.addImage(obstacle5Image);
        break;
      case 6:
        obstacle.addImage(obstacle6Image);
        break;
      default:
        break;
    }
    obstacle.scale = 0.5
    obstacleGroup.add(obstacle)
  }
}