/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Board.js":
/*!**********************!*\
  !*** ./src/Board.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Board\": () => (/* binding */ Board)\n/* harmony export */ });\nclass Board {\n  constructor() {\n    this.chessboardDom = document.querySelector(\".chessboard\");\n    this.__knightStartPosition = null;\n    this._knightEndPosition = null;\n    this.lastHoveredCell = null;\n    this.startText = document.querySelector(\".start\");\n    this.endText = document.querySelector(\".end\");\n  }\n\n  get knightStartPosition() {\n    return this._knightStartPosition;\n  }\n\n  get knightEndPosition() {\n    return this._knightEndPosition;\n  }\n\n  static displayShortestPath(node) {\n    let stack = [];\n    while (node) {\n      // Get the dom object that corresponds to the node\n      let domNode = findElementByCustomProperty(\n        \"data-position\",\n        `{${node.position[0]}, ${node.position[1]}}`\n      );\n\n      stack.push(domNode);\n      node = node.parent;\n      //domNode.style.backgroundColor = \"blue\";\n      //domNode.style.opacity = 0.5;\n\n      //domNode.textContent = count;\n    }\n\n    let count = 0;\n    while (stack.length > 0) {\n      let current = stack.pop();\n      current.style.backgroundColor = \"rgba(0, 0, 255, 0.5)\";\n      current.style.color = \"green\";\n      current.style.fontSize = \"2rem\";\n      current.textContent = count++;\n      console.log(current);\n    }\n  }\n\n  reset() {\n    this.startText.textContent = \"Start: {x,x}\";\n    this.endText.textContent = \"End: {x,x}\";\n    this._knightStartPosition.querySelector(\"div\").remove();\n    this._knightStartPosition = null;\n    this._knightEndPosition.querySelector(\"div\").remove();\n    this._knightEndPosition = null;\n    this.lastHoveredCell = null;\n  }\n\n  displayEmptyBoard() {\n    for (let i = 0; i < 8; i++) {\n      for (let j = 0; j < 8; j++) {\n        const cell = document.createElement(\"div\");\n        cell.classList.add(\"cell\");\n        cell.setAttribute(\"data-position\", `{${i}, ${j}}`);\n\n        if ((i + j) % 2 === 0) {\n          cell.classList.add(\"white\");\n        } else {\n          cell.classList.add(\"black\");\n        }\n\n        cell.addEventListener(\"mouseover\", this.onCellHover.bind(this));\n        cell.addEventListener(\"click\", this.onCellClick.bind(this));\n\n        this.chessboardDom.appendChild(cell);\n      }\n    }\n  }\n\n  isWhiteCell(cell) {\n    return cell.classList.contains(\"white\") ? true : false;\n  }\n\n  onCellHover(e) {\n    let currentSquare = findParentWithClass(e.target, \"cell\");\n    if (\n      currentSquare === this._knightStartPosition ||\n      currentSquare === this._knightEndPosition ||\n      (this._knightStartPosition && this._knightEndPosition)\n    )\n      return;\n    if (!this.lastHoveredCell) {\n      // No cells highlighted yet\n      this.lastHoveredCell = e.target;\n      this.lastHoveredCell.style.backgroundColor = \"green\";\n      this.lastHoveredCell.style.opacity = 0.5;\n    } else {\n      // Remove styling from last highlighted\n      this.removeHighlight(this.lastHoveredCell);\n      // Set new square as last hovered\n      this.lastHoveredCell = e.target;\n      // Apply highlight effect to new hovered cell\n      if (this._knightStartPosition) {\n        this.lastHoveredCell.style.backgroundColor = \"red\";\n      } else {\n        this.lastHoveredCell.style.backgroundColor = \"green\";\n      }\n      this.lastHoveredCell.style.opacity = 0.5;\n    }\n  }\n\n  onCellClick(e) {\n    if (this._knightStartPosition && this._knightEndPosition) return;\n    // If _knightStartPosition is null we are selecting the start position\n    if (!this._knightStartPosition) {\n      let knightStart = document.createElement(\"div\");\n      knightStart.style.backgroundColor = \"lime\";\n      knightStart.style.borderRadius = \"50%\";\n      knightStart.style.height = \"50%\";\n      knightStart.style.width = \"50%\";\n      e.target.appendChild(knightStart);\n      // Remove styling\n      this.removeHighlight(e.target);\n      this._knightStartPosition = e.target;\n      this.startText.textContent = `Start: ${this._knightStartPosition.dataset.position}`;\n    } else {\n      let knightEnd = document.createElement(\"div\");\n      knightEnd.style.backgroundColor = \"red\";\n      knightEnd.style.borderRadius = \"50%\";\n      knightEnd.style.height = \"50%\";\n      knightEnd.style.width = \"50%\";\n      e.target.appendChild(knightEnd);\n      // Remove highlight styling\n      this.removeHighlight(e.target);\n      this._knightEndPosition = e.target;\n      this.endText.textContent = `End: ${this._knightEndPosition.dataset.position}`;\n    }\n  }\n\n  removeHighlight(cell) {\n    if (this.isWhiteCell(cell)) {\n      cell.style.backgroundColor = \"white\";\n    } else {\n      cell.style.backgroundColor = \"black\";\n    }\n    cell.style.opacity = 1;\n  }\n}\n\nfunction findParentWithClass(element, className) {\n  if (element.classList.contains(className)) return element;\n  let parent = element.parentNode;\n  while (parent !== null) {\n    if (parent.classList.contains(className)) {\n      return parent;\n    }\n    parent = parent.parentNode;\n  }\n  return null;\n}\n\nfunction findElementByCustomProperty(property, value) {\n  const elements = document.querySelectorAll(`[${property}]`);\n  for (let i = 0; i < elements.length; i++) {\n    let position = elements[i].getAttribute(property);\n    if (position === value) {\n      return elements[i];\n    }\n  }\n  return null;\n}\n\n\n//# sourceURL=webpack://knights-travails/./src/Board.js?");

/***/ }),

/***/ "./src/Node.js":
/*!*********************!*\
  !*** ./src/Node.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Node\": () => (/* binding */ Node),\n/* harmony export */   \"getValidMoves\": () => (/* binding */ getValidMoves)\n/* harmony export */ });\nclass Node {\n  constructor(position) {\n    this.position = position;\n    this.parent = null;\n    this.children = [];\n  }\n\n  static shortestPath(root, target) {\n    let queue = [];\n    let visited = new Set();\n\n    root.children = getValidMoves(root, visited);\n\n    // Push the children of root into queue\n    root.children.forEach((child) => {\n      queue.push(child);\n    });\n\n    while (queue.length !== 0) {\n      // Pop off the first node in queue as currentNode\n      let currentNode = queue.shift();\n\n      // Check for a match\n      if (arraysEqual(currentNode.position, target)) return currentNode;\n\n      // If no match, calculate all possible moves from this position\n      currentNode.children = getValidMoves(currentNode, visited);\n\n      // Push the children of root into queue\n      currentNode.children.forEach((child) => {\n        queue.push(child);\n      });\n    }\n  }\n}\n\nfunction getValidMoves(node, visited) {\n  let result = [];\n  // position = (x, y)\n  let x = node.position[0];\n  let y = node.position[1];\n  result[0] = [x - 1, y - 2];\n  result[1] = [x - 2, y - 1];\n  result[2] = [x - 2, y + 1];\n  result[3] = [x - 1, y + 2];\n  result[4] = [x + 1, y + 2];\n  result[5] = [x + 2, y + 1];\n  result[6] = [x + 2, y - 1];\n  result[7] = [x + 1, y - 2];\n  // Remove any elements with negative values (x or y) as they are off the board\n  let filtered = result.filter(\n    (position) =>\n      position[0] >= 0 && position[0] < 8 && position[1] >= 0 && position[1] < 8\n  );\n\n  // Filter out positions that have already been visited\n  filtered = filtered.filter(\n    (position) => !visited.has(`${position[0]},${position[1]}`)\n  ); // Convert position to string for easier set operations\n\n  // Create array of nodes based on the filter\n  let nodeArray = [];\n  filtered.forEach((position) => {\n    let newNode = new Node(position);\n    newNode.parent = node;\n    nodeArray.push(newNode);\n\n    visited.add(position.toString()); // Mark the new position as visited\n  });\n\n  return nodeArray;\n}\n\nfunction arraysEqual(arr1, arr2) {\n  // Check if the arrays have the same length\n  if (arr1.length !== arr2.length) {\n    return false;\n  }\n  // Check if each element is the same\n  for (let i = 0; i < arr1.length; i++) {\n    if (arr1[i] !== arr2[i]) {\n      return false;\n    }\n  }\n  return true;\n}\n\n\n//# sourceURL=webpack://knights-travails/./src/Node.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Board */ \"./src/Board.js\");\n/* harmony import */ var _Node__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Node */ \"./src/Node.js\");\n\n\n\nconst gameBoard = new _Board__WEBPACK_IMPORTED_MODULE_0__.Board();\ngameBoard.displayEmptyBoard();\n\nlet resetButton = document.querySelector(\".reset\");\nlet calculateButton = document.querySelector(\".calculate\");\n\nresetButton.addEventListener(\"click\", () => {\n  gameBoard.reset();\n});\n\ncalculateButton.addEventListener(\"click\", () => {\n  let startPosition = gameBoard.knightStartPosition;\n  let endPosition = gameBoard.knightEndPosition;\n  // Get the positions and create the start and end nodes\n  startPosition = startPosition.dataset.position;\n  endPosition = endPosition.dataset.position;\n  // Convert to number array\n  let startFinalArray = [Number(startPosition[1]), Number(startPosition[4])];\n  let endFinalArray = [Number(endPosition[1]), Number(endPosition[4])];\n  // Create the two nodes\n  let startNode = new _Node__WEBPACK_IMPORTED_MODULE_1__.Node(startFinalArray);\n  // Find shortest path\n  let shortestPath = _Node__WEBPACK_IMPORTED_MODULE_1__.Node.shortestPath(startNode, endFinalArray);\n  _Board__WEBPACK_IMPORTED_MODULE_0__.Board.displayShortestPath(shortestPath);\n});\n\n\n//# sourceURL=webpack://knights-travails/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;