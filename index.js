const classes = require('./classes/index.js');
const Board = classes.Board;
const mcts = classes.MonteCarloTreeSearch;

class MCTS {
	constructor(time, size, checkStatusFunc) {
		this.board = new Board(size || 3);
		this.player = 1;
		this.winStatus = -1;
		this.time = time || 100;
		this.checkStatusFunc = checkStatusFunc || null;
	}

	findNextMove() {
		this.board = mcts.findNextMove(this.board, this.player, this.time, this.checkStatusFunc);
		this.player = 3 - this.player;
	}

	performMove(player, p) {
		this.board.totalMoves++;
    	this.board.boardValues[p[0]][p[1]] = player;
	}

	getBoard() {
		return this.board.boardValues;
	}

	checkStatus() {
		this.winStatus = this.board.checkStatus();
		return winStatus;
	}
}


module.exports = {
	MCTS
}