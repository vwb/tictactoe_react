var GameLogic = {

	marks: ["x", "o"],
	seenSeqs: {},
	
	posSeqs: function(size){
		
		//memoize previously seen sizes
		if (this.seenSeqs[size]) {return this.seenSeqs[size]}
		var seqs = [];

		//generate horizontals and verticals
		for (var i = 0; i < size; i++) {
			var horizontalArray = [];
			var verticalArray = [];
			for (var j = 0; j < size; j++){
				horizontalArray.push([i,j])
				verticalArray.push([j,i])
			}
			seqs.push(horizontalArray);
			seqs.push(verticalArray);
		}

		//generate diagonals 
		for (var j = 0; j < size; j++){
			var diagLeftTop = [];
			var diagLeftBottom = [];
			var diagRightTop = [];
			var diagRightBottom = [];
			for (var i = 0; i <= j; i++){
				diagLeftTop.push([i, j-i])
				diagLeftBottom.push([size-1-i, size-1-j+i])

				diagRightTop.push([j-i, size-1-i])
				diagRightBottom.push([size-1-i, j-i])
			}
			seqs.push(diagLeftTop);
			seqs.push(diagLeftBottom);
			seqs.push(diagRightTop);
			seqs.push(diagRightBottom);
		};

		this.seenSeqs[size] = seqs;
		return seqs;
	},

	isOver: function(board, condition){

		var winner = this.gameWon(board, condition);
		if (winner){
			return winner;
		}

		if (this.movesRemain(board)){
			return false
		} else {
			return "cats"
		}
	},

	isValidPos: function(pos, board){
		return (
			(0 <= pos[0]) && (board.length >= pos[0]) && (0 <= pos[1]) && (board.length >= pos[1])
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

	gameWon: function(board, condition){
		var seqs = this.posSeqs(board.length);

		for (var i = 0; i < seqs.length; i++){
			var winner = this.checkWin(seqs[i], board, condition)
			if (winner) {return winner}
		}
	},

	checkWin: function(seq, board, condition){

		for (var markIdx = 0; markIdx < this.marks.length; markIdx++){
			var mark = this.marks[markIdx]
			var winner = true;
			var contiguous = 0;
			var result = [];

			for (var posIdx = 0; posIdx < seq.length; posIdx++){
				var pos = seq[posIdx]

				if (board[pos[0]][pos[1]] !== mark) {
					result = []
					contiguous = 0
				} else {
					result.push(pos)
					contiguous++
				}

				if (contiguous === condition){
					return {winningMark: mark, seq: result}
				}
			}
		}
		return null
	},
};

module.exports = GameLogic