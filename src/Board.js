export class Board {
  constructor() {
    this.chessboardDom = document.querySelector(".chessboard");
    this._knightStartPosition = null;
    this._knightEndPosition = null;
    this.lastHoveredCell = null;
    this.startText = document.querySelector(".start");
    this.endText = document.querySelector(".end");
    this.shortestPath = null;
  }

  get knightStartPosition() {
    return this._knightStartPosition;
  }

  get knightEndPosition() {
    return this._knightEndPosition;
  }

  static displayShortestPath(node) {
    let stack = [];
    while (node) {
      // Get the dom object that corresponds to the node
      let domNode = findElementByCustomProperty(
        "data-position",
        `{${node.position[0]}, ${node.position[1]}}`
      );

      stack.push(domNode);
      node = node.parent;
    }

    let count = 0;
    while (stack.length > 0) {
      let current = stack.pop();
      current.style.backgroundColor = "rgba(0, 0, 255, 0.5)";
      current.style.color = "orange";
      current.style.fontSize = "2rem";
      current.textContent = count++;
    }
  }

  reset() {
    // If knightStartPosition is not populated abort. No need to reset
    if (!this.knightStartPosition) return;
    let startPosition = this._knightStartPosition;
    let endPosition = this._knightEndPosition;

    this.startText.textContent = "Start: {  }";
    this.endText.textContent = "End: {  }";
    if (!this.shortestPath) {
      if (startPosition) startPosition.removeChild(startPosition.firstChild);
      if (endPosition) endPosition.removeChild(endPosition.firstChild);
    }

    this._knightStartPosition = null;
    this._knightEndPosition = null;
    this.lastHoveredCell = null;
    if (this.shortestPath) {
      this.clearShortestPath(); // Clear dom nodes
      this.shortestPath = null;
    }
  }

  displayEmptyBoard() {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("data-position", `{${i}, ${j}}`);

        if ((i + j) % 2 === 0) {
          cell.classList.add("white");
        } else {
          cell.classList.add("black");
        }

        cell.addEventListener("mouseover", this.onCellHover.bind(this));
        cell.addEventListener("click", this.onCellClick.bind(this));

        this.chessboardDom.appendChild(cell);
      }
    }
  }

  isWhiteCell(cell) {
    return cell.classList.contains("white") ? true : false;
  }

  onCellHover(e) {
    let currentSquare = findParentWithClass(e.target, "cell");
    if (
      currentSquare === this._knightStartPosition ||
      currentSquare === this._knightEndPosition ||
      (this._knightStartPosition && this._knightEndPosition)
    )
      return;
    if (!this.lastHoveredCell) {
      // No cells highlighted yet
      this.lastHoveredCell = e.target;
      this.lastHoveredCell.style.backgroundColor = "green";
      this.lastHoveredCell.style.opacity = 0.5;
    } else {
      // Remove styling from last highlighted
      this.removeHighlight(this.lastHoveredCell);
      // Set new square as last hovered
      this.lastHoveredCell = e.target;
      // Apply highlight effect to new hovered cell
      if (this._knightStartPosition) {
        this.lastHoveredCell.style.backgroundColor = "red";
      } else {
        this.lastHoveredCell.style.backgroundColor = "green";
      }
      this.lastHoveredCell.style.opacity = 0.5;
    }
  }

  onCellClick(e) {
    if (this._knightStartPosition && this._knightEndPosition) return;
    // If _knightStartPosition is null we are selecting the start position
    if (!this._knightStartPosition) {
      let knightStart = document.createElement("div");
      knightStart.style.backgroundColor = "lime";
      knightStart.style.borderRadius = "50%";
      knightStart.style.height = "50%";
      knightStart.style.width = "50%";
      e.target.appendChild(knightStart);
      // Remove styling
      this.removeHighlight(e.target);
      this._knightStartPosition = e.target;
      let startRank = this._knightStartPosition.dataset.position[1];
      let startFile = this._knightStartPosition.dataset.position[4];
      let conversion = convertCoordinates([startRank, startFile]);
      this.startText.textContent = `Start: {${conversion[0]}${conversion[1]}}`;
    } else {
      let knightEnd = document.createElement("div");
      knightEnd.style.backgroundColor = "red";
      knightEnd.style.borderRadius = "50%";
      knightEnd.style.height = "50%";
      knightEnd.style.width = "50%";
      e.target.appendChild(knightEnd);
      // Remove highlight styling
      this.removeHighlight(e.target);
      this._knightEndPosition = e.target;
      let endRank = this._knightEndPosition.dataset.position[1];
      let endFile = this._knightEndPosition.dataset.position[4];
      let conversion = convertCoordinates([endRank, endFile]);
      this.endText.textContent = `End: {${conversion[0]}${conversion[1]}}`;
    }
  }

  removeHighlight(cell) {
    if (this.isWhiteCell(cell)) {
      cell.style.backgroundColor = "white";
    } else {
      cell.style.backgroundColor = "black";
    }
    cell.style.opacity = 1;
  }

  clearShortestPath(node = this.shortestPath) {
    // Base case
    if (!node) return;
    let domNode = findElementByCustomProperty(
      "data-position",
      `{${node.position[0]}, ${node.position[1]}}`
    );
    // Clear the number
    domNode.firstChild.remove();
    // Set the background color
    if (domNode.classList.contains("white")) {
      domNode.style.backgroundColor = "white";
    } else domNode.style.backgroundColor = "black";
    this.clearShortestPath(node.parent);
  }
}

function findParentWithClass(element, className) {
  if (element.classList.contains(className)) return element;
  let parent = element.parentNode;
  while (parent !== null) {
    if (parent.classList.contains(className)) {
      return parent;
    }
    parent = parent.parentNode;
  }
  return null;
}

function findElementByCustomProperty(property, value) {
  const elements = document.querySelectorAll(`[${property}]`);
  for (let i = 0; i < elements.length; i++) {
    let position = elements[i].getAttribute(property);
    if (position === value) {
      return elements[i];
    }
  }
  return null;
}

function convertCoordinates(coords) {
  let rank = coords[0];
  let file = coords[1];
  const rankConversion = [8, 7, 6, 5, 4, 3, 2, 1];
  const fileConversion = ["A", "B", "C", "D", "E", "F", "G", "H"];
  return [fileConversion[file], rankConversion[rank]];
}
