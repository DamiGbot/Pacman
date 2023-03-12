import { canvasContext } from "./game.js";

class GameStructure {
	fps = 30;
	oneBlockSize = 20;
	wallSpaceWidth = this.oneBlockSize / 1.6;
	wallOffset = (this.oneBlockSize - this.wallSpaceWidth) / 2;
	wallInnerColor = "black";
	wallColor = "#342dca";
	static DIRECTION_RIGHT = 4;
	static DIRECTION_UP = 3;
	static DIRECTION_LEFT = 2;
	static DIRECTION_BOTTOM = 1;

	map = [
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
		[1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
		[1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
		[1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
		[1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
		[1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
		[1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1],
		[0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
		[1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1],
		[0, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 0], // changes to first and last col
		[1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1],
		[0, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0],
		[0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
		[1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1],
		[1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
		[1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
		[1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
		[1, 1, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 1, 1],
		[1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
		[1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1],
		[1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	];

	drawWall(row, col) {
		if (this.map[row][col] == 1)
			this.createWall(
				col * this.oneBlockSize,
				row * this.oneBlockSize,
				this.oneBlockSize,
				this.oneBlockSize,
				this.wallColor
			);
	}

	createWall(x, y, width, height, color) {
		canvasContext.fillStyle = color;
		canvasContext.fillRect(x, y, width, height);
	}

	breakWalls(row, col) {
		if (col > 0 && this.map[row][col - 1] == 1) {
			this.createWall(
				col * this.oneBlockSize,
				row * this.oneBlockSize + this.wallOffset,
				this.wallSpaceWidth + this.wallOffset,
				this.wallSpaceWidth,
				this.wallInnerColor
			);
		}

		if (col < this.map[0].length - 1 && this.map[row][col + 1] == 1) {
			this.createWall(
				col * this.oneBlockSize + this.wallOffset,
				row * this.oneBlockSize + this.wallOffset,
				this.wallSpaceWidth + this.wallOffset,
				this.wallSpaceWidth,
				this.wallInnerColor
			);
		}

		if (row > 0 && this.map[row - 1][col] == 1) {
			this.createWall(
				col * this.oneBlockSize + this.wallOffset,
				row * this.oneBlockSize,
				this.wallSpaceWidth,
				this.wallSpaceWidth + this.wallOffset,
				this.wallInnerColor
			);
		}

		if (row < this.map.length - 1 && this.map[row + 1][col] == 1) {
			this.createWall(
				col * this.oneBlockSize + this.wallOffset,
				row * this.oneBlockSize + this.wallOffset,
				this.wallSpaceWidth,
				this.wallSpaceWidth + this.wallOffset,
				this.wallInnerColor
			);
		}
	}
}

export { GameStructure };