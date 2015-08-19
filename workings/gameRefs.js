var player;
	var playerSpeed = 70;
	var playerMaxSpeed = 500;
	var playerDrag = 1500;
	var playerHealth = 5;
	var maxPlayerHealth = 8;

var fastmusic = false;

var musicVolume = 1.2;

var mothership;
	var mothershipHealth = 10;

var enemies;
	var enemy;
	var enemySpawnDelay = 1200;
	var enemyTime = 0;
	var enemyV = 100;

var specEnemies;
	var specEnemy;
	var specEnemySpawnDelay = 5000;
	var specEnemyTime = 0;
	var specEnemyV = 60;

var bullets;
	var bullet;
	var bulletTime = 0;
	var bulletV = 1000;
	var bulletDelay = 200;

var specBullets;
	var specBullet;
	var specBulletTime = 0;
	var specbulletV = 1000;
	var specBulletDelay = 1700;

var healthUps;
	var powerUpSpawnDelay = 7000;
	var powerUpTime = 0;
	var powerUpV = 200;
	// diff powerups
	var healthUp;

var explosionEmitter;
var engineEmitter;
var endEmitter;
var forcefieldEmitter;

var background;

var scoreText;
	var score = 0;
	var scoreLabel = "Score: ";

var endScoreText;

var healthText;
	var healthLabel = "Health: ";
var msHealthText;
	var msHealthLabel = "Mothership: ";

var music;

var endText;
	var endTextLabel = "YOU LOSE";

var cursors;

var paused = false;

var pad1;

function preloadStuff() {
	// key : location
	game.load.image('player',				'workings/assets/player.png');
	game.load.image('enemy',				'workings/assets/enemy.png');
	game.load.image('specEnemy',			'workings/assets/specEnemy.png');
	game.load.image('specBullet',			'workings/assets/specBullet.png');
	game.load.image('bullet',				'workings/assets/bullet.png')
	game.load.image('healthUp',				'workings/assets/health.png');
	game.load.image('background',			'workings/assets/background.png');
	game.load.image('explosion_particle', 	'workings/assets/explosion_particle.png');
	game.load.image('engine_particle', 		'workings/assets/engine_particle.png');
	game.load.image('mothership',			'workings/assets/mothership.png');

	game.load.audio('playershoot', 		'workings/assets/playerlaser.mp3');
	game.load.audio('enemyshoot', 		'workings/assets/enemylaser.mp3');
	game.load.audio('explosion', 	'workings/assets/enemyexplosion.mp3');
	game.load.audio('playerhit', 	'workings/assets/playerhit.mp3');
	game.load.audio('playerdie', 	'workings/assets/playerdie.mp3');
	// game.load.audio('music', 		'workings/assets/sunset.mp3');
	game.load.audio('music', 		'workings/assets/spaceshootermusic.mp3');
	game.load.audio('fastmusic', 		'workings/assets/spaceshootermusicfast.mp3');
	game.load.audio('end', 			'workings/assets/end.mp3');
	game.load.audio('healthUp', 	'workings/assets/powerUp.mp3');
	game.load.audio('mothershiphit', 	'workings/assets/mothershiphit.mp3');
	game.load.audio('mothershiplaserhit', 	'workings/assets/mothershiplaserhit.mp3');
	game.load.audio('playerstart', 	'workings/assets/playerstart.mp3');
}

function creatTheGame() {

	// start gamepad
    game.input.gamepad.start();

    pad1 = game.input.gamepad.pad1;

	// game.stage.backgroundColor = "11FFFF";
	background = game.add.tileSprite(0, 0, game.width, game.height, 'background');

	music = game.sound.play('music', 1.2, true);

	game.physics.startSystem(Phaser.Physics.ARCADE);
	// game.physics.arcade.gravity.y = 100;

	// mothership
    mothership = game.add.sprite(game.width/2, game.height-5, 'mothership');
    mothership.anchor.set(0.5,0.5);
    mothership.health = mothershipHealth;
    game.physics.enable(mothership, Phaser.Physics.ARCADE);
    mothership.body.collideWorldBounds = false;
    mothership.body.moves = false;
	
	// player
	player = game.add.sprite(game.width/2, game.height - 100,'player');
	player.anchor.set(0.5,0.5);

	game.physics.enable(player, Phaser.Physics.ARCADE);

	player.body.drag.set(playerDrag);
    player.body.maxVelocity.set(playerMaxSpeed);

    player.body.collideWorldBounds = true;

    player.health = playerHealth;
    player.maxHealth = maxPlayerHealth;

    // text displays
	var style = { font: "bold 32px Arial", fill: "#fff"};
	scoreText = game.add.text(0, 0, scoreLabel + score, style);
	healthText = game.add.text(0, 50, healthLabel + player.health, style);
	msHealthText = game.add.text(0, 100, msHealthLabel + mothership.health, style);

	style = { font: "bold 50px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
	endText = game.add.text(0,100," ", style);
	endScoreText = game.add.text(0,0, " ", style);

	// enemies

	// standard enemy
	enemies = game.add.group();
	enemies.enableBody = true;
	enemies.physicsBodyType = Phaser.Physics.ARCADE;

	enemies.createMultiple(40, 'enemy');
    enemies.setAll('anchor.x', 0.5);
    enemies.setAll('anchor.y', 0.5);

    // special enemy
    specEnemies = game.add.group();
	specEnemies.enableBody = true;
	specEnemies.physicsBodyType = Phaser.Physics.ARCADE;

	specEnemies.createMultiple(40, 'specEnemy');
    specEnemies.setAll('anchor.x', 0.5);
    specEnemies.setAll('anchor.y', 0.5);

    //

	// bullets

	// player bullets
	bullets = game.add.group();
	bullets.enableBody = true;
	bullets.physicsBodyType = Phaser.Physics.ARCADE;

	bullets.createMultiple(40, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 0.5);

    // specenemy bullets
    specBullets = game.add.group();
	specBullets.enableBody = true;
	specBullets.physicsBodyType = Phaser.Physics.ARCADE;

	specBullets.createMultiple(40, 'specBullet');
    specBullets.setAll('anchor.x', 0.5);
    specBullets.setAll('anchor.y', 0.5);

    // powerUps
    healthUps = game.add.group();
    healthUps.enableBody = true;
    healthUps.physicsBodyType = Phaser.Physics.ARCADE;

    healthUps.createMultiple(40, 'healthUp');
    healthUps.setAll('anchor.x', 0.5);
    healthUps.setAll('anchor.y', 0.5);

    // emitters
    explosionEmitter = game.add.emitter(0, 0, 100);
    explosionEmitter.makeParticles('explosion_particle');
    explosionEmitter.gravity = 0;

    engineEmitter = game.add.emitter(0,0,100);
    engineEmitter.makeParticles('engine_particle');
    engineEmitter.width = 20;
    engineEmitter.setYSpeed(500,600);
    engineEmitter.setXSpeed(-50,50);

    engineEmitter.x = player.x;
	engineEmitter.y = player.y;
	// start(explode, lifespan, frequency, quantity, forceQuantity)
	engineEmitter.start(false, 500, 1);

	endEmitter = game.add.emitter(0,0,100);
	engineEmitter.makeParticles('explosion_particle');

	forcefieldEmitter = game.add.emitter(0,0,100);
	forcefieldEmitter.makeParticles('specBullet');

    // game input
    cursors = game.input.keyboard.createCursorKeys();
    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);

    game.sound.play('playerstart');
}

function updateEverything() {
	if(paused) {
		if(game.input.keyboard.isDown(Phaser.Keyboard.R)) {
			player.reset(game.width/2, game.height/2);
			player.health = playerHealth;
			mothership.health = mothershipHealth;
			paused = false;
			game.sound.removeByKey('end');
			music = game.sound.play('music', .5, true);
			endText.text = " ";
			endScoreText.text = " ";
			score = 0;
			game.sound.play('playerstart');
			mothership.reset(game.width/2, game.height-5);
			mothership.health = mothershipHealth;
			}
	} else {

		if(player.health <= 2 || mothership.health <= 2) {
			if(!fastmusic) {
				fastmusic = true;	
				game.sound.removeByKey('music');
				game.sound.play('fastmusic', musicVolume, true);
			}
		} else {
			if(fastmusic) {
				fastmusic = false;
				game.sound.removeByKey('fastmusic');
				game.sound.play('music', musicVolume, true);
			}
			
		}

		// update score
		score += Math.round(game.time.now/100);

		// player move
		// if(cursors.left.isDown) {
		// 	player.body.velocity.x += -playerSpeed;
		// 	background.tilePosition.x += 1;
		// } else if(cursors.right.isDown) {
		// 	player.body.velocity.x += playerSpeed;
		// 	background.tilePosition.x -= 1;
		// }
		// if(cursors.up.isDown) {
		// 	player.body.velocity.y += -playerSpeed;
		// 	background.tilePosition.y += 1;
		// } else if(cursors.down.isDown) {
		// 	player.body.velocity.y += playerSpeed;
		// 	background.tilePosition.y -= 1;
		// }

		// pad move
		if(Math.abs(pad1.axis(0)) > 0) {
			player.body.velocity.x += pad1.axis(0)*playerSpeed;
			background.tilePosition.x += pad1.axis(0);
		}
		if(Math.abs(pad1.axis(1)) > 0) {
			player.body.velocity.y += pad1.axis(1)*playerSpeed;
			background.tilePosition.y += pad1.axis(1);
		}
	

		engineParticles();

		background.tilePosition.y += 3;

		// bullet shoot
		//  if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
		//  	fireBullet();
		// }

		// bullet shoot
		 if (pad1.getButton(11).isDown == 1) {
		 	fireBullet();
		}
		// console.log(pad1.getButton(11));

		// spawn enemy
		spawnEnemies();

		// spawn powerups
		spawnHealthUp();


		// collisionhandler
		game.physics.arcade.overlap(player, enemies, playerCollideEnemyHandler, null, this);
		game.physics.arcade.overlap(player, specEnemies, playerCollideEnemyHandler, null, this);
		game.physics.arcade.overlap(bullets, enemies, bulletCollideEnemyHandler, null, this);
		game.physics.arcade.overlap(bullets, specEnemies, bulletCollideEnemyHandler, null, this);
		game.physics.arcade.overlap(player, healthUps, playerCollidePowerUpHandler, null, this);
		game.physics.arcade.overlap(player, specBullets, playerCollidesSpecBulletsHandler, null, this);
		game.physics.arcade.overlap(mothership, specBullets, mothershipCollidesSpecBulletsHandler, null, this);

		// spec enemy stuff
		specEnemies.forEach(specEnemyShoot, this);

		// destroy extra enemyies / powerups / etc.
		game.physics.arcade.overlap(mothership, enemies, mothershipCollidesEnemiesHandler, null, this);
		game.physics.arcade.overlap(mothership, specEnemies, mothershipCollidesEnemiesHandler, null, this);

		healthUps.forEach(containBounds, this);

		// display
		updateTexts();

		if(player.health <= 0 || mothership.health <= 0) {
			endGame();
		}
	}
}

function fireBullet() {
	if (game.time.now > bulletTime + bulletDelay) {
        bullet = bullets.getFirstExists(false);
        if (bullet) {
        	game.sound.play('playershoot');
            bullet.reset(player.body.x + player.body.width/2, player.body.y - player.body.height/2 + bullet.body.height/2);
            bullet.lifespan = 2000;
            bullet.body.velocity.y =  -bulletV;
            bulletTime = game.time.now + 50;
        }
    }
}

function specEnemyShoot(se) {
	if(se.alive) {
		if(game.time.now > specBulletTime + specBulletDelay) {
			specBullet = specBullets.getFirstExists(false);
			if(specBullet) {
				game.sound.play('enemyshoot');
            	specBullet.reset(se.x, se.y + se.height/2);
            	specBullet.lifespan = 2000;
            	game.physics.arcade.moveToObject(specBullet,player,specbulletV);
            	specBulletTime = game.time.now + 50;		
			}
		}
	}
}

function spawnEnemies() {
	if(game.time.now > enemyTime + enemySpawnDelay) {
		enemy = enemies.getFirstExists(false);
		if(enemy) {
			enemy.reset(Math.random() * game.width, -50);
			enemy.body.velocity.y = enemyV;
			enemyTime = game.time.now + 50;
		}
	}
	if(game.time.now > specEnemyTime + specEnemySpawnDelay) {
		specEnemy = specEnemies.getFirstExists(false);
		if(specEnemy) {
			specEnemy.reset(Math.random() * game.width, -50);
			specEnemy.body.velocity.y = specEnemyV;
			specEnemyTime = game.time.now + 50;
		}
	}
}

function spawnHealthUp() {
	if(game.time.now > powerUpTime + powerUpSpawnDelay) {
		healthUp = healthUps.getFirstExists(false);
		if(healthUp) {
			healthUp.reset(Math.random() * game.width, -50);
			healthUp.body.velocity.y = powerUpV;
			healthUp.body.angularVelocity = 100;
			powerUpTime = game.time.now + 50;
		}
	}
}

function playerCollideEnemyHandler(p, e) {
	game.sound.play('explosion');
	particleBurst(e.body.x, e.body.y);
	e.kill();
	p.health--;
}

function bulletCollideEnemyHandler(b, e) {
	game.sound.play('explosion');
	particleBurst(e.body.x, e.body.y);
	score+=400;
	b.kill();
	e.kill();
}

function playerCollidePowerUpHandler(p, pu) {
	pu.kill();
	p.health++;
	game.sound.play('healthUp');
}

function mothershipCollidesEnemiesHandler(m, e) {
	particleBurst(e.body.x, e.body.y);
	e.kill();
	mothership.health--;
	game.sound.play('mothershiphit');

	if(mothership.health <= 0) {
		mothership.kill();
		for(x = -(game.width/2); x <= game.width/2; x+= 10) {
			console.log('exploding: ' + x);
			particleBurst(x, game.height-5);
		}
	}
}

function playerCollidesSpecBulletsHandler(p, sb) {
	particleBurst(sb.x, sb.y);
	sb.kill();
	p.health--;
	game.sound.play('playerhit');
}

function mothershipCollidesSpecBulletsHandler(m, sb) {
	forcefieldEmitter.x = sb.x;
	forcefieldEmitter.y = sb.y;
	forcefieldEmitter.start(true, 1000, null, 10);
	sb.kill();
	game.sound.play('mothershiplaserhit');
}

function containBounds(s) {
	if(s.body) {
		if(s.body.y > game.height) {
			s.kill();
			s.body.y = -100;
		} else if(s.body.x > game.width) {
			s.body.x = game.width - s.body.width/2;
		} else if(s.body.x < 0) {
			s.body.x = s.body.width/2;
		}
	}
}

function containBoundsAndDecScore(s) {
	if(s.body) {
		if(s.body.y > game.height) {
			s.kill();
		} else if(s.body.x > game.width) {
			s.body.x = game.width - s.body.width/2;
		} else if(s.body.x < 0) {
			s.body.x = s.body.width/2;
		}
	}
}

function particleBurst(x,y) {

    //  Position the emitter where the mouse/touch event was
    explosionEmitter.x = x;
    explosionEmitter.y = y;

    //  The first parameter sets the effect to "explode" which means all particles are emitted at once
    //  The second gives each particle a 2000ms lifespan
    //  The third is ignored when using burst/explode mode
    //  The final parameter (10) is how many particles will be emitted in this single burst
    explosionEmitter.start(true, 1000, null, 10);

}

function engineParticles() {
	engineEmitter.x = player.x;
	engineEmitter.y = player.y + player.body.height/2;
}

function updateTexts() {
	scoreText.text = scoreLabel + score;
	healthText.text = healthLabel + player.health;
	msHealthText.text = msHealthLabel + mothership.health;
}

function kill(x) {
	x.kill();
}

function endGame() {
	endText.text = endTextLabel + "\n R to restart";
	endScoreText.text = "Score: " + score;
	healthText.text = " ";
	msHealthText.text = " ";
	scoreText.text = " ";

	endEmitter.x = player.x;
	endEmitter.y = player.y;
	endEmitter.start(false, 500, 1);
	
	engineEmitter.x = -100;
	engineEmitter.y = -100;

	game.sound.removeByKey('music');
	game.sound.removeByKey('fastmusic');
	game.sound.play('end');

	enemies.forEach(kill, this);
	specEnemies.forEach(kill, this);
	healthUps.forEach(kill, this)

	player.kill();
	// game.sound.play('playerdie');

	paused = true;
}