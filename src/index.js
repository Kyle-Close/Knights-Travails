import { Board, displayShortestPath } from "./Board";
import { Node, getValidMoves } from "./Node";

const gameBoard = new Board();
gameBoard.displayEmptyBoard();

let resetButton = document.querySelector(".reset");
let calculateButton = document.querySelector(".calculate");

resetButton.addEventListener("click", () => {
  gameBoard.reset();
});

calculateButton.addEventListener("click", () => {
  let startPosition = gameBoard.knightStartPosition;
  let endPosition = gameBoard.knightEndPosition;
  // Get the positions and create the start and end nodes
  startPosition = startPosition.dataset.position;
  endPosition = endPosition.dataset.position;
  // Convert to number array
  let startFinalArray = [Number(startPosition[1]), Number(startPosition[4])];
  let endFinalArray = [Number(endPosition[1]), Number(endPosition[4])];
  // Create the two nodes
  let startNode = new Node(startFinalArray);
  // Find shortest path
  let shortestPath = Node.shortestPath(startNode, endFinalArray);
  Board.displayShortestPath(shortestPath);
});
