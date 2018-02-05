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

class MCTS {
	constructor(time, size, checkStatusFunc) {
		this.board = new Board(size || 3);
		this.player = 1;
		this.winStatus = -1;
		this.time = time || 100;
		this.checkStatusFunc = checkStatusFunc || null;
	}

	findMove() {
		this.board = mcts.findNextMove(this.board, this.player, this.time, this.checkStatusFunc);
		this.player = 3 - this.player;
		console.log(this.board)
	}

	getBoard() {
		return this.board.boardValues;
	}

	checkStatus() {
		this.winStatus = this.board.checkStatus();
		return winStatus;
	}
}


module.exports ={
	MCTS
}