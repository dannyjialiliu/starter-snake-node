const bodyParser = require('body-parser')
const express = require('express')

const PORT = process.env.PORT || 3000

const app = express()
app.use(bodyParser.json())

app.get('/', handleIndex)
app.post('/start', handleStart)
app.post('/move', handleMove)
app.post('/end', handleEnd)

app.listen(PORT, () => console.log(`Battlesnake Server listening at http://127.0.0.1:${PORT}`))


function handleIndex(request, response) {
  var battlesnakeInfo = {
    apiversion: '1',
    author: '',
    color: '#888888',
    head: 'default',
    tail: 'default'
  }
  response.status(200).json(battlesnakeInfo)
}

function handleStart(request, response) {
  var gameData = request.body

  console.log('START')
  response.status(200).send('ok')
}

function handleMove(request, response) {
  var gameData = request.body
  // console.log(gameData)
  var possibleMoves = ['up',  'left',  'down','right']
  
  var i = 0
  while(true){
  if(isMoveSafe(possibleMoves[i%4], gameData) == true){
    move = possibleMoves[i%4]
    break
  }else{
    i++
  }
  }
  console.log('MOVE: ' + move)
  response.status(200).send({
    move: move
  })
}

function isMoveSafe(move, gameData){
  var height = gameData["board"]["height"]
  var width = gameData["board"]["width"]
  var head = gameData["you"]["head"]
  var body = gameData["you"]["body"]

  // console.log(head["y"]+1)
  // console.log(body)
  console.log(move)
  if (move == "up"){
    if (head["y"] == height-1){
      console.log("dont go up - out of bounds")
      return false
    }
    if(head["y"]+1 in body){
      console.log("dont go up - hitting body")
    }
  }
  if (move == "down"){
    if (head["y"] == 0){
      console.log("dont go down - out of bounds")
      return false
    } 
    if (head["y"]-1 in body){
      console.log("dont go down - hitting body")
      return false
    }
  }
  if (move == "right"){
    if (head["x"] == width || head["x"]+1 in body){
      console.log("dont go right")
      return false
    }
    
  }
  if (move == "left"){
    if (head["x"] == 0 || head["x"]-1 in body){
      console.log("dont go left")
       return false
    }
  }
    return true
}


function handleEnd(request, response) {
  var gameData = request.body

  console.log('END')
  response.status(200).send('ok')
}
