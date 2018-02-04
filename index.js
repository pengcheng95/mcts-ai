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

exports.printClasses = function() {
  console.log("should print out classes: ", classes);
}