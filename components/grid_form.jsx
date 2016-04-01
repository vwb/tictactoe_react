var React = require('react');
var BoardActions = require('../actions/board_actions');

var GridForm = React.createClass({

	commitChange: function(val, type){

		if (type === "size"){
			BoardActions.updateGridCount(this.props.id, val);
		} else if (type === "cond"){
			BoardActions.updateWinCondition(this.props.id, val);
		}

	},

	handleClickUp: function(){
		if (this.props.type === "condition"){

			if (this.props.condition < this.props.size){
				this.commitChange(this.props.condition+1, "cond");
			}

		} else {
			this.commitChange(this.props.size+1, "size");
		}
	},

	handleClickDown: function(){
		if (this.props.type === "condition" && this.props.condition > 1){
			this.commitChange(this.props.condition-1, "cond");

		} else if (this.props.type === "size") {
			if (this.props.size === this.props.condition && this.props.condition > 1){
				this.commitChange(this.props.condition-1, "cond");
			}
			this.commitChange(this.props.size-1, "size");
		}
	},

	determineValue: function(){
		if (this.props.type === "condition"){
			return "Need " + this.props.condition + " in a row!"
		} else if (this.props.type === "size"){
			return this.props.size + " x " + this.props.size
		}
	},

	render: function() {
		var cNameDown;
		var cNameUp;

		if (this.props.size === this.props.condition && this.props.type === "condition"){
			cNameUp = "disabled"
		}

		if (this.props.condition === 1 && this.props.type === "condition"){
			cNameDown = "disabled"
		}

		return (
			<div>

				<i className={"fa fa-caret-up arrow up " + cNameUp} onClick={this.handleClickUp}></i>

				<div className="value">
					{this.determineValue()}
				</div>

				<i className={"fa fa-caret-down arrow down " + cNameDown} onClick={this.handleClickDown}></i>

			</div>
		);
	}
});

module.exports = GridForm;