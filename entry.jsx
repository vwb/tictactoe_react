var React = require('react');
var ReactDOM = require('react-dom');
var Board = require('./components/board');


var MyComponent = React.createClass({
  render: function () {
    return(
      <div>
      	<h1 className="center"> Tic Tac Toe </h1>
      	<Board/>
      </div>
    );
  }
});

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<MyComponent />, document.getElementById('main'));
});