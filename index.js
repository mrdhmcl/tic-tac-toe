let restartBtn = document.getElementById('restartBtn')
const currentTurn = document.getElementById('currentTurn')
const boxes = Array.from(document.getElementsByClassName('boardSquare'))

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocs')
let drawIndicator = getComputedStyle(document.body).getPropertyValue('--draw-blocs')

const O_CLASS = 'O'
const X_CLASS = 'X'
let currentPlayer = X_CLASS
let spaces = Array(9).fill(null)
let count_plays = 0

const startGame = () => {
  boxes.forEach(box => box.addEventListener('click', boxClicked))
  setHover()
}

function setHover() {
  boxes.forEach((box) => {
    box.classList.remove('XHover')
    box.classList.remove('OHover')
  })

  const hoverClass = `${currentPlayer}Hover`

  boxes.forEach((box) => {
    if (box.classList.contains('X') || box.classList.contains('O')) {
      box.classList.remove(hoverClass)
    } else {
      box.classList.add(hoverClass)
    }
  })
}

function boxClicked(event) {
  const id = event.target.id
  if(!spaces[id] && count_plays < 9) {
    spaces[id] = currentPlayer
    event.target.classList = currentPlayer

    currentPlayer = currentPlayer == X_CLASS ? O_CLASS : X_CLASS
  
  setHover()
  count_plays++
  checkWinner()
  }
}

function checkWinner() {
  if(playerHasWon() !== false) {
    currentPlayer = currentPlayer == X_CLASS ? O_CLASS : X_CLASS
    currentTurn.innerText = `Player ${currentPlayer} has won!`

    count_plays = 10

    let winning_blocks = playerHasWon()
    winning_blocks.map(box => boxes[box].style.backgroundColor=winnerIndicator)

    boxes.forEach((box) => {
      box.classList.remove('XHover')
      box.classList.remove('OHover')
    })
    return
  }

  if(count_plays === 9) {
    currentTurn.innerText = `Draw Game!`
    boxes.forEach(box => box.style.backgroundColor = drawIndicator)
  }
}

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

function playerHasWon() {
  for (const condition of winningConditions) {
    let [a, b, c] = condition

    if(spaces[a] && (spaces[a] === spaces[b] && spaces[a] === spaces[c])) {
      return [a, b, c]
    }
  }
  return false
}

restartBtn.addEventListener('click', restart)

function restart() {
  spaces.fill(null)

  boxes.forEach(box => {
    box.classList.remove('O')
    box.classList.remove('X')
    box.classList.remove('OHover')
    box.classList.add('boardSquare')
    box.classList.add('XHover')
    box.style.backgroundColor=''
  })

  count_plays = 0

  currentPlayer = X_CLASS
  currentTurn.innerText = `Tic-tac-toe`
}

startGame()