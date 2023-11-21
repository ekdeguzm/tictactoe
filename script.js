document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('board');
  let currentPlayer = 'X';
  let gameStarted = false;
  let gameOver = false; // Add a variable to track game state

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
    if (gameOver) return; // Check if the game is over

    const clickedCell = event.target;
    const row = clickedCell.getAttribute('data-row');
    const col = clickedCell.getAttribute('data-col');

    // Check if the cell is already filled
    if (!clickedCell.textContent.trim()) {
      // Update cell with current player's symbol
      clickedCell.textContent = currentPlayer;
      clickedCell.classList.add('clicked'); // Add the 'clicked' class

      // Check for a winner or a tie
      if (checkWinner(row, col)) {
        announceWinner();
      } else if (checkTie()) {
        announceTie();
      } else {
        // Switch to the other player after a short delay
        setTimeout(() => {
          currentPlayer = 'O';

          // Make a simple computer move
          makeComputerMove();

          // Switch back to the player
          currentPlayer = 'X';
        }, 500); // Adjust the delay as needed
      }
    }
  }

  // Function to make a simple computer move
  function makeComputerMove() {

    const emptyCells = document.querySelectorAll('.cell:not(.clicked)');
    if (emptyCells.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptyCells.length);
      const randomCell = emptyCells[randomIndex];
      randomCell.textContent = currentPlayer;
      randomCell.classList.add('clicked');
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
    if (
      checkLine(0, 0, 1, 1, 2, 2) || 
      checkLine(0, 2, 1, 1, 2, 0)
      ) {
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
    const cells = document.querySelectorAll('.cell');
    for (const cell of cells) {
      if (!cell.textContent.trim()) {
        // If any cell is not filled, the game is not a tie
        return false;
      }
    }
    // If all cells are filled and there's no winner, it's a tie
    return true;
  }

  // Function to reset the game
  function resetGame() {
    // Clear the board and reset any game state variables
    currentPlayer = 'X';
    gameOver = false; // Reset the game state
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
      cell.textContent = '';
      cell.classList.remove('clicked');
    });
  }

  function announceWinner() {
    const winner = currentPlayer === 'X' ? 'Player X' : 'Player O';
    popUpMenu.popupBox(`${winner} wins!`);
    gameOver = true; // Set the game state to over
  }

  function announceTie() {
    popUpMenu.popupBox(`It's a Tie!`);
    gameOver = true; // Set the game state to over
  }

  const popUpMenu = (() => {
    const resetPage = () => {
        location.reload();
    }
  
    //function that builds Pop-up for winning or losing round
  const popupBox = (outcome) => {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';

    const popup = document.createElement('div');
    popup.className = 'popup-box';

    const result = document.createElement('div');
    result.id = 'win-lose';
    result.textContent = outcome;

    const replayBtn = document.createElement('button');
    replayBtn.id = 'play-again-btn';
    replayBtn.textContent = 'Play Again?';

    replayBtn.addEventListener('click', resetPage);

    popup.appendChild(result);
    popup.appendChild(replayBtn);

    overlay.appendChild(popup);

    document.body.appendChild(overlay);
  };

return {
  popupBox,
};
    return {
      popupBox
    }
  })();

  // Create the board when the page loads
  createBoard();
});


