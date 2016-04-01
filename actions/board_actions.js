var AppDispatcher = require('../dispatcher');
var BoardConstants = require('../constants/board_constants');
var GameLogic = require('../util/game_logic');

var BoardActions = {
	newGame: function(id){
		AppDispatcher.dispatch({
			actionType: BoardConstants.NEW_GAME,
			ind: id
		});
	},

	placeMark: function(mark, pos, ind){

		AppDispatcher.dispatch({
			actionType: BoardConstants.PLACE_MARK,
			mark: mark,
			pos: pos,
			ind: ind

		});
	},

	updateGridCount: function(id, size){
		AppDispatcher.dispatch({
			actionType: BoardConstants.UPDATE_GRID,
			size: size,
			ind: id
		})
	},

	updateWinCondition: function(id, cond){
		AppDispatcher.dispatch({
			actionType: BoardConstants.UPDATE_WIN_CONDITION,
			ind: id,
			cond: cond
		})
	}
};

module.exports = BoardActions