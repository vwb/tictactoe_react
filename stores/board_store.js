var AppDispatcher = require('../dispatcher');
var Store = require('flux/utils').Store;
var BoardConstants = require('../constants/board_constants');
var GameLogic = require('../util/game_logic');

var BoardStore = new Store(AppDispatcher);

_boards = {};

BoardStore.fetchBoard = function(id){
	if (_boards[id]){
		return _boards[id].board
	}
};

BoardStore.fetchMark = function(id){
	if (_boards[id]){
		return _boards[id].mark
	}
};

BoardStore.fetchGameState = function(id){
	if (_boards[id]){
		return _boards[id].state;
	}
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
	}
};

function resetGame(ind){
	_boards[ind] = {};
	_boards[ind].board = [];
	_boards[ind].mark = "x";
	_boards[ind].state = false;

	var board = _boards[ind].board

	for (var i=0; i < 3; i++){
		board.push([])
		for (var j=0; j < 3; j++){
			board[i].push(null)
		}
	}
};

function placeMark(mark, pos, ind){
	var board = _boards[ind].board;

	if (GameLogic.isValidPos(pos) && GameLogic.emptyPos(pos, board)){
		board[pos[0]][pos[1]] = mark;
		toggleMark(ind);

	}

	var result = GameLogic.isOver(board);
	if (result) {
		_boards[ind].state = result;
	}

};

function toggleMark(ind){
	var board = _boards[ind]
	board.mark = board.mark === "x" ? "o" : "x";
};


module.exports = BoardStore;