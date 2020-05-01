import React, { useEffect } from "react";
import Entity from "./Entities";
import levels from "./Levels";
//This is where Graham learns me some knawledge
const GameSpace = (props) => {
  useEffect(() => {
    const ctx = document.querySelector("canvas").getContext("2d");
    const gameHeight = 720;
    const gameWidth = 1024;
    const floorLevel = 64;

    ctx.canvas.height = gameHeight;
    ctx.canvas.width = gameWidth;

    // Define the player entity
    const player = new Entity({
      height: 45,
      jumping: true,
      width: 30,
      x: 144,
      xV: 0,
      y: gameHeight - floorLevel,
      yV: 0,
    });

    // Pull assets off of the page
    const assets = {
      mountains: document.getElementById("mountains"),
      moon: document.getElementById("moon"),
      universe: document.getElementById("universe"),
    };

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

    const playerMovement = () => {
      const currentLevelMovement = levels[gameState.screen].movementValues;

      // The player jumps
      if (gameController.up && !player.jumping) {
        player.yV -= currentLevelMovement.yVJump;
        player.jumping = true;
      }

      // The player moves left
      if (gameController.left) {
        player.xV -= currentLevelMovement.xV;
      }

      // The player moves right
      if (gameController.right) {
        player.xV += currentLevelMovement.xV;
      }

      // gravity
      player.yV += currentLevelMovement.gravity;

      // Account for players velocity
      player.x += player.xV;
      player.y += player.yV;

      // Apply friction to the players velocity
      player.xV *= currentLevelMovement.xVFriction;
      player.yV *= currentLevelMovement.yVFriction;
    };

    const crashDetection = () => {
      // if player is falling below floor line, reduce their velocity to zero
      if (player.y > gameHeight - floorLevel - player.height) {
        player.jumping = false;
        player.y = gameHeight - floorLevel - player.height;
        player.yV = 0;
      }

      // if player is going off the left of the screen
      if (player.x < 0) {
        player.x = 0;
        player.xV = 0;
      } else if (
        gameState.screen === levels.length - 1 &&
        player.x > gameWidth - player.width
      ) {
        player.x = gameWidth - player.width;
        player.xV = 0;
      } else if (player.x > gameWidth) {
        // if player goes past right boundary
        player.x = -player.width;
        gameState.screen++;
        console.log(`Screen: ${gameState.screen}`);
      }
    };

    // Define the games internal state
    const gameState = {
      screen: 0,
    };

    const eventLoop = () => {
      // Run the player movement logic
      playerMovement();

      // Run the crash detection logic for the walls and floor
      crashDetection();

      ctx.drawImage(
        assets[levels[gameState.screen].backgroundImage],
        0,
        0,
        gameWidth,
        gameHeight
      );

      // Render the palyer on screen
      player.render(ctx, "#1EB980");

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
