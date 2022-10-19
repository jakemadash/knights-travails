const board = [];
const movesBoard = [];

const Square = (data, one, two, three, four, five, six, seven, eight) => {
  return { data, one, two, three, four, five, six, seven, eight };
};

const gameBoard = () => {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      board.push(Square([i, j]));
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

const addMoves = (item) => {
  const one = [item.data[0] + 2, item.data[1] + 1];
  const two = [item.data[0] + 1, item.data[1] + 2];
  const three = [item.data[0] - 1, item.data[1] + 2];
  const four = [item.data[0] - 2, item.data[1] + 1];
  const five = [item.data[0] - 2, item.data[1] - 1];
  const six = [item.data[0] - 1, item.data[1] - 2];
  const seven = [item.data[0] + 1, item.data[1] - 2];
  const eight = [item.data[0] + 2, item.data[1] - 1];
  const moves = [one, two, three, four, five, six, seven, eight];
  const squareMoves = [];
  moves.forEach((move) => {
    if (move[0] >= 0 && move[0] <= 7 && move[1] >= 0 && move[1] <= 7) {
      const validMove = board.find(
        (element) => element.data[0] === move[0] && element.data[1] === move[1]
      );
      squareMoves.push(validMove);
    } else squareMoves.push(null);
  });
  // squareData.forEach((item) => {
  //   addMoves(item);
  // });
  item = Square(item.data, ...squareMoves);
  return item;
};

const moves = () => {
  gameBoard();
  board.forEach((item) => {
    const newItem = addMoves(item);
    board.shift();
    board.push(newItem);
  });
  return board;
};

const graph = moves();
