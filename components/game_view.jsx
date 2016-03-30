var React = require("react");
var Board = require('./board');

var GameView = React.createClass({
	getInitialState: function(){
		return {
			boardCount: 1
		};
	},
	
	generateBoards: function(){
		var result = [];

		for (var i = 0; i < this.state.boardCount; i++) {
			result.push((<Board key={i} ind={i}/>))
		}

		return result;
	},

	handleAddBoard: function(e){
		e.preventDefault();
		var numBoards = this.state.boardCount + 1
		this.setState({boardCount: numBoards});
	},

	render: function() {
		return (
			<div className="game-view wrapper">
				<div className="button-wrapper">
					<i onClick={this.handleAddBoard} className="fa fa-plus"></i>
				</div>
				<div className="board-wrapper">
					{this.generateBoards()}
				</div>
			</div>
		);
	}
});

module.exports = GameView;