document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('board');
  let currentPlayer = 'X';
  let gameStarted = false;

  // Function to create the board
  function createBoard() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-row', i);
        cell.setAttribute('data-col', j);
        board.appendChild(cell);

        // Add click event listener to each cell
        cell.addEventListener('click', handleCellClick);
      }
    }
  }

  // Function to handle cell click
  function handleCellClick(event) {
    const clickedCell = event.target;
    const row = clickedCell.getAttribute('data-row');
    const col = clickedCell.getAttribute('data-col');

    // Check if the cell is already filled
    if (!clickedCell.textContent.trim()) {
      // Update cell with current player's symbol
      clickedCell.textContent = currentPlayer;

      // Check for a winner or a tie
      if (checkWinner(row, col)) {
        alert(`Player ${currentPlayer} wins!`);
        resetGame();
      } else if (checkTie()) {
        alert("It's a tie!");
        resetGame();
      } else {
        // Switch to the other player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
    }
  }

// Function to check for a winner
function checkWinner(row, col) {
  // Check the row
  if (
    checkLine(0, 0, 0, 1, 0, 2) ||
    checkLine(1, 0, 1, 1, 1, 2) ||
    checkLine(2, 0, 2, 1, 2, 2)
  ) {
    return true;
  }

  // Check the column
  if (
    checkLine(0, 0, 1, 0, 2, 0) ||
    checkLine(0, 1, 1, 1, 2, 1) ||
    checkLine(0, 2, 1, 2, 2, 2)
  ) {
    return true;
  }

  // Check the diagonals
  if (checkLine(0, 0, 1, 1, 2, 2) || checkLine(0, 2, 1, 1, 2, 0)) {
    return true;
  }

  return false;
}

// Helper function to check a line for a winner
function checkLine(row1, col1, row2, col2, row3, col3) {
  const cell1 = document.querySelector(`[data-row="${row1}"][data-col="${col1}"]`);
  const cell2 = document.querySelector(`[data-row="${row2}"][data-col="${col2}"]`);
  const cell3 = document.querySelector(`[data-row="${row3}"][data-col="${col3}"]`);

  return (
    cell1.textContent.trim() !== '' &&
    cell1.textContent === cell2.textContent &&
    cell1.textContent === cell3.textContent
  );
}


  // Function to check for a tie
  function checkTie() {
    // Implement your logic to check for a tie
    // Return true if it's a tie, otherwise false
    return false;
  }

  // Function to reset the game
  function resetGame() {
    // Clear the board and reset any game state variables
    currentPlayer = 'X';
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => (cell.textContent = ''));
  }

  // Function to start the game
  function startGame() {
    const playerXRadio = document.getElementById('playerX');
    const playerORadio = document.getElementById('playerO');

    // Set the currentPlayer based on the selected radio button
    currentPlayer = playerXRadio.checked ? 'X' : 'O';

    if (!gameStarted) {
      createBoard();
      gameStarted = true;
    }
  }

  // Add click event listener to the "Start Game" button
  const startButton = document.querySelector('button');
  startButton.addEventListener('click', startGame);
});
