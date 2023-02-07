const gameBoard = (() => {
  const board = [ '', '', '', '', '', '', '', '', '']

  const displayBoard = () => {
    const boardCells = document.querySelectorAll('.cell')
    boardCells.forEach((cell, index) => {
      cell.textContent = board[index];
    });
  };

  const addMark = (symbol) => {
    const cells = document.querySelectorAll('.cell');
      cells.forEach((cell, index) => {
        cell.addEventListener('click', () => {
          if (numberOfSpaces() > 0) {
            board[index] = symbol
            displayBoard();
            game.changeTurn(numberOfSpaces());            
          }
        });
      });
  }

  const numberOfSpaces = () => {
    let spaces = 0
    for (const item in board) {
      if (board[item] === '') {
        spaces++;
      }
    }
    return spaces;
  }

  return {board, addMark, numberOfSpaces};
})();

const players = (playerNum, symbol) => {
  return {playerNum, symbol};
};

const game = (() => {
  const player1 = players('Player 1' , 'X');
  const player2 = players('Player 2' , 'O');
  const changeTurn = (signal) => {
    if (signal % 2 !== 0) {
      gameBoard.addMark(player1.symbol);
    }else if(signal % 2 === 0){
      gameBoard.addMark(player2.symbol);
    }
  }
  return {changeTurn}
})();

game.changeTurn(gameBoard.numberOfSpaces());
