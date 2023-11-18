// script.js
document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('board');

  // Create a 3x3 grid
  for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
          const cell = document.createElement('div');
          cell.classList.add('cell');
          cell.setAttribute('data-row', i);
          cell.setAttribute('data-col', j);
          board.appendChild(cell);
      }
  }
});
