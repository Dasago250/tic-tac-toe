//Module of the board, contains almost everything related to the board
const gameBoard = (() => {
  // Array to contains the marks and display in the HTML
  const board = ['', '', '', '', '', '', '', '', ''];

  // Helps to know who turn is.
  let currentSymbol = '';

  // Display the board array in the HTML
  const displayBoard = () => {
    const boardCells = document.querySelectorAll('.cell')
    boardCells.forEach((cell, index) => {
      cell.textContent = board[index];
    });
  };
  
  // Add eventListeners to the div/cell in the HTML to help put the symbols in the board and change the turns of the players 
  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell, index) => {
    cell.addEventListener('click',() => {
      if (numberOfSpaces() > 0 && board[index] == '' && game.gameON) {
        addMark(gameBoard.currentSymbol, index);
        checkWinner.checkBoard();
        game.changeTurn(numberOfSpaces());
      }
    })
  });

  // Add the symbols of the players in the board array.
  const addMark = (symbol, index) => {
    board[index] = symbol
    displayBoard();
  
  }

  // Helps to know when all the spaces in the board are full
  const numberOfSpaces = () => {
    let spaces = 0
    for (const item in board) {
      if (board[item] === '') {
        spaces++;
      }
    }
    return spaces;
  }

  return {board, cells,addMark, numberOfSpaces, currentSymbol};
})();

//Function factory to create the players
const players = (playerName, symbol) => {
  return {playerName, symbol};
};

//Module to contain the players and change the turns (Will change this module when start and reset button are implemented) 
const game = (() => {
  const player1 = players('Player 1' , 'X');
  const player2 = players('Player 2' , 'O');
  // Helps to determine if the game is active or finish
  let gameON = false;

  // Change the turn of the players
  const changeTurn = (signal) => {
    if (signal % 2 !== 0) {
      gameBoard.currentSymbol = player1.symbol;
    }else if(signal % 2 === 0){
      gameBoard.currentSymbol = player2.symbol;
    }
  }
  return {changeTurn, gameON, player1, player2}
})();

// Module to check board and determine if there's a winner
const checkWinner = (() => {
  // Helps end the game
  const endGame = () => {
      game.gameON = false;
  }

  // Check the board and compare to the patterns and determine if there's a winner
  const checkBoard = () => {

    let theresAWinner = false;
    // Normal Patterns to win in tic tac toe
    const patternsWins = [
      [gameBoard.board[0],gameBoard.board[1],gameBoard.board[2]],
      [gameBoard.board[3],gameBoard.board[4],gameBoard.board[5]],
      [gameBoard.board[6],gameBoard.board[7],gameBoard.board[8]],
      [gameBoard.board[0],gameBoard.board[3],gameBoard.board[6]],
      [gameBoard.board[1],gameBoard.board[4],gameBoard.board[7]],
      [gameBoard.board[2],gameBoard.board[5],gameBoard.board[8]],
      [gameBoard.board[0],gameBoard.board[4],gameBoard.board[8]],
      [gameBoard.board[2],gameBoard.board[4],gameBoard.board[6]]
    ];
    //Compare the gameboard to the patterns, determine if there's a winner or draw and stops the game and gives the result
    for (let i = 0; i < patternsWins.length; i++) {
      let numOfXSymbols = 0;
      let numOfOSymbols = 0;
      for (let j = 0; j < patternsWins[i].length; j++) {
        if(patternsWins[i][j] === 'X'){
          numOfXSymbols++;
        }else if(patternsWins[i][j] === 'O'){
          numOfOSymbols++;
        }
      }
      if (numOfXSymbols === 3) {
        game.gameON = false;
        if (game.player1.symbol === 'X') {
          showWinner(game.player1.playerName);
          theresAWinner = true;
          break;
        }else{
          showWinner(game.player2.playerName);
          theresAWinner = true;
          break;
        }
      }else if (numOfOSymbols === 3) {
        game.gameON = false;
        if (game.player1.symbol === 'O') {
          showWinner(game.player1.playerName);
          theresAWinner = true;
          break;
        }else{
          showWinner(game.player2.playerName);
          theresAWinner = true;
          break;
        }
      }
    }
    if(gameBoard.numberOfSpaces() === 0 && !theresAWinner){
        console.log('Draw');
    }
  };

  const winnerCard = document.querySelector('.winner')
  const showWinner = (winner) => {

    winnerCard.textContent = `Winner: ${winner}`;
  }

  return {endGame, checkBoard, winnerCard}
})();

//manage all the buttons logic
const gameButtons = (() => {
  const startBtn = document.querySelector('#startBtn');
  const restartBtn = document.querySelector('#restartBtn');
  restartBtn.disabled = true;
  //Start button logic
  startBtn.addEventListener('click', () => {
    game.gameON = true;
    startBtn.disabled = true;
    restartBtn.disabled = false
    game.changeTurn(gameBoard.numberOfSpaces());
  });

  //Restart button logic
  restartBtn.addEventListener('click', () => {
    game.gameON = false;
    startBtn.disabled = false;
    restartBtn.disabled = true;
    checkWinner.winnerCard.textContent = '';
    for (let i = 0; i < gameBoard.board.length; i++) {
      gameBoard.addMark('', i);
    }
  });
})();