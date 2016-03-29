var GameLogic = {

	marks: ["x", "o"],
	posSeqs: [
    // horizontals
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    // verticals
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    // diagonals
    [[0, 0], [1, 1], [2, 2]],
    [[2, 0], [1, 1], [0, 2]]
  ],

	isOver: function(board){

		var winner = this.gameWon(board);
		if (winner){
			return winner;
		}

		if (this.movesRemain(board)){
			return false
		} else {
			return "cats"
		}
	},

	isValidPos: function(pos){
		return (
			(0 <= pos[0]) && (2 >= pos[0]) && (0 <= pos[1]) && (2 >= pos[1])
		)
	},

	emptyPos: function(pos, board){
		if (board[pos[0]][pos[1]] === null){
			return true;
		} else {
			return false;
		}
	},

	movesRemain: function(board){
		for (var i = 0; i < board.length; i++){
			for (var j = 0; j < board[i].length; j++){
				if (board[i][j] === null) {return true}
			}
		}
		return false;
	},

	gameWon: function(board){
		for (var i = 0; i < this.posSeqs.length; i++){
			var winner = this._helper(this.posSeqs[i], board)
			if (winner){
				return {winningMark: winner, seq: this.posSeqs[i]}
			}
		}
	},

	_helper: function(seq, board){
		
		for (var markIdx = 0; markIdx < this.marks.length; markIdx++){
			var mark = this.marks[markIdx]
			var winner = true;
			for (var posIdx = 0; posIdx < seq.length; posIdx++){
				var pos = seq[posIdx]
				if (board[pos[0]][pos[1]] !== mark) {winner = false}
			}
			if (winner){
				return mark
			}
		}
		return null
	}
};

module.exports = GameLogic