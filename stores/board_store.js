var AppDispatcher = require('../dispatcher');
var Store = require('flux/utils').Store;
var BoardConstants = require('../constants/board_constants');
var GameLogic = require('../util/game_logic');

var BoardStore = new Store(AppDispatcher);

_boards = {};

BoardStore.fetchBoard = function(id){
	if (_boards[id])  {  return _boards[id].board  }
};

BoardStore.fetchMark = function(id){
	if (_boards[id])  {  return _boards[id].mark  }
};

BoardStore.fetchGameState = function(id){
	if (_boards[id])  {  return _boards[id].state  }
};

BoardStore.fetchGridSize = function(id){
	if (_boards[id])  {	 return _boards[id].size  }	
};

BoardStore.fetchWinCondition = function(id){
	if (_boards[id])  {  return _boards[id].winCondition  }
};

BoardStore.__onDispatch = function(payload){
	switch (payload.actionType){
		case BoardConstants.NEW_GAME:
			resetGame(payload.ind);
			BoardStore.__emitChange();
			break;
		case BoardConstants.PLACE_MARK:
			placeMark(payload.mark, payload.pos, payload.ind);
			BoardStore.__emitChange();
			break;
		case BoardConstants.UPDATE_GRID:
			resetGrid(payload.ind, payload.size);
			BoardStore.__emitChange();
			break;
		case BoardConstants.UPDATE_WIN_CONDITION:
			setWinCondition(payload.ind, payload.cond)
			BoardStore.__emitChange();
			break;
	}
};

function resetGrid(id, size){
	_boards[id].size = size;
	resetGame(id);
};

function setWinCondition(id, amount){
	_boards[id].winCondition = amount
}

function resetGame(ind){
	if (!_boards[ind]){
		_boards[ind] = {};
		_boards[ind].winCondition = 3;
	}

	_boards[ind].board = [];
	_boards[ind].mark = "x";
	_boards[ind].state = false;

	if (!_boards[ind].size){
		_boards[ind].size = 3
	}

	var board = _boards[ind].board

	for (var i=0; i < _boards[ind].size; i++){
		board.push([])
		for (var j=0; j < _boards[ind].size; j++){
			board[i].push(null)
		}
	}
};

function placeMark(mark, pos, ind){
	var board = _boards[ind].board;

	if (GameLogic.isValidPos(pos, board) && GameLogic.emptyPos(pos, board)){
		board[pos[0]][pos[1]] = mark;
		_toggleMark(ind);
	}

	var result = GameLogic.isOver(board, _boards[ind].winCondition);
	if (result) {
		_boards[ind].state = result;
	}

};

function _toggleMark(ind){
	var board = _boards[ind]
	board.mark = board.mark === "x" ? "o" : "x";
};


module.exports = BoardStore;