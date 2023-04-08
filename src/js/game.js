import { Pacman } from "./pacman.js";
import { GameStructure } from "./gameStructure.js";
import { Ghost } from "./ghost.js";

const canvas = document.getElementById("canvas");
export const canvasContext = canvas.getContext("2d");

export const animationsFrames = document.getElementById("animations");
export const ghostFrames = document.getElementById("ghost");

export const gameStructure = new GameStructure();

export let pacman;
let ghosts = [];
let foodCount = 220;

let ghostLocations = [
	{ x: 0, y: 0 },
	{ x: 176, y: 0 },
	{ x: 0, y: 121 },
	{ x: 176, y: 121 },
];
let lives = 3;

let createNewPacman = () => {
	pacman = new Pacman(
		gameStructure.oneBlockSize,
		gameStructure.oneBlockSize,
		gameStructure.oneBlockSize,
		gameStructure.oneBlockSize,
		gameStructure.oneBlockSize / 5
	);
};

let createGhosts = () => {
	ghosts = [];
	for (let i = 0; i < gameStructure.ghostCount; i++) {
		let newGhost = new Ghost(
			9 * gameStructure.oneBlockSize +
				(i % 2 == 0 ? 0 : 1) * gameStructure.oneBlockSize,
			10 * gameStructure.oneBlockSize +
				(i % 2 == 0 ? 0 : 1) * gameStructure.oneBlockSize,
			gameStructure.oneBlockSize,
			gameStructure.oneBlockSize,
			pacman.speed / 2,
			ghostLocations[i % 4].x,
			ghostLocations[i % 4].y,
			124,
			116,
			6 + i
		);
		ghosts.push(newGhost);
	}
};

let drawRemainingLives = () => {
	canvasContext.font = "20px Emulogic";
	canvasContext.fillStyle = "white";
	canvasContext.fillText(
		"Lives: ",
		220,
		gameStructure.oneBlockSize * (gameStructure.map.length + 1)
	);

	for (let i = 0; i < lives; i++) {
		canvasContext.drawImage(
			animationsFrames,
			2 * gameStructure.oneBlockSize,
			0,
			gameStructure.oneBlockSize,
			gameStructure.oneBlockSize,
			350 + i * gameStructure.oneBlockSize,
			gameStructure.oneBlockSize * gameStructure.map.length + 2,
			gameStructure.oneBlockSize,
			gameStructure.oneBlockSize
		);
	}
};

let gameLoop = () => {
	draw();
	update();
	for (let i = 0; i < ghosts.length; i++) {
		ghosts[i].moveProcess();
	}
};

let restartPacmanAndGhosts = () => {
	createNewPacman();
	createGhosts();
};

let onGhostCollision = () => {
	lives--;
	restartPacmanAndGhosts();
	if (lives == 0) {
		gameOver();
	}
};

let gameOver = () => {
	drawGameOver();
	clearInterval(gameInterval);
};

let drawGameOver = () => {
	canvasContext.font = "20px emulogic";
	canvasContext.fillStyle = "white";
	canvasContext.fillText("Game Over!", 150, 200);
};

let drawWin = () => {
	canvasContext.font = "20px emulogic";
	canvasContext.fillStyle = "white";
	canvasContext.fillText("You Won!", 150, 200);
};

let update = () => {
	pacman.moveProcess();
	pacman.eat();
	updateGhosts();
	if (pacman.checkGhostCollision(ghosts)) {
		onGhostCollision();
	}

	if (gameStructure.score >= foodCount) {
		drawWin();
		clearInterval(gameInterval);
	}
};

let updateGhosts = () => {
	for (let i = 0; i < ghosts.length; i++) {
		ghosts[i].moveProcess();
	}
};

let drawGhosts = () => {
	for (let i = 0; i < ghosts.length; i++) {
		ghosts[i].draw();
	}
};

let draw = () => {
	gameStructure.createWall(0, 0, canvas.width, canvas.height, "black");
	drawLayout();

	pacman.draw();
	gameStructure.drawScore();
	drawGhosts();
	drawRemainingLives();
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
createGhosts();

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
