class Node {
  constructor(state, node) {
    if (arguments.length === 1) {
      this.state = state;
      this.parent;
      this.childArray = [];
    } else if (arguments.length === 2) {
      this.state = new State(null, node.state);
      if (node.parent !== (null || undefined)) {
        this.parent = node.parent;
      }
      this.childArray = [];
      // let childArray = node.childArray;
      node.childArray.forEach(child => {
        this.childArray.push(new Node(null, child));
      })
    } else {
      this.state = new State();
      this.parent;
      this.childArray = [];
    }

  }

  /**
   * Find a random Child Node
   * @return {Node} child node
   */
  getRandomChildNode() {
    return this.childArray[Math.floor(Math.random() * this.childArray.length)];
  }

  getChildWithMaxScore() {
    let arrScore = [];
    for (var i = 0; i < this.childArray.length; i++) {
      arrScore.push(this.childArray[i].state.visitCount);
    }
    // console.log(arrScore);
    var largest = Math.max(...arrScore);
    var idx = arrScore.indexOf(largest);
    return this.childArray[idx];
  }
}

class Tree {
  constructor(node) {
    if (arguments.length === 1) {
      this.root = node;
    } else {
      this.root = new Node();
    }
  }
}

class State {
  constructor(board, state) {
    if (arguments.length === 1) {
      this.board = new Board(board);
      this.playerNo;
      this.visitCount = 0;
      this.winScore = 10;
    } else if (arguments.length === 2) {
      this.board = new Board(state.board);
      this.playerNo = state.playerNo;
      this.visitCount = state.visitCount;
      this.winScore = state.winScore;
    } else {
      this.board = new Board();
      this.playerNo;
      this.visitCount = 0;
      this.winScore = 10;
    }

  }

  /**
   * Get all possible future states of a board
   * @return {Array} all possible next move states
   */
  getAllPossibleStates() {
    let possibleStates = [];
    let availablePositions = this.board.getEmptyPositions();

    // create an array of all the possible states a board can become
    availablePositions.forEach(p => {
      let newState = new State(this.board);
      newState.playerNo = 3 - this.playerNo;
      newState.board.performMove(newState.playerNo, p);
      possibleStates.push(newState);
    })

    return possibleStates;
  }

  /**
   * Plays a random move on the board
   */
  randomPlay() {
    let availablePositions = this.board.getEmptyPositions();
    let totalPossibilities = availablePositions.length;
    let rdm = Math.floor(Math.random() * totalPossibilities);
    this.board.performMove(this.playerNo, availablePositions[rdm]);
  }

  /**
   * Changes the current player
   */
  togglePlayer() {
    this.playerNo = 3 - this.playerNo;
  }

  /**
   * Returns the opponent
   */
  getOpponent() {
    return 3 - this.playerNo;
  }

  addScore(score) {
    if (this.winScore !== Number.MIN_SAFE_INTEGER) {
      this.winScore += score;
    }
  }
}

class Board {
  //need to work on
  constructor(board) {
    if (arguments.length === 1) {
      this.boardValues = board.boardValues.slice();
    } else {
      this.boardValues = new Array(9);
      for (var i = 0; i < this.boardValues.length; i++) {
        this.boardValues[i] = 0;
      }
    }
    this.DEFAULT_BOARD_SIZE = 3;
    this.IN_PROGRESS = -1;
    this.DRAW = 0;
    this.P1 = 1;
    this.P2 = 2;
    this.totalMoves = 0;
  }

  /**
   * Add a move to the board
   * @param {Number} player - the player number
   * @param {Number} p - position of the move
   */
  performMove(player, p) {
    this.totalMoves++;
    this.boardValues[p] = player;
  }

  /**
   * Finds all empty positions on a board
   * @return {Array} possible moves
   */
  getEmptyPositions() {
    let size = this.boardValues.length;
    let emptyPositions = [];
    for (var i = 0; i < size; i++) {
      if (this.boardValues[i] === 0) {
        emptyPositions.push(i);
      }
    }
    return emptyPositions;
  }

  /**
   * Checks status of the game
   * @return {Number}
   * -1  - game incomplete
   *  0  - draw
   *  1  - player 1 wins
   *  2  - player 2 wins
   */
  checkStatus() {
    // all possible winning combinations in Tic Tac Toe
    let checks = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (var i = 0; i < checks.length; i++) {
      let check = checks[i];
      let checkArr = [];
      for (var j = 0; j < check.length; j++) {
        checkArr.push(this.boardValues[check[j]]);
      }

      function winner1(currentValue) {
        return currentValue === 1;
      }

      function winner2(currentValue) {
        return currentValue === 2;
      }
      if (checkArr.every(winner1)) {
        return 1;
      }
      if (checkArr.every(winner2)) {
        return 2;
      }
    }

    function incomplete(elem) {
      return elem === 0;
    }
    if (this.boardValues.some(incomplete)) {
      return -1
    }

    // if there are no empty spaces, the game is a draw
    return 0;
  }
}

let MonteCarloTreeSearch = {
  // constructor() {
  //   this.WIN_SCORE = 10;
  //   this.level;
  //   this.opponent;
  // }


  /**
   * Find best next move for player
   * @param {Board} board - the current state of the board
   * @param {Number} playerNo - player
   */
  findNextMove: (board, playerNo, time) => {
    let opponent = 3 - playerNo;
    let tree = new Tree();
    let rootNode = tree.root;
    rootNode.state.board = new Board(board);
    rootNode.state.playerNo = opponent;

    // while loop runs for 500 milliseconds
    let startTime = Date.now();
    let runtime = time || 100
    console.log('runtime: ', runtime);
    console.log('tree: ', JSON.stringify(tree.root));
    while ((Date.now() - startTime) < (runtime)) {
      // console.log('running');
      // console.log('running test: ', i)
      let promisingNode = selectPromisingNode(rootNode);
      // if status of board is -1, game has not finished yet
      if (promisingNode.state.board.checkStatus() === board.IN_PROGRESS) {
        expandNode(promisingNode);
      }
      let nodeToExplore = promisingNode;
      if (nodeToExplore.childArray.length > 0) {
        nodeToExplore = promisingNode.getRandomChildNode();
      }
      let playoutResult = simulateRandomPlayout(nodeToExplore, opponent);
      backPropogation(nodeToExplore, playoutResult);
    }

    let winnerNode = rootNode.getChildWithMaxScore();
    tree.root = winnerNode;
    return winnerNode.state.board;
  }
}

/**
 * Selection Phase
 * Starting with the root node, picks the node with the maximum win rate
 */

/**
 * Finds the most promising node
 * @param {Node} rootNode - the node we start out at
 * @return {Node} most promising node
 */
let selectPromisingNode = (rootNode) => {
  let node = rootNode;
  // console.log('node.childArray: ', node.childArray);
  while (node.childArray.length !== 0) {
    node = UCT.findBestNodeWithUCT(node);
  }
  return node;
}

let UCT = {

  /**
   * Calculate the UCT (Upper Confidence Bound) value of Node
   * @param {Number} totalVisit - total number of simulations for the parent node
   * @param {Number} nodeWinScore - number of wins after the i-th move
   * @param {Number} nodeVisit - number of simulations after the i-th move
   * @return {Number} UCT of Node
   */
  uctValue: (totalVisit, nodeWinScore, nodeVisit) => {
    if (nodeVisit === 0) {
      return Number.MAX_SAFE_INTEGER;
    }
    return (nodeWinScore / nodeVisit) + 1.41 * Math.sqrt(Math.log(totalVisit) / nodeVisit);
  },

  /**
   * Find the child Node with the highest UCT
   * @param {Node} node - current node
   * @return {Node} most promising node
   */
  findBestNodeWithUCT: (node) => {
    let parentVisit = node.state.visitCount;
    let childUCT = [];

    // Find the UCT of each child of the Array
    node.childArray.forEach(child => {
      childUCT.push(UCT.uctValue(parentVisit, child.state.winScore, child.state.visitCount))
    })
    // console.log('childUCT', childUCT);
    // Find the highest UCT value and index of value
    // console.log('childUCt', childUCT);
    var max = Math.max(...childUCT);
    // console.log(max);
    var idx = childUCT.indexOf(max);
    return node.childArray[idx];
  }
}


/**
 * Recommendation Phase
 * Recommends a leaf node to be expanded upon
 */

/**
 * Find the child Node with the highest UCT
 * @param {Node} node - current node
 * @return {Node} most promising node
 */
let expandNode = (node) => {
  let possibleStates = node.state.getAllPossibleStates();
  // console.log('possbile states', possibleStates);
  possibleStates.forEach(state => {
    let newNode = new Node(state);
    newNode.parent = node;
    newNode.state.playerNo = node.state.getOpponent();
    node.childArray.push(newNode);
  })
}

/**
 * Proprogate function to update socre and visit count from leaf to root
 * @param {Node} nodeToExplore - node coming back from
 * @param {Number} playerNo - player whose turn it is
 */
let backPropogation = (nodeToExplore, playerNo) => {
  let tempNode = nodeToExplore;
  // console.log(tempNode);
  while (tempNode !== undefined) {
    // console.log(tempNode);
    tempNode.state.visitCount++;
    if (tempNode.state.playerNo === playerNo) {
      tempNode.state.addScore(1);
    }
    tempNode = tempNode.parent;
  }
}

let simulateRandomPlayout = (node, opponent) => {

  let tempNode = new Node(null, node);
  let tempState = tempNode.state;
  let boardStatus = tempState.board.checkStatus();

  if (boardStatus === opponent) {
    tempNode.parent.state.winScore = Number.MIN_SAFE_INTEGER;
    return boardStatus;
  }
  while (boardStatus === -1) {
    tempState.togglePlayer();
    tempState.randomPlay();
    boardStatus = tempState.board.checkStatus();
    // console.log('tempState');
  }
  return boardStatus;
}





module.exports = {
  Node: Node,
  Tree: Tree,
  State: State,
  Board: Board,
  MonteCarloTreeSearch: MonteCarloTreeSearch,
  selectPromisingNode: selectPromisingNode,
  UCT: UCT,
  expandNode: expandNode,
  backPropogation: backPropogation,
  simulateRandomPlayout: simulateRandomPlayout
}