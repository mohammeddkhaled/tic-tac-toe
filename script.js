const gameBoard = document.getElementById('gameBoard');
const cells = document.querySelectorAll('.cell');
const gameStatus = document.getElementById('gameStatus');
const restartButton = document.getElementById('restartButton');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.dataset.cellIndex);

    if (board[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    board[clickedCellIndex] = currentPlayer;
    clickedCell.innerText = currentPlayer;

    checkResult();
}

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameStatus.innerText = `${currentPlayer} has won!`;
        gameStatus.style.color = 'green';
        gameStatus.style.fontWeight = 'bold';

        gameActive = false;
        return;
    }

    let roundDraw = !board.includes('');
    if (roundDraw) {
        gameStatus.innerText = 'Game is a draw!';
        gameStatus.style.color = 'red';
        gameStatus.style.fontWeight = 'bold';
        gameActive = false;
        return;
    }

    changePlayer();
}

function changePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    gameStatus.innerText = `It's ${currentPlayer}'s turn`;
    gameStatus.style.color = currentPlayer === 'X' ? 'blue' : 'purple';
    gameStatus.style.fontWeight = 'bold';
}

function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = `${currentPlayer}`;
    gameActive = true;
    gameStatus.innerText = `It's ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.innerText = '';
    });
}

// Event Listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);

// Initial status display
gameStatus.innerText = `It's ${currentPlayer}'s turn`;