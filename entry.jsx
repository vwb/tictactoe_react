var React = require('react');
var ReactDOM = require('react-dom');
var GameView = require('./components/game_view');


var MyComponent = React.createClass({
  render: function () {
    return(
      <div>
	      <div className="center header">
	      	<h1> Tic Tac Toe </h1>
	      </div>
	      	<GameView />
      </div>
    );
  }
});

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<MyComponent />, document.getElementById('main'));
});