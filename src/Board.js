export class Board {
  constructor() {
    this.chessboardDom = document.querySelector(".chessboard");
    this.__knightStartPosition = null;
    this._knightEndPosition = null;
    this.lastHoveredCell = null;
    this.startText = document.querySelector(".start");
    this.endText = document.querySelector(".end");
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
      //domNode.style.backgroundColor = "blue";
      //domNode.style.opacity = 0.5;

      //domNode.textContent = count;
    }

    let count = 0;
    while (stack.length > 0) {
      let current = stack.pop();
      current.style.backgroundColor = "rgba(0, 0, 255, 0.5)";
      current.style.color = "green";
      current.style.fontSize = "2rem";
      current.textContent = count++;
      console.log(current);
    }
  }

  reset() {
    this.startText.textContent = "Start: {x,x}";
    this.endText.textContent = "End: {x,x}";
    this._knightStartPosition.querySelector("div").remove();
    this._knightStartPosition = null;
    this._knightEndPosition.querySelector("div").remove();
    this._knightEndPosition = null;
    this.lastHoveredCell = null;
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
      this.startText.textContent = `Start: ${this._knightStartPosition.dataset.position}`;
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
      this.endText.textContent = `End: ${this._knightEndPosition.dataset.position}`;
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
