var React = require('react');
var ReactDOM = require('react-dom');
var GameView = require('./components/game_view');


var MyComponent = React.createClass({
  render: function () {
    return(
      <div className="wrapper">
      	<h1 className="center"> Tic Tac Toe </h1>
      	<GameView />
      </div>
    );
  }
});

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<MyComponent />, document.getElementById('main'));
});