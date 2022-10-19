const board = [];
const graph = [];
let index = [];

const Square = (data, predecessor, distance) => {
  return { data, predecessor, distance };
};

const gameBoard = () => {
  // create 8x8 game board
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      board.push(Square([i, j], null, null));
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
  if (item.data[1] === 7) {
    graph.push(index);
    index = [];
  }
};

const createMoves = (item) => {
  const one = [item.data[0] + 2, item.data[1] + 1];
  const two = [item.data[0] + 1, item.data[1] + 2];
  const three = [item.data[0] - 1, item.data[1] + 2];
  const four = [item.data[0] - 2, item.data[1] + 1];
  const five = [item.data[0] - 2, item.data[1] - 1];
  const six = [item.data[0] - 1, item.data[1] - 2];
  const seven = [item.data[0] + 1, item.data[1] - 2];
  const eight = [item.data[0] + 2, item.data[1] - 1];
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

const print = (child) => {
  let predecessor = `[${child.data}]`;

  // recursively print child's predecessor until source is reached
  const traverse = (child) => {
    if (child.predecessor === null) return predecessor;
    else {
      predecessor = `[${child.predecessor.data}] ${predecessor}`;
      return traverse(child.predecessor);
    }
  };
  return traverse(child);
};

// array to add and remove squares to visit
let queue = [];

// array to store all visited squares, reset distance and predescessor values once target found
let reset = [];

const search = (source, children, target, distance) => {
  children.forEach((child) => {
    // convert graphical square reference to actual square object
    child = board.find(
      (element) => element.data[0] === child[0] && element.data[1] === child[1]
    );

    // check whether square has been visited, set values and add to arrays if not
    if (child.distance === null) {
      child.distance = source.distance + 1;
      child.predecessor = source;
      queue.push(child);
      reset.push(child);
    }
  });
  const currentChild = queue[0];
  if (JSON.stringify(currentChild.data) === JSON.stringify(target)) {
    const path = print(currentChild);
    queue = [];
    reset.forEach((item) => {
      item.distance = null;
      item.predecessor = null;
    });
    reset = [];
    return path;
  } else {
    // remove current element from queue, recursively perform search on next element
    queue.shift();
    return search(
      currentChild,
      graph[currentChild.data[0]][currentChild.data[1]],
      target,
      distance + 1
    );
  }
};

const knightMoves = (source, target) => {
  moves();
  if (JSON.stringify(source) === JSON.stringify(target)) return source;
  else {
    // convert graphical square reference to actual square object
    const sourceSquare = board.find(
      (element) =>
        element.data[0] === source[0] && element.data[1] === source[1]
    );
    const distance = (sourceSquare.distance = 0);
    reset.push(sourceSquare);
    return search(sourceSquare, graph[source[0]][source[1]], target, distance);
  }
};
