var React = require('react');
var GridItem = require('./grid_item');
var BoardStore = require('../stores/board_store');
var BoardActions = require('../actions/board_actions');
var GameLogic = require('../util/game_logic');

var Board = React.createClass({

	getInitialState: function(){
		return {
			board: BoardStore.fetchBoard(this.props.ind),
			currentMark: BoardStore.fetchMark(this.props.ind),
			gameState: BoardStore.fetchGameState(this.props.ind)
		}
	},

	componentDidMount: function(){
		this.boardToke = BoardStore.addListener(this._onChange);
		BoardActions.newGame(this.props.ind);
	},

	componentWillUnmount: function(){
		this.boardToke.remove();
	},

	_onChange: function(){
		this.setState({
			board: BoardStore.fetchBoard(this.props.ind),
			currentMark: BoardStore.fetchMark(this.props.ind),
			gameState: BoardStore.fetchGameState(this.props.ind)
		})
	},

	gridClick: function(pos){
		if (!this.state.gameState){
			BoardActions.placeMark(this.state.currentMark, pos, this.props.ind)
		}
	},

	determineClass: function(pos){
		var cName = "grid-item";
		if (this.state.gameState){
			if (this.state.gameState.seq && this.includes(pos)){
				cName += " winner"
			} else {
				cName += " loser"
			}
		} 

		return cName;
	},

	includes: function(pos){
		var seq = this.state.gameState.seq
		for (var i = 0; i < seq.length; i++) {
			if (JSON.stringify(seq[i]) === JSON.stringify(pos)){
				return true
			}
		}
		return false
	},

	generateGridItems: function(){

		items = []		
		var key = 0
		for (var i = 0; i < 3; i++){
			for (var j = 0; j < 3; j++){

				if (this.state.board){
					var val = this.state.board[i][j];
				}

				var cName = this.determineClass([i,j]);

				items.push(<GridItem 
											key={key} 
											pos={[i,j]} 
											gridClick={this.gridClick} 
											val={val}
											cName={cName}/>)

				key++;

			}
		}

		return items
	},

	handleNewGame: function(){
		BoardActions.newGame(this.props.ind);
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
				<div className="center alert">
					<h2> {text} </h2>
					<span 
						onClick={this.handleNewGame}
						className="button-wrapper new-game-button-wrapper"> New Game </span>
				</div>
			)
		}
	},

	render: function() {
		return (
			<div className="board-container">
				<div className="board group">
					<span className="board-helper"/>
					{this.generateGridItems()}
				</div>
				{this.handleGameEnd()}
			</div>
		);
	}
});

module.exports = Board