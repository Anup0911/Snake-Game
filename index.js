//Game constants and Variables
alert("Use Arrow Keys to play the Game\nBest of Luck")
let inputDir = { x: 0, y: 0 };
let foodsound = new Audio('Eat.mp3');
let gameoverSound = new Audio('End.mp3');
let movesound = new Audio('Move.mp3');
let musicSound = new Audio('Main.mp3');
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
]
food = { x: 6, y: 7 };
//Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    //If you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x ===snake[0].x && snake[i].y ===snake[0].y){
            return true;
        }
    }
        //If you bump into wall
        if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0)
        return true;
    return false;
}

function gameEngine() {
    //Part 1:Updating The Snake array
    if (isCollide(snakeArr)) {
        gameoverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over. Press Enter to play again")
        snakeArr = [{ x: 13, y: 15 }];
        musicSound.play();
        score = 0;
    }


    // iF you have eaten the food increment the score and regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodsound.play();
        score+=1;
        if(score>hiscoreval)
        {
            hiscoreval=score;
            localStorage.setItem('hiscore', JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML="Hiscore: "+hiscoreval;
        }
        scoreBox.innerHTML="Score: "+score;    
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    //Moving the snake 
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;



    //Pary 2:Display the snake and food
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else
            snakeElement.classList.add('snake');
        board.appendChild(snakeElement);
    })
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}






//Main logic starts here
let hiscore= localStorage.getItem('hiscore');
if(hiscore===null){
    hiscoreval=0;
    hiscore= localStorage.setItem('hiscore', JSON.stringify(hiscoreval));
}
else{
    hiscoreval=JSON.parse(hiscore);
    hiscoreBox.innerHTML="Hiscore: "+hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 0 };// Start the Game
    musicSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArowUp")
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArowDown")
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
})