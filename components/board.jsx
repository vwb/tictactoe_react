var React = require('react');
var GridItem = require('./grid_item');
var BoardStore = require('../stores/board_store');
var BoardActions = require('../actions/board_actions');
var GameLogic = require('../util/game_logic');

var Board = React.createClass({

	getInitialState: function(){
		return {
			board: BoardStore.fetchBoard(),
			currentMark: BoardStore.fetchMark(),
			gameState: BoardStore.fetchGameState()
		}
	},

	componentDidMount: function(){
		this.boardToke = BoardStore.addListener(this._onChange);
		BoardActions.newGame();
	},

	componentWillUnmount: function(){
		this.boardToke.remove();
	},

	_onChange: function(){
		this.setState({
			board: BoardStore.fetchBoard(),
			currentMark: BoardStore.fetchMark(),
			gameState: BoardStore.fetchGameState()
		})
	},

	gridClick: function(pos){
		if (!this.state.gameState){
			BoardActions.placeMark(this.state.currentMark, pos, this.state.board)
		}
	},

	generateGridItems: function(){

		items = []		
		var key = 0
		for (var i = 0; i < 3; i++){
			for (var j = 0; j < 3; j++){

				if (this.state.board.length > 0){
					var val = this.state.board[i][j];
				}

				items.push(<GridItem key={key} pos={[i,j]} gridClick={this.gridClick} val={val}/>)
				key++;

			}
		}

		return items
	},

	handleNewGame: function(){
		BoardActions.newGame();
	},

	handleGameEnd: function(){
		var gState = this.state.gameState;

		if (gState){
			var text;
			if (gState === "cats"){
				text = "Cats Game!";
			} else {
				text = "Congratulations "+ gState.winningMark;
			}

			return (
				<div className="center">
					<h2> {text} </h2>
					<button onClick={this.handleNewGame}> New Game </button>
				</div>
			)
		}
	},

	render: function() {
		return (
			<div className="board-wrapper">
				{this.handleGameEnd()}
				<div className="board group">
					<span className="board-helper"/>
					{this.generateGridItems()}
				</div>
			</div>
		);
	}
});

module.exports = Board