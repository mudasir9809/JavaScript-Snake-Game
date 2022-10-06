let foodMusic = new Audio('music/food.mp3')
let gameOver = new Audio('music/gameover.mp3')
let move = new Audio('music/move.mp3')
let music = new Audio('music/game music.mp3')
let board = document.getElementsByClassName('container')[0];
let direction = { x: 0, y: 0 };
let snakeArray = [{ x: 13, y: 13 }];
let food = { x: 4, y: 5 };
let gameSpeed = 10;
let lastPaintTime = 0;
let changeInX = 0;
let changeInY = 0;
let keyDirection = "";
let score = 0;
let highScore = 0;
let scoreElement = document.getElementById('score')
let highScoreElement = document.getElementById('highScore')
displayHighScore()
function main(currentTime) {
    window.requestAnimationFrame(main)
    if ((currentTime - lastPaintTime) / 1000 < (1 / gameSpeed)) {
        return;
    }
    lastPaintTime = currentTime
    game()
    changeInX = snakeArray[0].x;
    changeInY = snakeArray[0].y;
}
function game() {
    function Collision() {
        for (let index = 1; index < snakeArray.length; index++) {
            if (snakeArray[index].x == snakeArray[0].x && snakeArray[index].y == snakeArray[0].y) {
                return true
            }
        }
        if (snakeArray[0].x < 0 || snakeArray[0].x > 20 || snakeArray[0].y < 0 || snakeArray[0].y > 20) {
            return true
        }
        else {
            return false
        }
    }

    if(Collision()) {
        gameOver.play()
        snakeArray = [{ x: 13, y: 13 }];
        direction = { x: 0, y: 0 }
        music.pause()
        score = 0;
        scoreElement.innerText = `Score: 0`
        alert('press any key to play again')
        gameLogic()
    }
    //update food
    function updateFood() {
        let a = 1;
        let b = 20;
        food.x = Math.round(a + (b - a) * Math.random())
        food.y = Math.round(a + (b - a) * Math.random())
        foodMusic.play()
        score += 1
        scoreElement.innerText = `Score: ${score}`
    }
    if (snakeArray[0].x == food.x && snakeArray[0].y == food.y) {
        updateFood()
        for (let index = 1; index < snakeArray.length; index++) {
            while (snakeArray[index].x == food.x && snakeArray[index].y == food.y) {
                updateFood()
            }
        }
        snakeArray.unshift({ x: snakeArray[0].x + direction.x, y: snakeArray[0].y + direction.y })
    }

if(score >= highScore){
    localStorage.setItem('topScore', highScore)
    displayHighScore()
    highScore = score
}
   
    for (let index = snakeArray.length - 2; index >= 0; index--) {
        snakeArray[index+1] = { ...snakeArray[index] }
    }
    snakeArray[0].x += direction.x
    snakeArray[0].y += direction.y
     keyDirection = ''
    if (changeInY > snakeArray[0].y) {
        keyDirection = 'ArrowUp'
    }
    else if (changeInY < snakeArray[0].y) {
        keyDirection = 'ArrowDown'
    }
    else if (changeInX < snakeArray[0].x) {
        keyDirection = 'ArrowRight'
    }
    else if (changeInX > snakeArray[0].x) {
        keyDirection = 'ArrowLeft'
    } 
    board.innerHTML = ""
    snakeArray.forEach((element, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = element.y;
        snakeElement.style.gridColumnStart = element.x;
        if (index === 0) {
            snakeElement.classList.add('head')
        }
        else {
            snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement)
    })
    
    let foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement)
}
window.requestAnimationFrame(main)
document.addEventListener('keydown', (element) => {
    music.play()
    direction = { x: 1, y: 1 }
    switch (element.key) {
        case ('ArrowUp'):
            if (keyDirection == 'ArrowDown') {
                direction.y = 1;
                direction.x = 0;
            }
            else {
                direction.y = -1;
                direction.x = 0;
                move.play()
            }
            break;

        case ('ArrowDown'):
            if (keyDirection == 'ArrowUp') {
                direction.y = -1;
                direction.x = 0;
            }
            else {
                direction.y = 1;
                direction.x = 0;
                move.play()
            }
            break;

        case ('ArrowRight'):
            if (keyDirection == 'ArrowLeft') {
                direction.y = 0;
                direction.x = -1;
            }
            else {
                direction.y = 0;
                direction.x = 1;
                move.play()
            }
            break;

        case ('ArrowLeft'):
            if (keyDirection == 'ArrowRight') {
                direction.y = 0;
                direction.x = 1;
            }
            else {
                direction.y = 0;
                direction.x = -1;
                move.play()
            }
            break;
        default:
            direction.y = 0;
            direction.x = 0;
            break;
    }
})
function displayHighScore(){
    highScore =  localStorage.getItem('topScore')
    highScoreElement.innerText = `High Score: ${highScore}`
}