var assert = require('assert');
const classes = require('../classes/index.js');
const Board = classes.Board;
const mcts = classes.MonteCarloTreeSearch;

const MCTS = require('../index.js');



describe('mcts-ai', function() {
  describe('simulate games', function() {
    it(`a simulated game between two ai's should be a tie`, function() {
      let board = new Board();
      let player = 1;
      let totalMoves = 9;
      for (var i = 0; i < 9; i++) {
        board = mcts.findNextMove(board, player, 100);
        if (board.checkStatus() !== -1) {
          break;
        }
        player = 3 - player;
      }
      let winStatus = board.checkStatus();
      assert.equal(winStatus, 0);
    });
  });
});