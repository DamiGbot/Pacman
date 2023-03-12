import { GameStructure } from "./gameStructure";

class Pacman {
	constructor(x, y, width, height, speed) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.speed = speed;
		this.direction = GameStructure.DIRECTION_LEFT;
	}

	moveProcess() {
		this.checkCollision();
		this.moveForwards();
		if (this.checkCollision()) this.moveBackwards();
	}

	eat() {}

	moveBackwards() {}

	moveForwards() {}

	checkCollision() {}

	checkGhostCollision() {}

	changeDirectionIfPossible() {}

	changeAnimation() {}

	draw() {}
}
