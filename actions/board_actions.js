var AppDispatcher = require('../dispatcher');
var BoardConstants = require('../constants/board_constants');
var GameLogic = require('../util/game_logic');

var BoardActions = {
	newGame: function(){
		AppDispatcher.dispatch({
			actionType: BoardConstants.NEW_GAME
		});
	},

	placeMark: function(mark, pos, board){

		AppDispatcher.dispatch({
			actionType: BoardConstants.PLACE_MARK,
			mark: mark,
			pos: pos,
			board: board

		});
	}
};

module.exports = BoardActions