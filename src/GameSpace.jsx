import React, { useEffect } from "react";
//This is where Graham learns me some knawledge
const GameSpace = (props) => {
  useEffect(() => {
    const ctx = document.querySelector("canvas").getContext("2d");
    const gameHeight = 900;
    const gameWidth = 1200;
    const floorLevel = 64;

    ctx.canvas.height = gameHeight;
    ctx.canvas.width = gameWidth;

    // Define the player entity
    const playerEntity = {
      height: 32,
      jumping: true,
      width: 32,
      x: 144,
      xV: 0,
      y: gameHeight - floorLevel,
      yV: 0,
    };

    const mountainsImage = document.getElementById("mountains");
    const moonImage = document.getElementById("moon");

    const levels = [
      {
        levelName: "earth_0",
        levelText: "A long time ago... the earth was peaceful",
        backgroundImage: mountainsImage,
        movementValues: {
          gravity: 1.5,
          yVJump: 20,
          xVFriction: 0.9,
          yVFriction: 0.9,
          xV: 0.8,
        },
      },
      {
        levelName: "earth_1",
        levelText: "Everything was green and the air was clean",
        backgroundImage: mountainsImage,
        movementValues: {
          gravity: 1.5,
          yVJump: 20,
          xVFriction: 0.9,
          yVFriction: 0.9,
          xV: 0.8,
        },
      },
      {
        levelName: "earth_2",
        levelText: "And the Earth was its own master",
        backgroundImage: mountainsImage,
        movementValues: {
          gravity: 1.5,
          yVJump: 20,
          xVFriction: 0.9,
          yVFriction: 0.9,
          xV: 0.8,
        },
      },
      {
        levelName: "moon_0",
        levelText: "It held pure indifference to the ageless void",
        backgroundImage: moonImage,
        movementValues: {
          gravity: 0.43,
          yVJump: 20,
          xVFriction: 0.9,
          yVFriction: 0.9,
          xV: 0.5,
        },
      },
    ];

    // Define the game controller to define movement
    const gameController = {
      left: false,
      right: false,
      up: false,
      keyListener: function (event) {
        const keyState = event.type === "keydown" || false;
        const { keyCode } = event;
        // Left key, Up Key, Right Key
        gameController.left =
          keyCode === 37 || keyCode === 65 ? keyState : gameController.left;
        gameController.up =
          keyCode === 38 || keyCode === 87 ? keyState : gameController.up;
        gameController.right =
          keyCode === 39 || keyCode === 68 ? keyState : gameController.right;
      },
    };

    // Call the controller when a key is pressed down
    window.addEventListener("keydown", gameController.keyListener);

    // Call the controller when a key is released
    window.addEventListener("keyup", gameController.keyListener);

    // Define the games internal state
    const gameState = {
      screen: 0,
    };

    const eventLoop = () => {
      const currentLevelMovement = levels[gameState.screen].movementValues;

      // The player jumps
      if (gameController.up && !playerEntity.jumping) {
        playerEntity.yV -= currentLevelMovement.yVJump;
        playerEntity.jumping = true;
      }

      // The player moves left
      if (gameController.left) {
        playerEntity.xV -= currentLevelMovement.xV;
      }

      // The player moves right
      if (gameController.right) {
        playerEntity.xV += currentLevelMovement.xV;
      }

      // gravity
      playerEntity.yV += currentLevelMovement.gravity;

      // Account for players velocity
      playerEntity.x += playerEntity.xV;
      playerEntity.y += playerEntity.yV;

      // Apply friction to the players velocity
      playerEntity.xV *= currentLevelMovement.xVFriction;
      playerEntity.yV *= currentLevelMovement.yVFriction;

      // if playerEntity is falling below floor line, reduce their velocity to zero
      if (playerEntity.y > gameHeight - floorLevel - 32) {
        playerEntity.jumping = false;
        playerEntity.y = gameHeight - floorLevel - 32;
        playerEntity.yV = 0;
      }

      // if playerEntity is going off the left of the screen
      if (gameState.screen === 0 && playerEntity.x < 0) {
        playerEntity.x = 0;
        playerEntity.xV = 0;
      } else if (playerEntity.x < -32) {
        playerEntity.x = gameWidth;
        gameState.screen--;
        console.log(`Screen: ${gameState.screen}`);
      } else if (
        gameState.screen === levels.length - 1 &&
        playerEntity.x > gameWidth - 32
      ) {
        playerEntity.x = gameWidth - 32;
        playerEntity.xV = 0;
      } else if (playerEntity.x > gameWidth) {
        // if playerEntity goes past right boundary
        playerEntity.x = -32;
        gameState.screen++;
        console.log(`Screen: ${gameState.screen}`);
      }

      // Make the background color a dark grey
      // ctx.fillStyle = "#202020";
      // ctx.fillRect(0, 0, gameWidth, gameHeight); // x, y, width, height

      ctx.drawImage(
        levels[gameState.screen].backgroundImage,
        0,
        0,
        gameWidth,
        gameHeight
      );

      // Fill the player space with a nice green
      ctx.fillStyle = "#1EB980";
      ctx.beginPath();
      ctx.rect(
        playerEntity.x,
        playerEntity.y,
        playerEntity.width,
        playerEntity.height
      );
      ctx.fill();

      // Create floor
      ctx.strokeStyle = "#202830";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(0, gameHeight - floorLevel);
      ctx.lineTo(gameWidth, gameHeight - floorLevel);
      ctx.stroke();

      // Draw level text on screen
      ctx.font = "24px Arial";
      ctx.fillText(levels[gameState.screen].levelText, 10, 50);

      // call update when the browser is ready to draw again
      window.requestAnimationFrame(eventLoop);
    };

    window.requestAnimationFrame(eventLoop);
  }, []);

  return <canvas />;
};

export default GameSpace;
