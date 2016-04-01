var React = require('react');
var GameLogic = require('../util/game_logic');

var GridItem = React.createClass({

	handleClick: function(){
		this.props.gridClick(this.props.pos)
	},

	handleSource: function(){
		if (this.props.val && this.props.val === "x"){
			return (<i className="grow grow-fast fa fa-times"></i>)
		} else if (this.props.val && this.props.val === "o") {
			return (<i className="grow grow-fast fa fa-circle-o"></i>)
		} else {
			return (<i className="fa fa-circle-o" style={{color: 'transparent'}}></i>)
		}
	},

	render: function() {
		return (
			<div className={this.props.cName} style={this.props.style} onClick={this.handleClick}> 
				<div className="img-wrapper center">
					{this.handleSource()}
				</div>

			</div>
		);
	}
});

module.exports = GridItem