import { ghostFrames, canvasContext, gameStructure, pacman } from "./game.js";
import { GameStructure } from "./gameStructure.js";

class Ghost {
	randomTargetsForGhost = [
		{ x: 1 * gameStructure.oneBlockSize, y: 1 * gameStructure.oneBlockSize },
		{
			x: 1 * gameStructure.oneBlockSize,
			y: (gameStructure.map.length - 2) * gameStructure.oneBlockSize,
		},
		{
			x: (gameStructure.map[0].length - 2) * gameStructure.oneBlockSize,
			y: 1 * gameStructure.oneBlockSize,
		},
		{
			x: (gameStructure.map[0].length - 2) * gameStructure.oneBlockSize,
			y: (gameStructure.map.length - 2) * gameStructure.oneBlockSize,
		},
	];

	constructor(
		x,
		y,
		width,
		height,
		speed,
		imageX,
		imageY,
		imageWidth,
		imageHeight,
		range
	) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.speed = speed;
		this.direction = GameStructure.DIRECTION_RIGHT;
		this.imageX = imageX;
		this.imageY = imageY;
		this.imageWidth = imageWidth;
		this.imageHeight = imageHeight;
		this.range = range;
		this.randomTargetIndex = parseInt(
			Math.random() * this.randomTargetsForGhost.length
		);

		setInterval(() => {
			this.changeRandomDirection();
		}, 10000);
	}

	changeRandomDirection() {
		let addition = 1;
		this.randomTargetIndex += addition;
		this.randomTargetIndex = this.randomTargetIndex % 4;
	}

	moveProcess() {
		if (this.isInRangeOfPacman()) {
			this.target = pacman;
		} else {
			this.target = this.randomTargetsForGhost[this.randomTargetIndex];
		}

		this.changeDirectionIfPossible();
		this.moveForwards();
		if (this.checkCollisions()) {
			this.moveBackwards();
			return;
		}
	}

	calculateNewDirecion(map, destX, destY) {
		let mp = [];
		for (let i = 0; i < map.length; i++) {
			mp[i] = map[i].slice();
		}

		let queue = [
			{
				x: this.getMapX(),
				y: this.getMapY(),
				rightX: this.getMapXRightSide(),
				rightY: this.getMapYRightSide(),
				moves: [],
			},
		];
		while (queue.length > 0) {
			let poped = queue.shift();
			if (poped.x == destX && poped.y == destY) {
				return poped.moves[0];
			} else {
				mp[poped.y][poped.x] = 1;
				let neighborList = this.addNeighbors(poped, mp);
				for (let i = 0; i < neighborList.length; i++) {
					queue.push(neighborList[i]);
				}
			}
		}

		return 1;
	}

	addNeighbors(poped, mp) {
		let queue = [];
		let numOfRows = mp.length;
		let numOfColumns = mp[0].length;

		if (
			poped.x - 1 >= 0 &&
			poped.x - 1 < numOfRows &&
			mp[poped.y][poped.x - 1] != 1
		) {
			let tempMoves = poped.moves.slice();
			tempMoves.push(GameStructure.DIRECTION_LEFT);
			queue.push({ x: poped.x - 1, y: poped.y, moves: tempMoves });
		}
		if (
			poped.x + 1 >= 0 &&
			poped.x + 1 < numOfRows &&
			mp[poped.y][poped.x + 1] != 1
		) {
			let tempMoves = poped.moves.slice();
			tempMoves.push(GameStructure.DIRECTION_RIGHT);
			queue.push({ x: poped.x + 1, y: poped.y, moves: tempMoves });
		}
		if (
			poped.y - 1 >= 0 &&
			poped.y - 1 < numOfColumns &&
			mp[poped.y - 1][poped.x] != 1
		) {
			let tempMoves = poped.moves.slice();
			tempMoves.push(GameStructure.DIRECTION_UP);
			queue.push({ x: poped.x, y: poped.y - 1, moves: tempMoves });
		}
		if (
			poped.y + 1 >= 0 &&
			poped.y + 1 < numOfColumns &&
			mp[poped.y + 1][poped.x] != 1
		) {
			let tempMoves = poped.moves.slice();
			tempMoves.push(GameStructure.DIRECTION_BOTTOM);
			queue.push({ x: poped.x, y: poped.y + 1, moves: tempMoves });
		}
		return queue;
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

	checkCollisions() {
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

	isInRangeOfPacman() {
		let xDistance = Math.abs(pacman.getMapX() - this.getMapX());
		let yDistance = Math.abs(pacman.getMapY() - this.getMapY());

		if (
			Math.sqrt(xDistance * xDistance + yDistance * yDistance) <= this.range
		) {
			return true;
		}

		return false;
	}

	changeDirectionIfPossible() {
		let tempDirection = this.direction;
		this.direction = this.calculateNewDirection(
			gameStructure.map,
			parseInt(this.target.x / gameStructure.oneBlockSize),
			parseInt(this.target.y / gameStructure.oneBlockSize)
		);
		if (typeof this.direction == "undefined") {
			this.direction = tempDirection;
			return;
		}
		if (
			this.getMapY() != this.getMapYRightSide() &&
			(this.direction == GameStructure.DIRECTION_LEFT ||
				this.direction == GameStructure.DIRECTION_RIGHT)
		) {
			this.direction = GameStructure.DIRECTION_UP;
		}
		if (
			this.getMapX() != this.getMapXRightSide() &&
			this.direction == GameStructure.DIRECTION_UP
		) {
			this.direction = GameStructure.DIRECTION_LEFT;
		}
		this.moveForwards();
		if (this.checkCollisions()) {
			this.moveBackwards();
			this.direction = tempDirection;
		} else {
			this.moveBackwards();
		}
		console.log(this.direction);
	}

	calculateNewDirection(map, destX, destY) {
		let mp = [];
		for (let i = 0; i < map.length; i++) {
			mp[i] = map[i].slice();
		}

		let queue = [
			{
				x: this.getMapX(),
				y: this.getMapY(),
				rightX: this.getMapXRightSide(),
				rightY: this.getMapYRightSide(),
				moves: [],
			},
		];
		while (queue.length > 0) {
			let poped = queue.shift();
			if (poped.x == destX && poped.y == destY) {
				return poped.moves[0];
			} else {
				mp[poped.y][poped.x] = 1;
				let neighborList = this.addNeighbors(poped, mp);
				for (let i = 0; i < neighborList.length; i++) {
					queue.push(neighborList[i]);
				}
			}
		}

		return 1; // direction
	}

	changeAnimation() {
		this.currentFrame =
			this.currentFrame == this.frameCount ? 1 : this.currentFrame + 1;
	}

	draw() {
		canvasContext.save();
		canvasContext.drawImage(
			ghostFrames,
			this.imageX,
			this.imageY,
			this.imageWidth,
			this.imageHeight,
			this.x,
			this.y,
			this.width,
			this.height
		);
		canvasContext.restore();
		// canvasContext.beginPath();
		// canvasContext.strokeStyle = "red";
		// canvasContext.arc(
		// 	this.x + gameStructure.oneBlockSize / 2,
		// 	this.y + gameStructure.oneBlockSize / 2,
		// 	this.range * gameStructure.oneBlockSize,
		// 	0,
		// 	2 * Math.PI
		// );
		// canvasContext.stroke();
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

export { Ghost };
