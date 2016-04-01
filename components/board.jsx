var React = require('react');
var GridItem = require('./grid_item');
var BoardStore = require('../stores/board_store');
var BoardActions = require('../actions/board_actions');
var GameLogic = require('../util/game_logic');
var GridForm = require('./grid_form');

var Board = React.createClass({

	getInitialState: function(){
		return {
			board: BoardStore.fetchBoard(this.props.ind),
			currentMark: BoardStore.fetchMark(this.props.ind),
			gameState: BoardStore.fetchGameState(this.props.ind),
			gridSize: BoardStore.fetchGridSize(this.props.ind),
			winCondition: BoardStore.fetchWinCondition(this.props.ind)
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
			gameState: BoardStore.fetchGameState(this.props.ind),
			gridSize: BoardStore.fetchGridSize(this.props.ind),
			winCondition: BoardStore.fetchWinCondition(this.props.ind)
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

		var style = {
			width: (100 / this.state.gridSize) + "%",
			fontSize: (((1/this.state.gridSize)*50) * 0.6) + "vw"
		};

		for (var i = 0; i < this.state.gridSize; i++){
			for (var j = 0; j < this.state.gridSize; j++){

				if (this.state.board){
					var val = this.state.board[i][j];
				}

				var cName = this.determineClass([i,j]);

				items.push(<GridItem 
											key={key} 
											pos={[i,j]} 
											gridClick={this.gridClick} 
											val={val}
											cName={cName}
											style={style}/>)

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
				<div className="center alert fade-in">
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

				<div className="form-wrapper grid-size">
					<GridForm 
						id={this.props.ind} 
						size={this.state.gridSize}
						condition={this.state.winCondition}
						type="size"/>
				</div>

				<div className="form-wrapper win-condition">
					<GridForm 
						id={this.props.ind}
						condition={this.state.winCondition}
						size={this.state.gridSize}
						type="condition"/>
				</div>


				<div className="board group">
					<div>
					<span className="board-helper"/>
					</div>
					{this.generateGridItems()}

				</div>
				{this.handleGameEnd()}
			</div>
		);
	}
});

module.exports = Board