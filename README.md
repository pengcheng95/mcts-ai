# mcts-ai
This library allows you to create your own simple Monte Carlo Tree Search AI

## Note
Currently Only works for two player board games where all pieces are identical. 

## Usage
Require the module
```
const MCTS = require("mcts-ai").MCTS;
```

To create a game, call the MCTS constructor
```
let game = MCTS();
```
By default it creates a 3x3 board with the ai taking 100 milliseconds per move. 

You can customize the game by giving it different amounts of time for the ai to find next moves
```
let game = MCTS(1000);
```

You can also customize the game by customizing board size. For boards where height and width are not equal to three you will also have to give the ai a function to test for game status. The board is an array matrix with each row of the board represented by an array. 0 represents an empty spot. 1 a spot taken by player 1. 2 a spot taken by player two.
```
let game = MCTS(null, 5, function() {
	// write function to check game status
	// access board through this.boardValues
	// return -1 for incomplete game
	// return 0 for tie game
	// return 1 for player 1 victory
	// return 2 for player 2 victory
})
```