const board = [];
const graph = [];
let index = [];

const gameBoard = () => {
  // create 8x8 game board
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      board.push([i, j]);
    }
  }
  return board;
};

const addMoves = (moves, item) => {
  const squareMoves = [];

  // check for valid moves within game board boundaries
  moves.forEach((move) => {
    if (move[0] >= 0 && move[0] <= 7 && move[1] >= 0 && move[1] <= 7) {
      squareMoves.push(move);
    }
  });
  index.push(squareMoves);

  // complete graph index at end of game board row, clear index to start new row
  if (item[1] === 7) {
    graph.push(index);
    index = [];
  }
};

const createMoves = (item) => {
  const one = [item[0] + 2, item[1] + 1];
  const two = [item[0] + 1, item[1] + 2];
  const three = [item[0] - 1, item[1] + 2];
  const four = [item[0] - 2, item[1] + 1];
  const five = [item[0] - 2, item[1] - 1];
  const six = [item[0] - 1, item[1] - 2];
  const seven = [item[0] + 1, item[1] - 2];
  const eight = [item[0] + 2, item[1] - 1];
  const moves = [one, two, three, four, five, six, seven, eight];
  addMoves(moves, item);
};

const moves = () => {
  gameBoard();
  board.forEach((item) => {
    createMoves(item);
  });
  return graph;
};

const wow = moves();
