var AppDispatcher = require('../dispatcher');
var Store = require('flux/utils').Store;
var BoardConstants = require('../constants/board_constants');
var GameLogic = require('../util/game_logic');

var BoardStore = new Store(AppDispatcher);


_board = [];
_currentMark = "x";
_gameState = false;

BoardStore.fetchBoard = function(){
	return _board
};

BoardStore.fetchMark = function(){
	return _currentMark;
};

BoardStore.fetchGameState = function(){
	return _gameState;
};

BoardStore.__onDispatch = function(payload){
	switch (payload.actionType){
		case BoardConstants.NEW_GAME:
			resetGame();
			BoardStore.__emitChange();
			break;
		case BoardConstants.PLACE_MARK:
			placeMark(payload.mark, payload.pos, payload.board);
			BoardStore.__emitChange();
			break;
	}
};

function resetGame(){
	_gameState = false;
	_currentMark = "x";
	_board = [];

	for (var i=0; i < 3; i++){
		_board.push([])
		for (var j=0; j < 3; j++){
			_board[i].push(null)
		}
	}
};

function placeMark(mark, pos, board){

	if (GameLogic.isValidPos(pos) && GameLogic.emptyPos(pos, board)){
		_board[pos[0]][pos[1]] = mark;
		toggleMark();
	}

	var result = GameLogic.isOver(_board);
	if (result) {
		_gameState = result
	}

};

function toggleMark(){
	_currentMark = _currentMark === "x" ? "o" : "x";
};

function gameEnd(result){
	_gameState = result;
}

module.exports = BoardStore;