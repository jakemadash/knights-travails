const board = [];
const graph = [];

const Square = (data, one, two, three, four, five, six, seven, eight) => {
  return { data, one, two, three, four, five, six, seven, eight };
};

const gameBoard = () => {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      board.push([i, j]);
    }
  }
  return board;
};

// function isArrayInArray(arr, item) {
//   const itemAsString = JSON.stringify(item);

//   const contains = arr.some(function (ele) {
//     return JSON.stringify(ele) === itemAsString;
//   });
//   return contains;
// }

// const establishedNodes = [];

let index = [];

const addMoves = (item) => {
  const one = [item[0] + 2, item[1] + 1];
  const two = [item[0] + 1, item[1] + 2];
  const three = [item[0] - 1, item[1] + 2];
  const four = [item[0] - 2, item[1] + 1];
  const five = [item[0] - 2, item[1] - 1];
  const six = [item[0] - 1, item[1] - 2];
  const seven = [item[0] + 1, item[1] - 2];
  const eight = [item[0] + 2, item[1] - 1];
  const moves = [one, two, three, four, five, six, seven, eight];
  const squareMoves = [];
  moves.forEach((move) => {
    if (move[0] >= 0 && move[0] <= 7 && move[1] >= 0 && move[1] <= 7) {
      squareMoves.push(move);
    }
  });
  index.push(squareMoves);
  if (item[1] === 7) {
    graph.push(index);
    index = [];
  }
};

const moves = () => {
  gameBoard();
  board.forEach((item) => {
    addMoves(item);
  });
  return graph;
};

const wow = moves();
