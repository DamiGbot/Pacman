import { Pacman } from "./pacman.js";
import { GameStructure } from "./gameStructure.js";

const canvas = document.getElementById("canvas");
export const canvasContext = canvas.getContext("2d");

export const animationsFrames = document.getElementById("animations");
const ghostFrames = document.getElementById("ghost");

const gameStructure = new GameStructure();

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
};

let draw = () => {
	gameStructure.createWall(0, 0, canvas.width, canvas.height, "black");
	drawWalls();

	pacman.draw();
};

let gameInterval = setInterval(gameLoop, 1000 / gameStructure.fps);

const drawWalls = () => {
	let startRow = 0;
	let endRow = gameStructure.map.length - 1;
	let startColumn = 0;
	let endColumn = gameStructure.map[0].length - 1;

	while (startRow <= endRow && startColumn <= endColumn) {
		for (var idx = startColumn; idx <= endColumn; idx++) {
			gameStructure.drawWall(startRow, idx);
			gameStructure.breakWalls(startRow, idx);
		}

		for (var idx = startRow + 1; idx <= endRow; idx++) {
			gameStructure.drawWall(idx, endColumn);
			gameStructure.breakWalls(idx, endColumn);
		}

		for (var idx = endColumn - 1; idx >= startColumn; idx--) {
			if (startRow == endRow) break;

			gameStructure.drawWall(endRow, idx);
			gameStructure.breakWalls(endRow, idx);
		}

		for (var idx = endRow - 1; idx > startRow; idx--) {
			if (startColumn == endColumn) break;

			gameStructure.drawWall(idx, startColumn);
			gameStructure.breakWalls(idx, startColumn);
		}

		startColumn++;
		startRow++;
		endColumn--;
		endRow--;
	}

	// clearInterval(gameInterval);
};

createNewPacman();
gameLoop();
