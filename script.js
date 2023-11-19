// script.js
document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('board');
  let currentPlayer = 'X';

  // Create a 3x3 grid
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
      // Implement your logic to check for a winner
      // For a simple example, you can check the row, column, and diagonals
      // Return true if there is a winner, otherwise false
      return false;
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
});
