/*

 __     __            __                        __      __           
|  \   |  \          |  \                      |  \    |  \          
| $$   | $$  ______  | $$  ______   _______   _| $$_    \$$ _______  
| $$   | $$ |      \ | $$ /      \ |       \ |   $$ \  |  \|       \ 
 \$$\ /  $$  \$$$$$$\| $$|  $$$$$$\| $$$$$$$\ \$$$$$$  | $$| $$$$$$$\
  \$$\  $$  /      $$| $$| $$    $$| $$  | $$  | $$ __ | $$| $$  | $$
   \$$ $$  |  $$$$$$$| $$| $$$$$$$$| $$  | $$  | $$|  \| $$| $$  | $$
    \$$$    \$$    $$| $$ \$$     \| $$  | $$   \$$  $$| $$| $$  | $$
     \$      \$$$$$$$ \$$  \$$$$$$$ \$$   \$$    \$$$$  \$$ \$$   \$$
                                                                     

	Auteur : Valentin ChÃ©neau

*/

/*====================== GLOBAL VARs ====================*/

// canvas
var canvasID = "myCanvas";
var CANVAS_WIDTH = 510;
var CANVAS_HEIGHT = 510;
var canvas = document.getElementById(canvasID);
var ctx = canvas.getContext("2d");

// game grid
var GRID_WIDTH = 30;
var GRID_HEIGHT = 30;
var WALL_WIDTH = 3;
var numRows = CANVAS_WIDTH/GRID_HEIGHT;
var numCols = CANVAS_HEIGHT/GRID_WIDTH;

// colors for UI & Pacman
var BG_COLOR = "#111111";
var BORDER_COLOR = "#0000FF";
var BEAN_COLOR = "#E9967A";
var PACMAN_COLOR = "yellow";

// colors for ghost
var RED = "red";
var PINK = "#ff9cce";
var CYAN = "#00ffde";
var ORANGE = "#ffb847";
var WEAK_COLOR = "#0031ff";
var BLINKING_COLOR = "white";

// size of sprites
var NORMAL_BEAN_RADIUS = 3;
var POWER_BEAN_RADIUS = 6;
var PACMAN_RADIUS = 10;
var GHOST_RADIUS = 10;

// directions
var UP = 1;
var DOWN = 2;
var LEFT = 3;
var RIGHT = 4;

// game parameters
var intervalId;
var restartTimer = 0;
var timerDelay = 80;
var speed = 5;
var score = 0;
var lives = [];
var MAX_LIFE = 3;
var life = MAX_LIFE;
var weakBonus = 200;
var MAX_BEANS = 147;
var beansLeft = MAX_BEANS;
var weakCounter;
var WEAK_DURATION = 10000/timerDelay;

//bean cases
var NORMAL_BEAN = 1
var POWER_BEAN = 2;

//spirtes instances
var welcomePacman;
var welcomeBlinky;
var welcomeInky;
var mrPacman;
var blinky;
var inky;
var pinky;
var clyde;
var ghosts;

//game state and map
var gameOn = false;
var gamePaused = false;
var maze = new Array(CANVAS_HEIGHT/GRID_HEIGHT);
var mazeContent = [
//row1
[LEFT_TOP, TOP_ONLY, TOP_ONLY, TOP_ONLY, TOP_ONLY,
TOP_ONLY, TOP_ONLY, TOP_ONLY, TOP_ONLY, TOP_ONLY,
TOP_ONLY, TOP_ONLY, TOP_ONLY, TOP_ONLY, TOP_ONLY,
TOP_ONLY, RIGHT_TOP],
//row2
[LEFT_BOTTOM, BOTTOM_ONLY, BOTTOM_ONLY, BOTTOM_ONLY, BOTTOM_ONLY,
BOTTOM_ONLY, BOTTOM_ONLY, BOTTOM_ONLY, BOTTOM_ONLY, BOTTOM_ONLY,
BOTTOM_ONLY, BOTTOM_ONLY, BOTTOM_ONLY, BOTTOM_ONLY, BOTTOM_ONLY,
BOTTOM_ONLY, RIGHT_BOTTOM],
//row3
[LEFT_TOP, TOP_BOTTOM, TOP_BOTTOM, TOP_ONLY, TOP_BOTTOM,
TOP_BOTTOM, RIGHT_TOP, LEFT_TOP, TOP_ONLY, RIGHT_TOP,
LEFT_TOP, TOP_BOTTOM, TOP_BOTTOM, TOP_ONLY, TOP_BOTTOM, 
TOP_BOTTOM, RIGHT_TOP],
//row4
[LEFT_RIGHT, BOTTOM_LEFT_TOP, TOP_RIGHT_BOTTOM, LEFT_RIGHT, BOTTOM_LEFT_TOP, 
TOP_RIGHT_BOTTOM, LEFT_RIGHT, LEFT_BOTTOM, BOTTOM_ONLY, RIGHT_BOTTOM,
LEFT_RIGHT, BOTTOM_LEFT_TOP, TOP_RIGHT_BOTTOM, LEFT_RIGHT, BOTTOM_LEFT_TOP,
TOP_RIGHT_BOTTOM, LEFT_RIGHT],
//row5
[LEFT_ONLY, TOP_BOTTOM, TOP_BOTTOM, EMPTY_GRID, TOP_BOTTOM, 
TOP_ONLY, BOTTOM_ONLY, TOP_BOTTOM, TOP_BOTTOM, TOP_BOTTOM,
BOTTOM_ONLY, TOP_ONLY, TOP_BOTTOM, EMPTY_GRID, TOP_BOTTOM,
TOP_BOTTOM, RIGHT_ONLY],
//row6
[LEFT_RIGHT, BOTTOM_LEFT_TOP, TOP_RIGHT_BOTTOM, LEFT_RIGHT, LEFT_TOP_RIGHT,
LEFT_RIGHT, BOTTOM_LEFT_TOP, TOP_BOTTOM, TOP_ONLY, TOP_BOTTOM,
TOP_RIGHT_BOTTOM, LEFT_RIGHT, LEFT_TOP_RIGHT, LEFT_RIGHT, BOTTOM_LEFT_TOP, 
TOP_RIGHT_BOTTOM, LEFT_RIGHT],
//row7
[LEFT_BOTTOM, TOP_BOTTOM, TOP_BOTTOM, RIGHT_ONLY, LEFT_RIGHT, 
LEFT_BOTTOM, TOP_BOTTOM, RIGHT_TOP, LEFT_RIGHT, LEFT_TOP, 
TOP_BOTTOM, RIGHT_BOTTOM, LEFT_RIGHT, LEFT_ONLY, TOP_BOTTOM,
TOP_BOTTOM, RIGHT_BOTTOM],
//row8
[TOP_ONLY, TOP_ONLY, RIGHT_TOP, LEFT_RIGHT, LEFT_ONLY,
TOP_BOTTOM, TOP_RIGHT_BOTTOM, LEFT_RIGHT, RIGHT_BOTTOM_LEFT, LEFT_RIGHT, 
BOTTOM_LEFT_TOP, TOP_BOTTOM, RIGHT_ONLY, LEFT_RIGHT, LEFT_TOP,
TOP_ONLY, TOP_ONLY],
//row9
[BOTTOM_ONLY, BOTTOM_ONLY, RIGHT_BOTTOM, LEFT_RIGHT, RIGHT_BOTTOM_LEFT,
LEFT_TOP, TOP_BOTTOM, BOTTOM_ONLY, TOP_ONLY, BOTTOM_ONLY, 
TOP_BOTTOM, RIGHT_TOP, RIGHT_BOTTOM_LEFT, LEFT_RIGHT, LEFT_BOTTOM,
BOTTOM_ONLY, BOTTOM_ONLY],
//row10
[BOTTOM_LEFT_TOP, TOP_BOTTOM, TOP_BOTTOM, EMPTY_GRID, TOP_BOTTOM, 
RIGHT_ONLY, LEFT_TOP, TOP_ONLY, EMPTY_GRID, TOP_ONLY,
RIGHT_TOP, LEFT_ONLY, TOP_BOTTOM, EMPTY_GRID, TOP_BOTTOM,
TOP_BOTTOM, TOP_RIGHT_BOTTOM],
//row11
[TOP_ONLY, TOP_ONLY, RIGHT_TOP, LEFT_RIGHT, LEFT_TOP_RIGHT,
LEFT_RIGHT, LEFT_BOTTOM, BOTTOM_ONLY, EMPTY_GRID, BOTTOM_ONLY, 
RIGHT_BOTTOM, LEFT_RIGHT, LEFT_TOP_RIGHT, LEFT_RIGHT, LEFT_TOP,
TOP_ONLY, TOP_ONLY],
//row12
[BOTTOM_ONLY, BOTTOM_ONLY, RIGHT_BOTTOM, LEFT_RIGHT, RIGHT_BOTTOM_LEFT, 
LEFT_ONLY, TOP_BOTTOM, TOP_BOTTOM, BOTTOM_ONLY, TOP_BOTTOM,
TOP_BOTTOM, RIGHT_ONLY, RIGHT_BOTTOM_LEFT, LEFT_RIGHT, LEFT_BOTTOM,
BOTTOM_ONLY, BOTTOM_ONLY],
//row13
[LEFT_TOP, TOP_BOTTOM, TOP_BOTTOM, EMPTY_GRID, TOP_BOTTOM,
RIGHT_ONLY, BOTTOM_LEFT_TOP, TOP_BOTTOM, TOP_ONLY, TOP_BOTTOM,
TOP_RIGHT_BOTTOM, LEFT_ONLY, TOP_BOTTOM, EMPTY_GRID, TOP_BOTTOM,
TOP_BOTTOM, RIGHT_TOP],
//row14
[LEFT_RIGHT, BOTTOM_LEFT_TOP, RIGHT_TOP, LEFT_RIGHT, LEFT_TOP_RIGHT, 
LEFT_BOTTOM, TOP_BOTTOM, RIGHT_TOP, LEFT_RIGHT, LEFT_TOP,
TOP_BOTTOM, RIGHT_BOTTOM, LEFT_TOP_RIGHT, LEFT_RIGHT, LEFT_TOP, 
TOP_RIGHT_BOTTOM, LEFT_RIGHT],
//row15
[LEFT_BOTTOM, RIGHT_TOP, LEFT_RIGHT, LEFT_RIGHT, LEFT_ONLY, 
TOP_BOTTOM, TOP_RIGHT_BOTTOM, LEFT_RIGHT, RIGHT_BOTTOM_LEFT, LEFT_RIGHT,
BOTTOM_LEFT_TOP, TOP_BOTTOM, RIGHT_ONLY, LEFT_RIGHT, LEFT_RIGHT,
LEFT_TOP, RIGHT_BOTTOM],
//row16
[CLOSED_GRID, LEFT_RIGHT, RIGHT_BOTTOM_LEFT, LEFT_RIGHT, RIGHT_BOTTOM_LEFT,
LEFT_TOP, TOP_BOTTOM, BOTTOM_ONLY, TOP_BOTTOM, BOTTOM_ONLY,
TOP_BOTTOM, RIGHT_TOP, RIGHT_BOTTOM_LEFT, LEFT_RIGHT, RIGHT_BOTTOM_LEFT,
LEFT_RIGHT, CLOSED_GRID],
//row17
[BOTTOM_LEFT_TOP, BOTTOM_ONLY, TOP_BOTTOM, BOTTOM_ONLY, TOP_BOTTOM,
RIGHT_BOTTOM, BOTTOM_LEFT_TOP, TOP_BOTTOM, TOP_BOTTOM, TOP_BOTTOM, 
TOP_RIGHT_BOTTOM, LEFT_BOTTOM, TOP_BOTTOM, BOTTOM_ONLY, TOP_BOTTOM,
BOTTOM_ONLY, TOP_RIGHT_BOTTOM]
];

// grids that don't redraw
var staticGrids = [];
var staticGridsIndex = 0;

// start location of pacman
var pacmanStartLoc = [4,8];

// grids with no beans
var noBean = [pacmanStartLoc,
[2,7],[2,8],[2,9],
[3,1],[3,2],[3,4],[3,5],[3,7],[3,8],[3,9],[3,11],[3,12],[3,14],[3,15],
[5,1],[5,2],[5,4],[5,6],[5,7],[5,8],[5,9],[5,10],[5,12],[5,14],[5,15],
[6,4],[6,8],[6,12],
[7,0],[7,1],[7,2],[7,4],[7,5],[7,6],[7,8],[7,10],[7,11],[7,12],[7,14],[7,15],[7,16],
[8,0],[8,1],[8,2],[8,4],[8,12],[8,14],[8,15],[8,16],
[9,6],[9,7],[9,8],[9,9],[9,10],
[10,0],[10,1],[10,2],[10,4],[10,6],[10,7],[10,8],[10,9],[10,10],[10,12],[10,14],[10,15],[10,16],
[11,0],[11,1],[11,2],[11,4],[11,12],[11,14],[11,15],[11,16],
[12,6],[12,7],[12,8],[12,9],[12,10],
[13,1],[13,2],[13,4],[13,8],[13,12],[13,14],[13,15],
[14,2],[14,4],[14,5],[14,6],[14,8],[14,10],[14,10],[14,11],[14,12],[14,14],
[15,0],[15,2],[15,4],[15,12],[15,14],[15,16],
[16,6],[16,7],[16,8],[16,9],[16,10]
];
var noBeanIndex = noBean.length;

// power beans in maze
var powerBeans = [[3,0], [3,16], [14,0], [14,16], [8,8], [11,8], [15,8]];

// ghost house
var ghostHouse = [];
var ghostHouseIndex = 0;
/*====================== END GLOBAL VARs ====================*/


/*==================== Initialization Methods ==============*/

function initCanvas(width, height){
	if(width===undefined || !(width instanceof Number)){
		width = CANVAS_WIDTH;
	}
	if(height===undefined || !(height instanceof Number)){
		height = CANVAS_HEIGHT;
	}

	ctx.fillStyle = "#111111";
	ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
}

//draw lives on top and show a count down each time the game starts
function showLives(){
	ctx.fillStyle="#111111";
	ctx.fillRect(CANVAS_WIDTH-80, 10, 70, 40);
	for(var i=0; i<life-1; i++){
		lives[i] = new Pacman(CANVAS_WIDTH-50+25*i, 30, RIGHT);
		lives[i].draw();
	}

}

//show || update score
function showScore(){
	ctx.fillStyle="#111111";
	ctx.fillRect(CANVAS_WIDTH-280, 10, 190, 40);
	ctx.fillStyle = "white";
	ctx.font = "24px monospace";
	ctx.textAlign = "left";
	ctx.fillText("score: " + parseInt(score), CANVAS_WIDTH-250, 37);
}

function countDown () {
	ctx.fillStyle = "#111111";
	ctx.fillRect(CANVAS_WIDTH-500, 10, 70,40);
	ctx.fillStyle = "red";
	ctx.font = "40px monospace";
	ctx.textAlign = "center";
	ctx.fillText("3",CANVAS_WIDTH-460, 45);
	setTimeout(function () {
		ctx.fillStyle = "#111111";
		ctx.fillRect(CANVAS_WIDTH-500, 10, 70,40);
		ctx.fillStyle = "orange";
		ctx.fillText("2",CANVAS_WIDTH-460, 45);
		setTimeout(function  () {
				ctx.fillStyle = "#111111";
			ctx.fillRect(CANVAS_WIDTH-500, 10, 70,40);
			ctx.fillStyle = "yellow";
			ctx.fillText("1",CANVAS_WIDTH-460, 45);
			setTimeout(function  () {
				ctx.fillStyle = "#111111";
				ctx.fillRect(CANVAS_WIDTH-500, 10, 70,40);
				ctx.fillStyle = "green";
				ctx.textAlign = "center";
				ctx.fillText("GO!",CANVAS_WIDTH-460, 45);
				setTimeout(function  () {
					intervalId = setInterval(updateCanvas, timerDelay);
				},500);
			}, 1000);
		}, 1000);	
	}, 1000);
}

// draw maze,  show lives and countdown on top
function initMaze(){
	for(var i=0; i<maze.length; i++){
		var oneRow = new Array(CANVAS_WIDTH/GRID_WIDTH);
		maze[i] = oneRow;
	}

	// draw maze with full beans
	for( var row = 0; row < CANVAS_HEIGHT/GRID_HEIGHT; row++){
		for(var col = 0; col < CANVAS_WIDTH/GRID_WIDTH; col++){
			var beanType = NORMAL_BEAN;
			var newGrid = new Grid(col*GRID_WIDTH,row*GRID_HEIGHT , mazeContent[row][col],beanType);
			
			maze[row][col] = newGrid;
			newGrid.draw();
		}
	}

	//overwrite beans that shouldn't ecist
	for(var i=0; i<noBean.length; i++){
		var x = noBean[i][0];
		var y = noBean[i][1];
		maze[x][y].beanType = undefined;
		maze[x][y].draw();
	}

	// draw power beans
	for(var i=0; i<powerBeans.length;i++){
		var x = powerBeans[i][0];
		var y = powerBeans[i][1];
		maze[x][y].beanType = POWER_BEAN;
		maze[x][y].draw();
	}

}


function initFields () {
	// body...
	for (var i=9; i<10; i++){
		for (var j=6; j<10; j++) {
			ghostHouse[ghostHouseIndex]=[i,j];
			ghostHouseIndex++;
		}
	}


	//fill up staticGrids[]
	for (var i=0; i<2; i++){
		for (var j=0; j<17; j++){
			staticGrids[staticGridsIndex]=[i,j];
			staticGridsIndex++;
		}
	}

	// fill up noBean[]
	for(var i=0; i<2; i++){
		for(var j=0; j<17; j++){
			noBean[noBeanIndex]=[i,j];
			noBeanIndex++;
		}
	}
}
/*================ END Initialization Methods ==============*/


/*==================== Util Methods ================*/

//draw a circle
function circle(ctx, cx, cy, radius) {

	ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, 2*Math.PI, true);
    ctx.fill();

}

//get opposite direction
function oppositeDir (dir) {
	switch(dir){
		case UP:
		return DOWN;
		break;

		case DOWN:
		return UP;
		break;

		case LEFT:
		return RIGHT;
		break;

		case RIGHT:
		return LEFT;
		break;

		default:
		return -1;//err
	}
}

function getRowIndex (yCord) {
	if(yCord === undefined){
		return -1;//err
	}
	return parseInt(yCord/GRID_HEIGHT);
}


function getColIndex (xCord) {
	if(xCord === undefined){
		return -1;//err
	}
	return parseInt(xCord/GRID_WIDTH);
}

function sleep(ms)
{
		var dt = new Date();
		dt.setTime(dt.getTime() + ms);
		while (new Date().getTime() < dt.getTime());
}

function fixGrids (x, y) {
	var row = getRowIndex(y);
	var col = getColIndex(x);

	if(xOnGridCenter(y)){
 		maze[row][col].draw();
 		if(col+1 < maze.length && !staticArrayContains([row, col+1])){
 			maze[row][col+1].draw();
 		}
 		if(col-1 >= 0 && !staticArrayContains([row, col-1])){
 			maze[row][col-1].draw();
 		}
 	}
 	else if(yOnGridCenter(x)){
 		maze[row][col].draw();
 		if(row+1 < maze.length  && !staticArrayContains([row+1, col])){
 			maze[row+1][col].draw();
 		}
 		if(row-1 >=0 && !staticArrayContains([row-1,col]) ){
 			maze[row-1][col].draw();
 		}
 	}
}

function staticArrayContains(cord) {
	var x = cord[0];
	var y = cord[1];
	for(var i=0; i< staticGrids.length; i++ ){
		if(x=== staticGrids[i][0] &&
			y=== staticGrids[i][1]){
			return true;
		}
	}
	return false;
}

function ghostHouseContains(cord) {
	var x = cord[0];
	var y = cord[1];
	for(var i=0; i< ghostHouse.length; i++ ){
		if(x=== ghostHouse[i][0] &&
			y=== ghostHouse[i][1]){
			return true;
		}
	}
	return false;
}

function onGridCenter (x,y) {
	return xOnGridCenter(y) && yOnGridCenter(x);
}

function xOnGridCenter (y) {
	return ((y - GRID_WIDTH/2) % GRID_WIDTH) === 0;
}

function yOnGridCenter (x) {
	return ((x - GRID_HEIGHT/2) % GRID_HEIGHT) === 0;
}

//see if sprite can move one more step at the given (x,y) facing the given direction
function canMove (x,y,dir) {
	if(!onGridCenter(x,y)){
		return true;
	}
	var canMove = false;
	var currGrid = maze[getRowIndex(y)][getColIndex(x)];
	var gridType = currGrid.gridType;
	switch(dir){
		case UP:
		if(gridType != LEFT_TOP && gridType != RIGHT_TOP && gridType != TOP_BOTTOM
			&& gridType != TOP_ONLY && gridType!= LEFT_TOP_RIGHT 
			&& gridType != TOP_RIGHT_BOTTOM && gridType!= BOTTOM_LEFT_TOP){
			canMove = true;
		}
		break;

		case DOWN:
		if(gridType != LEFT_BOTTOM && gridType != TOP_BOTTOM && gridType != RIGHT_BOTTOM
			&& gridType != BOTTOM_ONLY && gridType!= RIGHT_BOTTOM_LEFT
			&& gridType != BOTTOM_LEFT_TOP && gridType!= TOP_RIGHT_BOTTOM){
			canMove = true;
		}
		break;

		case LEFT:
		if(gridType != LEFT_BOTTOM && gridType != LEFT_TOP && gridType != LEFT_ONLY
			&& gridType != LEFT_RIGHT && gridType!= LEFT_TOP_RIGHT
			&& gridType != BOTTOM_LEFT_TOP && gridType!= RIGHT_BOTTOM_LEFT){
			canMove = true;
		}
		break;

		case RIGHT:
		if(gridType != RIGHT_BOTTOM && gridType != RIGHT_TOP && gridType != RIGHT_ONLY
			&& gridType != LEFT_RIGHT && gridType!= RIGHT_BOTTOM_LEFT 
			&& gridType != TOP_RIGHT_BOTTOM && gridType != LEFT_TOP_RIGHT){
			canMove = true;
		}
		break;
		default:
		break;


	}
	return canMove;
}
/*================= END Util Methods ================*/


/*================= UI Update Methods ===============*/

//show welcome screen
function welcomeScreen(){

	gameOn = false;
	gamePaused = false;
	// welcome text
	ctx.fillStyle = "white";
	ctx.font = "80px monospace";
	ctx.textAlign = "center";
	ctx.fillText("PAC-MAN", CANVAS_WIDTH/2, 170);
	ctx.font = "20px monospace";
	ctx.fillText("Press s to start", CANVAS_WIDTH/2, 220);
	ctx.font = "14px monospace";
	ctx.fillText("DEVELOPED BY: VGP-WD", CANVAS_WIDTH/2 , CANVAS_HEIGHT/20*19);
}

//show win message
function winMessage(){
	//draw popup
	ctx.fillStyle = "#111111";
	ctx.strokeStyle = "green";
	ctx.lineWidth=5;
	ctx.fillRect(CANVAS_WIDTH/2-150, CANVAS_HEIGHT/2-40, 300, 100);
	ctx.strokeRect(CANVAS_WIDTH/2-150, CANVAS_HEIGHT/2-40, 300, 100);

	//write message
	ctx.textAlign="center";
	ctx.fillStyle = "white";
	ctx.font = "16px monospace";
	ctx.fillText("Congratulations, you won!", CANVAS_HEIGHT/2, CANVAS_HEIGHT/2+6);
	ctx.font = "12px monospace";
	ctx.fillText("press R to play again", CANVAS_HEIGHT/2, CANVAS_HEIGHT/2+28);
}

//show lose message
function loseMessage(){
	//draw popup
	ctx.fillStyle = "#111111";
	ctx.strokeStyle = "red";
	ctx.lineWidth=5;
	ctx.fillRect(CANVAS_WIDTH/2-100, CANVAS_HEIGHT/2-40, 200, 100);
	ctx.strokeRect(CANVAS_WIDTH/2-100, CANVAS_HEIGHT/2-40, 200, 100);

	//write message
	ctx.textAlign="center";
	ctx.fillStyle = "red";
	ctx.font = "26px monospace";
	ctx.fillText("GAME OVER", CANVAS_HEIGHT/2, CANVAS_HEIGHT/2+7);
	ctx.font = "12px monospace";
	ctx.fillText("press R to play again", CANVAS_HEIGHT/2, CANVAS_HEIGHT/2+28);
}

//update canvas for each frame. 
function updateCanvas() {
	restartTimer++;
	if (gameOver()===true){
		life--;
		// mrPacman.dieAnimation();
		showLives();
		if (life>0){
			sleep(500);
			clearInterval(intervalId);
			fixGrids(mrPacman.x, mrPacman.y);
			for(var i=0; i<ghosts.length; i++){
				fixGrids(ghosts[i].x, ghosts[i].y);
			}
			run();	
		}
		else {
			clearInterval(intervalId);
			sleep(500);
			loseMessage();
		}
		
	}
	else if (pacmanWon()===true){
		clearInterval(intervalId);
		sleep(500);
		winMessage();
	}
	else{
		if(weakCounter>0 && weakCounter<2000/timerDelay){
			for(var i=0; i<ghosts.length; i++){
				ghosts[i].isBlinking = !ghosts[i].isBlinking;
			}
		}
		if(weakCounter>0){
			weakCounter--;
		}
		if(weakCounter===0){
			for(var i=0; i<ghosts.length; i++){
				ghosts[i].isDead = false;
				ghosts[i].isWeak = false;
				ghosts[i.isBlinking = false];
				weakBonus= 200;
			}
		}

		eatBean();
		eatGhost();
		mrPacman.move();

		for(var i=0; i<ghosts.length; i++){
			if(ghosts[i].isDead === false){
				ghosts[i].move();
			}
		}

	 	fixGrids(mrPacman.x, mrPacman.y);
	 	for(var i=0; i<ghosts.length; i++){
			fixGrids(ghosts[i].x, ghosts[i].y);
		}

	    mrPacman.draw();
	    for(var i=0; i<ghosts.length; i++){
			ghosts[i].draw();
		}
	}
}

//try to eat a bean
function eatBean () {
	if(onGridCenter(mrPacman.x, mrPacman.y)){
		if(maze[mrPacman.getRow()][mrPacman.getCol()].beanType===NORMAL_BEAN){
			score+= parseInt(10);
			showScore();
			beansLeft--;
		}
		else if (maze[mrPacman.getRow()][mrPacman.getCol()].beanType===POWER_BEAN){
			score+=parseInt(50);
			showScore();
			beansLeft--;

			//ghosts enter weak mode
			for(var i=0; i<ghosts.length; i++){
				ghosts[i].isWeak=true;
			}
			weakCounter=WEAK_DURATION;
		}
		maze[mrPacman.getRow()][mrPacman.getCol()].beanType=undefined;
		maze[mrPacman.getRow()][mrPacman.getCol()].draw();
	}
}

//try to eat a weak ghost
function eatGhost () {
	for(var i=0; i<ghosts.length; i++){
		if(Math.abs(mrPacman.x-ghosts[i].x)<=5 && Math.abs(mrPacman.y-ghosts[i].y)<=5
			&& ghosts[i].isWeak && !ghosts[i].isDead){
			score += parseInt( weakBonus);
			weakBonus *=2;
			showScore();
			ghosts[i].isDead = true;
			ghosts[i].toGhostHouse();
		}
	}
}

function gameOver(){
	for(var i=0; i<ghosts.length; i++){
		if(Math.abs(mrPacman.x-ghosts[i].x)<=5 && Math.abs(mrPacman.y-ghosts[i].y)<=5
			&& !ghosts[i].isWeak){
			return true;
		}
	}
	return false;
}

function pacmanWon(){
	return beansLeft === 0;
}

/*================== END UI Update Methods ================*/


/*================== Game Control Methods ===================*/
//listen to keyDown event
function onKeyDown (event) {
	var keycode = event.keyCode;
	var pauseCode = 81; //q to pause
	var continueCode = 69; //e to resume
	var restartCode = 82; //r to restart
	var godModeCode = 71; //g to enter god mode
	var startCode = 83;

	//arrow keys
	var leftCode = 37;
	var upCode = 38;
	var rightCode = 39;
	var downCode = 40;

	//start game
	if(!gameOn){
		if(keycode === startCode){
			clearInterval(intervalId);
			gameOn = true;
			gamePaused = false;
			initMaze();
			run();
			return;
		}
		else if(keycode === godModeCode){
			clearInterval(intervalId);
			ghosts = [];
			gameOn = true;
			gamePaused = false;
			initMaze();
			run(true);
			return;
		}
	}
	else{

		//pause game
		if(keycode === pauseCode && !gamePaused){
			clearInterval(intervalId);
			gamePaused = true;
			return;
		}

		//resume game
		if(keycode === continueCode && gamePaused){
			intervalId = setInterval(updateCanvas, timerDelay);
			gamePaused = false;
			return;
		}

		//restart game
		if( keycode === restartCode && restartTimer > 0) {
			restartTimer = 0;
			clearInterval(intervalId);
			gameOn = true;
			gamePaused = false;
			score = 0;
			life = MAX_LIFE;
			beansLeft = MAX_BEANS;
			initMaze();
			run();
		}

		//4-way controls
		switch(keycode){
			case upCode:
			mrPacman.nextDir = mrPacman.dir===UP ? undefined: UP;
			break;

			case rightCode:
			mrPacman.nextDir = mrPacman.dir===RIGHT? undefined : RIGHT;
			break;

			case leftCode:
			mrPacman.nextDir = mrPacman.dir === LEFT? undefined : LEFT;
			break;

			case downCode:
			mrPacman.nextDir = mrPacman.dir === DOWN? undefined : DOWN;
			break;

			default:
			break;

		}
	}	
}

//run the game. Create mrPacman and 4 ghosts. Reset their positions.
function run(isGodMode) {
	showScore();
    
    mrPacman = new Pacman(pacmanStartLoc[1]*GRID_WIDTH + GRID_WIDTH/2, pacmanStartLoc[0]*GRID_HEIGHT + GRID_HEIGHT/2, RIGHT);
    if(isGodMode===undefined || !isGodMode){
	    blinky = new Ghost(0,0, RED, DOWN);
	    inky = new Ghost(0,0, CYAN, DOWN);
	    pinky = new Ghost(0,0, PINK, DOWN);
	    clyde = new Ghost(0,0, ORANGE, DOWN);

	    blinky.toGhostHouse();
	    inky.toGhostHouse();
	    pinky.toGhostHouse();
	    clyde.toGhostHouse();

	    ghosts = [blinky, inky, pinky, clyde];

	    inky.draw();
		blinky.draw();
		pinky.draw();
		clyde.draw();
	}
	else{
		ghosts = [];
	}
	showLives();

	mrPacman.draw();
	countDown();
}
/*=============== END Game Control Methods ===================*/

/*=============== Game Start ===================*/

initFields();
initCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
canvas.addEventListener('keydown', onKeyDown, false);
canvas.setAttribute('tabindex','0');
canvas.focus();
welcomeScreen();

/*=============== End Game Start ===================*/

