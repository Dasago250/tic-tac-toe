const gameboard = (() => {
  const board = [ '', '', '', '', '', '', '', '', '']

  return {board};
})();

const players = (playerNum, symbol) => {

  return {playerNum, symbol};
};

const displayBoard = (() => {
  const boardCells = document.querySelectorAll('.cell')

  boardCells.forEach((cell, index) => {
    cell.textContent = gameboard.board[index];
  });
});

displayBoard();