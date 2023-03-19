import { animationsFrames, canvasContext } from "./game.js";
import { GameStructure } from "./gameStructure.js";

class Pacman {
	constructor(x, y, width, height, speed) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.speed = speed;
		this.direction = GameStructure.DIRECTION_RIGHT;
		this.currentFrame = 1;
		this.frameCount = 7;

		this.gameStructure = new GameStructure();

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

	eat() {}

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
			this.gameStructure.map[
				parseInt(this.y / this.gameStructure.oneBlockSize)
			][parseInt(this.x / this.gameStructure.oneBlockSize)] == 1 ||
			this.gameStructure.map[
				parseInt(this.y / this.gameStructure.oneBlockSize + 0.9999)
			][parseInt(this.x / this.gameStructure.oneBlockSize)] == 1 ||
			this.gameStructure.map[
				parseInt(this.y / this.gameStructure.oneBlockSize)
			][parseInt(this.x / this.gameStructure.oneBlockSize + 0.9999)] == 1 ||
			this.gameStructure.map[
				parseInt(this.y / this.gameStructure.oneBlockSize + 0.9999)
			][parseInt(this.x / this.gameStructure.oneBlockSize + 0.9999)] == 1
		) {
			isCollided = true;
		}
		return isCollided;
	}

	checkGhostCollision() {}

	changeDirectionIfPossible() {}

	changeAnimation() {
		this.currentFrame =
			this.currentFrame == this.frameCount ? 1 : this.currentFrame + 1;
	}

	draw() {
		canvasContext.save();
		canvasContext.translate(
			this.x + this.gameStructure.oneBlockSize / 2,
			this.y + this.gameStructure.oneBlockSize / 2
		);

		canvasContext.rotate((this.direction * 90 * Math.PI) / 180);

		canvasContext.translate(
			-this.x - this.gameStructure.oneBlockSize / 2,
			-this.y - this.gameStructure.oneBlockSize / 2
		);

		canvasContext.drawImage(
			animationsFrames,
			(this.currentFrame - 1) / this.gameStructure.oneBlockSize,
			0,
			this.gameStructure.oneBlockSize,
			this.gameStructure.oneBlockSize,
			this.x,
			this.y,
			this.width,
			this.height
		);

		canvasContext.restore();
	}

	getMapX() {
		let mapX = parseInt(this.x / this.gameStructure.oneBlockSize);
		return mapX;
	}

	getMapY() {
		let mapY = parseInt(this.y / this.gameStructure.oneBlockSize);

		return mapY;
	}

	getMapXRightSide() {
		let mapX = parseInt(
			(this.x * 0.99 + this.gameStructure.oneBlockSize) /
				this.gameStructure.oneBlockSize
		);
		return mapX;
	}

	getMapYRightSide() {
		let mapY = parseInt(
			(this.y * 0.99 + this.gameStructure.oneBlockSize) /
				this.gameStructure.oneBlockSize
		);
		return mapY;
	}
}

export { Pacman };
