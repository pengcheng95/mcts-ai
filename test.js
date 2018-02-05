const classes = require('./classes/index.js');
const Node = classes.Node;
const Tree = classes.Tree;
const State = classes.State;
const Board = classes.Board;
const mcts = classes.MonteCarloTreeSearch;
const selectPromisingNode = classes.selectPromisingNode;
const UCT = classes.UCT;
const expandNode = classes.expandNode;
const backPropogation = classes.backPropogation;
const simulateRandomPlayout = classes.simulateRandomPlayout;

let simulateAiPlay = () => {
  let board = new Board();
  console.log('start board: ', board);
  let player = 1;
  let totalMoves = 9;
  for (var i = 0; i < 9; i++) {
    board = mcts.findNextMove(board, player, 100);
    console.log('new board: ', board);
    if (board.checkStatus() !== -1) {
      break;
    }
    player = 3 - player;
  }
  let winStatus = board.checkStatus();
  console.log('win status: ', winStatus);
  return winStatus;
}

simulateAiPlay();