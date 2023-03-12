import { GameStructure } from "./gameStructure.js";

const canvas = document.getElementById("canvas");
export const canvasContext = canvas.getContext("2d");

const animationsFrames = document.getElementById("animations");
const ghostFrames = document.getElementById("ghost");

const gameStructure = new GameStructure();

let gameLoop = () => {
	update();
	draw();
};

let update = () => {
	// Do something
};

let draw = () => {
	// Do something
	gameStructure.createWall(0, 0, canvas.width, canvas.height, "black");
	drawWalls();
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

	clearInterval(gameInterval);
};

// createWall(0, 0, 200, 200, "red");
// createWall(10, 10, 200 - 10, 200 - 20, "black");

// createWall(
// 	50,
// 	50,
// 	GameVariable.wallSpaceWidth + GameVariable.wallOffset,
// 	GameVariable.wallSpaceWidth,
// 	GameVariable.wallInnerColor
// );
