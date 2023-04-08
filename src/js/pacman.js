import { animationsFrames, canvasContext, gameStructure } from "./game.js";
import { GameStructure } from "./gameStructure.js";

class Pacman {
	constructor(x, y, width, height, speed) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.speed = speed;
		this.direction = GameStructure.DIRECTION_RIGHT;
		this.nextdirection = this.direction;
		this.currentFrame = 1;
		this.frameCount = 7;
		this.foodToReplace = [];

		setInterval(() => {
			this.changeAnimation();
		}, 100);
	}

	moveProcess() {
		this.changeDirectionIfPossible();
		this.moveForwards();
		if (this.checkCollision()) {
			this.moveBackwards();
			return;
		}
	}

	eat() {
		for (var row = 0; row < gameStructure.map.length; row++) {
			for (var col = 0; col < gameStructure.map[row].length; col++) {
				if (
					gameStructure.map[row][col] == 2 &&
					this.getMapX() == col &&
					this.getMapY() == row
				) {
					gameStructure.map[row][col] = 3;
					this.foodToReplace.push([row, col]);
					gameStructure.score++;
				}
			}
		}
	}

	moveBackwards() {
		switch (this.direction) {
			case GameStructure.DIRECTION_LEFT:
				this.x += this.speed;
				break;

			case GameStructure.DIRECTION_RIGHT:
				this.x -= this.speed;
				break;

			case GameStructure.DIRECTION_UP:
				this.y += this.speed;
				break;

			case GameStructure.DIRECTION_BOTTOM:
				this.y -= this.speed;
				break;
		}
	}

	moveForwards() {
		switch (this.direction) {
			case GameStructure.DIRECTION_LEFT:
				this.x -= this.speed;
				break;

			case GameStructure.DIRECTION_RIGHT:
				this.x += this.speed;
				break;

			case GameStructure.DIRECTION_UP:
				this.y -= this.speed;
				break;

			case GameStructure.DIRECTION_BOTTOM:
				this.y += this.speed;
				break;
		}
	}

	checkCollision() {
		let isCollided = false;
		if (
			gameStructure.map[parseInt(this.y / gameStructure.oneBlockSize)][
				parseInt(this.x / gameStructure.oneBlockSize)
			] == 1 ||
			gameStructure.map[parseInt(this.y / gameStructure.oneBlockSize + 0.9999)][
				parseInt(this.x / gameStructure.oneBlockSize)
			] == 1 ||
			gameStructure.map[parseInt(this.y / gameStructure.oneBlockSize)][
				parseInt(this.x / gameStructure.oneBlockSize + 0.9999)
			] == 1 ||
			gameStructure.map[parseInt(this.y / gameStructure.oneBlockSize + 0.9999)][
				parseInt(this.x / gameStructure.oneBlockSize + 0.9999)
			] == 1
		) {
			isCollided = true;
		}
		return isCollided;
	}

	checkGhostCollision(ghosts) {
		for (let i = 0; i < ghosts.length; i++) {
			let ghost = ghosts[i];
			if (
				ghost.getMapX() == this.getMapX() &&
				ghost.getMapY() == this.getMapY()
			) {
				return true;
			}
		}
		return false;
	}

	changeDirectionIfPossible() {
		if (this.nextdirection == this.direction) return;

		let currDirection = this.direction;
		this.direction = this.nextdirection;

		this.moveForwards();
		if (this.checkCollision()) {
			this.moveBackwards();
			this.direction = currDirection;
		} else {
			this.moveBackwards();
		}
	}

	changeAnimation() {
		this.currentFrame =
			this.currentFrame == this.frameCount ? 1 : this.currentFrame + 1;
	}

	draw() {
		canvasContext.save();
		canvasContext.translate(
			this.x + gameStructure.oneBlockSize / 2,
			this.y + gameStructure.oneBlockSize / 2
		);

		canvasContext.rotate((this.direction * 90 * Math.PI) / 180);

		canvasContext.translate(
			-this.x - gameStructure.oneBlockSize / 2,
			-this.y - gameStructure.oneBlockSize / 2
		);

		canvasContext.drawImage(
			animationsFrames,
			(this.currentFrame - 1) / gameStructure.oneBlockSize,
			0,
			gameStructure.oneBlockSize,
			gameStructure.oneBlockSize,
			this.x,
			this.y,
			this.width,
			this.height
		);

		canvasContext.restore();
	}

	getMapX() {
		let mapX = parseInt(this.x / gameStructure.oneBlockSize);
		return mapX;
	}

	getMapY() {
		let mapY = parseInt(this.y / gameStructure.oneBlockSize);

		return mapY;
	}

	getMapXRightSide() {
		let mapX = parseInt(
			(this.x * 0.99 + gameStructure.oneBlockSize) / gameStructure.oneBlockSize
		);
		return mapX;
	}

	getMapYRightSide() {
		let mapY = parseInt(
			(this.y * 0.99 + gameStructure.oneBlockSize) / gameStructure.oneBlockSize
		);
		return mapY;
	}
}

export { Pacman };
