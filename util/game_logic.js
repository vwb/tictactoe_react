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

		//generate initial diagonals going left to right
		for (var j = 3; j <= size; j++){
			var diag = []
			for (var i = 0; i < j; i++) {
				diag.push([i, (j-1-i)])
			}
			seqs.push(diag);
		}

		//generate remaining diagonals going left to right
		var k = 0;
		for (var j = size; j > 3; j--){
			var diag = []
			for (var i = 1; i < j; i++) {
				diag.push([i+k, size-i])
			}
			k++;
			seqs.push(diag);
		}

		//generate initial diaganols going right to left
		for (var j = 0; j < (size-2); j++){
			var diag = [];
			for (var i = 0; i < (size-j) ; i ++){
				diag.push([i, j+i]);
			}
			seqs.push(diag);
		}


		//generate remaining diagonal going right to left
		k = 1
		for (var j = size; j > 3; j--){
			var diag = [];
			for (var i = 0; i < j-1; i++){
				diag.push([k+i,i])
			}
			k++
			seqs.push(diag);
		}

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
			var winner = this._helper(seqs[i], board, condition)
			if (winner) {return winner}
		}
	},

	_helper: function(seq, board, condition){

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