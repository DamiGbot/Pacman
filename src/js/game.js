import { Pacman } from "./pacman.js";
import { GameStructure } from "./gameStructure.js";

const canvas = document.getElementById("canvas");
export const canvasContext = canvas.getContext("2d");

export const animationsFrames = document.getElementById("animations");
const ghostFrames = document.getElementById("ghost");

export const gameStructure = new GameStructure();

let pacman;

const createNewPacman = () => {
	pacman = new Pacman(
		gameStructure.oneBlockSize,
		gameStructure.oneBlockSize,
		gameStructure.oneBlockSize,
		gameStructure.oneBlockSize,
		gameStructure.oneBlockSize / 5
	);
};

let gameLoop = () => {
	update();
	draw();
};

let update = () => {
	pacman.moveProcess();
	pacman.eat();
};

let draw = () => {
	gameStructure.createWall(0, 0, canvas.width, canvas.height, "black");
	drawLayout();

	pacman.draw();
	gameStructure.drawScore();
};

let gameInterval = setInterval(gameLoop, 1000 / gameStructure.fps);

const drawLayout = () => {
	let startRow = 0;
	let endRow = gameStructure.map.length - 1;
	let startColumn = 0;
	let endColumn = gameStructure.map[0].length - 1;

	while (startRow <= endRow && startColumn <= endColumn) {
		for (var idx = startColumn; idx <= endColumn; idx++) {
			gameStructure.drawWall(startRow, idx);
			gameStructure.breakWalls(startRow, idx);

			gameStructure.drawFoods(startRow, idx);
		}

		for (var idx = startRow + 1; idx <= endRow; idx++) {
			gameStructure.drawWall(idx, endColumn);
			gameStructure.breakWalls(idx, endColumn);

			gameStructure.drawFoods(idx, endColumn);
		}

		for (var idx = endColumn - 1; idx >= startColumn; idx--) {
			if (startRow == endRow) break;

			gameStructure.drawWall(endRow, idx);
			gameStructure.breakWalls(endRow, idx);

			gameStructure.drawFoods(endRow, idx);
		}

		for (var idx = endRow - 1; idx > startRow; idx--) {
			if (startColumn == endColumn) break;

			gameStructure.drawWall(idx, startColumn);
			gameStructure.breakWalls(idx, startColumn);

			gameStructure.drawFoods(idx, startColumn);
		}

		startColumn++;
		startRow++;
		endColumn--;
		endRow--;
	}
};

createNewPacman();
gameLoop();

window.addEventListener("keydown", (event) => {
	let currKey = event.key;

	if (currKey == "ArrowUp" || currKey == "w") {
		pacman.nextdirection = GameStructure.DIRECTION_UP;
	} else if (currKey == "ArrowDown" || currKey == "s") {
		pacman.nextdirection = GameStructure.DIRECTION_BOTTOM;
	} else if (currKey == "ArrowRight" || currKey == "d") {
		pacman.nextdirection = GameStructure.DIRECTION_RIGHT;
	} else if (currKey == "ArrowLeft" || currKey == "a") {
		pacman.nextdirection = GameStructure.DIRECTION_LEFT;
	}
});
