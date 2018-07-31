//Simple Snake by TheFox

const readline = require('readline');

//costumization

var headChar = "🤢" //the head of the snake

var emptyChar = "⚪" //an empty space
var fruitChar = "🍎" //the fruit, food, whatever

var speed = 0.5 //seconds before next "tick"
var speedchange = 0.1 //the snake speeds up based on: speed-speedchange*score (leave to 0 if you dont want it to speed up)

//the actual code

var score = 0
var snakepos = [[15,15]]
var fruitpos = []
var keyPress = "up"
var oldSnakePos = [[14,15]]
var tickInterval
var keySymbol

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on('keypress', (str, key) => {
  if(["right","up","left","down"].includes(key.name)) {
    keyPress = key.name
  }
  if(key.sequence === "\u0003") {process.exit()}
})

function fruit() {
    fruitpos = [Math.ceil(Math.random()*18)+1,Math.ceil(Math.random()*18)+1]
    score++
    if(score > 1) {
        speed -= speedchange
    }
    snakepos.push(oldSnakePos[score-1].slice(0))
}

function gameover() {
    console.clear()
    console.log("game over !! you losed")
    process.exit()
}

function render() {
    console.clear()
    var n = 0
    var i = 0

    var board = []
    
    var xexample = []

    while(i<19) {
        xexample.push(emptyChar)
        i++
    }

    while(n<19) {
        board.push(xexample.slice(0))
        n++
    }

    snakepos.forEach(v=>{
        if(v[0]<1 || v[0]>19 || v[1]>19 || v[1]<1) {
            gameover()
        }
        if(board[v[0]-1][v[1]-1] === headChar) {
            gameover()
        }
        board[v[0]-1][v[1]-1] = headChar
    })
    board[fruitpos[0]-1][fruitpos[1]-1] = fruitChar
    board.forEach(y=>{
        console.log(y.join(""))
    })
    snakepos.forEach(v=>{
        if(board[v[0]-1] === undefined) {board[v[0]-1] = []}
        board[v[0]-1][v[1]-1] = " "
    })
    switch(keyPress) {
        case "up":
            keySymbol = "🔼"
            break;
        case "down":
            keySymbol = "🔽"
            break;
        case "right":
            keySymbol = "▶️"
            break;
        case "left":
            keySymbol = "◀️"
            break;
    }
    console.log("score: "+score+"\n"+" ".repeat(19)+keySymbol+" ".repeat(19))
}

fruit()

tickInterval = setInterval(function() {
    oldSnakePos = JSON.parse(JSON.stringify(snakepos))
    switch(keyPress) {
        case "up":
            snakepos[0][0] -= 1
            break;
        case "down":
            snakepos[0][0] += 1
            break;
        case "right":
            snakepos[0][1] += 1
            break;
        case "left":
            snakepos[0][1] -= 1
            break;
    }
    if(snakepos.length>1) {
        snakepos.forEach((v, i) => {
            if(i===1) {
                snakepos[i] = oldSnakePos[i-1].slice(0)
            } else if(i>0) {
                snakepos[i] = oldSnakePos[i-1].slice(0)
            }
        })
    }

    if(snakepos[0][0] === fruitpos[0] && snakepos[0][1] === fruitpos[1]) {
        fruit()
    }
    render()
}, speed*1000)