export class Node {
  constructor(position) {
    this.position = position;
    this.parent = null;
    this.children = [];
  }

  static shortestPath(root, target) {
    let queue = [];
    let visited = new Set();

    root.children = getValidMoves(root, visited);

    // Push the children of root into queue
    root.children.forEach((child) => {
      queue.push(child);
    });

    while (queue.length !== 0) {
      // Pop off the first node in queue as currentNode
      let currentNode = queue.shift();

      // Check for a match
      if (arraysEqual(currentNode.position, target)) return currentNode;

      // If no match, calculate all possible moves from this position
      currentNode.children = getValidMoves(currentNode, visited);

      // Push the children of root into queue
      currentNode.children.forEach((child) => {
        queue.push(child);
      });
    }
  }
}

export function getValidMoves(node, visited) {
  let result = [];
  // position = (x, y)
  let x = node.position[0];
  let y = node.position[1];
  result[0] = [x - 1, y - 2];
  result[1] = [x - 2, y - 1];
  result[2] = [x - 2, y + 1];
  result[3] = [x - 1, y + 2];
  result[4] = [x + 1, y + 2];
  result[5] = [x + 2, y + 1];
  result[6] = [x + 2, y - 1];
  result[7] = [x + 1, y - 2];
  // Remove any elements with negative values (x or y) as they are off the board
  let filtered = result.filter(
    (position) =>
      position[0] >= 0 && position[0] < 8 && position[1] >= 0 && position[1] < 8
  );

  // Filter out positions that have already been visited
  filtered = filtered.filter(
    (position) => !visited.has(`${position[0]},${position[1]}`)
  ); // Convert position to string for easier set operations

  // Create array of nodes based on the filter
  let nodeArray = [];
  filtered.forEach((position) => {
    let newNode = new Node(position);
    newNode.parent = node;
    nodeArray.push(newNode);

    visited.add(position.toString()); // Mark the new position as visited
  });

  return nodeArray;
}

function arraysEqual(arr1, arr2) {
  // Check if the arrays have the same length
  if (arr1.length !== arr2.length) {
    return false;
  }
  // Check if each element is the same
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}
