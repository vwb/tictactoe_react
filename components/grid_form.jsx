var React = require('react');
var BoardActions = require('../actions/board_actions');

var GridForm = React.createClass({
	getInitialState: function(){
		return {
			numGrids: this.props.size
		};
	},

	componentWillReceiveProps: function(newProps){
		this.setState({numGrids: newProps.size})
	},

	commitChange: function(val){
		BoardActions.updateGridCount(this.props.id, val);
	},

	handleClickUp: function(){
		this.commitChange(this.state.numGrids+1);

	},

	handleClickDown: function(){
		if (this.state.numGrids > 3){
			this.commitChange(this.state.numGrids-1)
		}
	},

	render: function() {
		return (
			<div>
				<i className="fa fa-caret-up arrow up" onClick={this.handleClickUp}></i>

				<div className="value">
					{this.props.size + " x " + this.props.size}
				</div>

				<i className="fa fa-caret-down arrow down" onClick={this.handleClickDown}></i>

			</div>
		);
	}
});

module.exports = GridForm;