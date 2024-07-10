"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnectedSinks = getConnectedSinks;
/**
 * -- Problem -----
 * We have a pipe system represented by a 2D rectangular grid of cells. There are three different types of objects located in cells in the grid,
 * with each cell having either 0 objects or 1 object:
 *
 * Source: There is 1 source in the system. It is represented by the asterisk character '*'.
 * Sinks: There are an arbitrary number of sinks in the system. They are each represented by a different uppercase letter ('A', 'B', 'C', etc.).
 * Pipes: There are 10 different shapes of pipes, represented by the following characters: '═', '║', '╔', '╗', '╚', '╝', '╠', '╣', '╦', '╩'.
 *
 * Note that each pipe has openings on 2 or 3 sides of its cell.
 *
 * Two adjacent cells are connected if both have a pipe opening at their shared edge.
 *
 * For example, the two cells '╩ ╦' are connected to each other through their shared edge. The two cells '╩ ╔' are not connected to each other
 * through their shared edge, but they could possibly still be connected via a path through other cells around them.
 *
 * Treat the source and sinks as having pipe openings at all of their edges. For example, the two cells 'A ╦' are connected through their shared
 * edge, but the two cells 'B ╔' are not directly connected through their shared edge.
 *
 * A sink may be connected to the source through another sink. For example, in the simple pipe system '* ╦ X Y ═ Z', all three sinks are connected
 * to the source.
 *
 * Your objective is to write a function that determines which sinks are connected to the source in a given pipe system.
 *
 * As an example, consider the following illustration of a pipe system:
 *
 * ```
 * * ╣   ╔ ═ A
 *   ╠ ═ ╝
 *  C   ╚ ═ B
 * ```
 *
 * In this system, the source is connected to sinks A and C, but it is not connected to sink B.
 *
 * A system is specified by an input text file that contains rows of data indicating the location of the objects in the grid. Each row has three
 * pieces of information, separated by a space character:
 *
 * [*] The character representing the object (asterisk, uppercase letter, or pipe).
 * [*] The x-coordinate of the object in the grid. This has a minimum value of 0.
 * [*] The y-coordinate of the object in the grid. This has a minimum value of 0.
 *
 * Below are the contents of an input file that specifies the example pipe system illustrated above. The order of the rows within the file is
 * arbitrary, so the rows could be given in any order. The coordinates (0, 0) will always correspond to the same corner of the grid as in this
 * example, so make sure to understand in which directions the x- and y-coordinates increase.
 *
 * ```
 *   * 0 2
 *   C 1 0
 *   ╠ 1 1
 *   ╣ 1 2
 *   ═ 2 1
 *   ╚ 3 0
 *   ╝ 3 1
 *   ╔ 3 2
 *   ═ 4 0
 *   ═ 4 2
 *   B 5 0
 *   A 5 2
 * ```
 *
 * Specifications
 *
 * Your function must be written in Python (preferred) or JavaScript.
 *
 * The function should take in a single argument, which is a string containing the file path for the input text file.
 *
 * The function should return (not print) your answer as a string of uppercase letters, in alphabetical order with no other characters. For
 * example, if the code determines that sinks 'P', 'B', 'J', and 'T' are the only sinks connected to the source, your code should return the string
 * 'BJPT'.
*/
var fs = require("fs");
function getConnectedSinks(filePath) {
    var Direction;
    (function (Direction) {
        Direction[Direction["Up"] = 0] = "Up";
        Direction[Direction["Down"] = 1] = "Down";
        Direction[Direction["Left"] = 2] = "Left";
        Direction[Direction["Right"] = 3] = "Right";
    })(Direction || (Direction = {}));
    var Symbol;
    (function (Symbol) {
        Symbol["ElbowDL"] = "\u2557";
        Symbol["ElbowDR"] = "\u2554";
        Symbol["ElbowUL"] = "\u255D";
        Symbol["ElbowUR"] = "\u255A";
        Symbol["Source"] = "*";
        Symbol["StraightH"] = "\u2550";
        Symbol["StraightV"] = "\u2551";
        Symbol["TeeD"] = "\u2566";
        Symbol["TeeL"] = "\u2563";
        Symbol["TeeR"] = "\u2560";
        Symbol["TeeU"] = "\u2569";
    })(Symbol || (Symbol = {}));
    var OPEN = "1";
    var PIPE_OPENINGS = new Map([
        [Symbol.StraightH, "0011"],
        [Symbol.StraightV, "1100"],
        [Symbol.ElbowDR, "0101"],
        [Symbol.ElbowDL, "0110"],
        [Symbol.ElbowUR, "1001"],
        [Symbol.ElbowUL, "1010"],
        [Symbol.TeeR, "1101"],
        [Symbol.TeeL, "1110"],
        [Symbol.TeeD, "0111"],
        [Symbol.TeeU, "1011"]
    ]);
    var PipeNetwork = /** @class */ (function () {
        function PipeNetwork(pipeDefinitions) {
            this.sinkMap = new Map();
            this._layPipes(pipeDefinitions);
        }
        PipeNetwork.prototype.assert = function (levels) {
            var _a, _b;
            if (levels.includes(0)) {
                (_a = this.nodes) === null || _a === void 0 ? void 0 : _a.forEach(function (row) {
                    console.log(row.map(function (node) {
                        return node.symbol;
                    }).join(""));
                });
            }
            if (levels.includes(1)) {
                console.log("-----");
                (_b = this.nodes) === null || _b === void 0 ? void 0 : _b.forEach(function (row) {
                    row.forEach(function (node) {
                        console.log("~~", node.x, node.y, "~~");
                        console.log("Connected:", node.connectedNodes.map(function (connectedNode) {
                            return "(".concat(connectedNode.x, ", ").concat(connectedNode.y, ")");
                        }));
                    });
                });
            }
            if (levels.includes(2)) {
                console.log("-----");
                console.log(this.getConnectedSinks());
            }
        };
        PipeNetwork.prototype.getConnectedSinks = function () {
            var _this = this;
            var connectedSinks = new Array();
            this.sinkMap.forEach(function (sink) {
                if (_this._isSinkConnectedToSource(sink)) {
                    connectedSinks.push(sink.symbol);
                }
            });
            connectedSinks.sort();
            return connectedSinks.join("");
        };
        PipeNetwork.prototype._connectPipes = function () {
            var _this = this;
            var _a;
            (_a = this.nodes) === null || _a === void 0 ? void 0 : _a.forEach(function (row, rowIndex) {
                row.forEach(function (node, columnIndex) {
                    var _a, _b, _c, _d;
                    // Sinks are connected on all sides, the source is also connected but not useful in this case since it only matters if
                    // it's in another node's connectedNodes set
                    if (node.symbol !== Symbol.Source) {
                        if (rowIndex > 0 &&
                            (_this.sinkMap.get(node.symbol) ||
                                ((_a = PIPE_OPENINGS.get(node.symbol)) === null || _a === void 0 ? void 0 : _a.charAt(Direction.Up)) === OPEN) &&
                            _this.nodes[rowIndex - 1][columnIndex]) {
                            node.connectedNodes.push(_this.nodes[rowIndex - 1][columnIndex]);
                        }
                        if (rowIndex < (_this.nodes.length - 1) &&
                            (_this.sinkMap.get(node.symbol) ||
                                ((_b = PIPE_OPENINGS.get(node.symbol)) === null || _b === void 0 ? void 0 : _b.charAt(Direction.Down)) === OPEN) &&
                            _this.nodes[rowIndex + 1][columnIndex]) {
                            node.connectedNodes.push(_this.nodes[rowIndex + 1][columnIndex]);
                        }
                        if (columnIndex > 0 &&
                            (_this.sinkMap.get(node.symbol) ||
                                ((_c = PIPE_OPENINGS.get(node.symbol)) === null || _c === void 0 ? void 0 : _c.charAt(Direction.Left)) === OPEN) &&
                            _this.nodes[rowIndex][columnIndex - 1]) {
                            node.connectedNodes.push(_this.nodes[rowIndex][columnIndex - 1]);
                        }
                        if (columnIndex < (_this.nodes[rowIndex].length - 1) &&
                            (_this.sinkMap.get(node.symbol) ||
                                ((_d = PIPE_OPENINGS.get(node.symbol)) === null || _d === void 0 ? void 0 : _d.charAt(Direction.Right)) === OPEN) &&
                            _this.nodes[rowIndex][columnIndex + 1]) {
                            node.connectedNodes.push(_this.nodes[rowIndex][columnIndex + 1]);
                        }
                    }
                });
            });
        };
        PipeNetwork.prototype._isNodeConnectedToSource = function (node, visitedNodesHash) {
            visitedNodesHash["".concat(node.x, ",").concat(node.y)] = true;
            var found = false;
            if (node.connectedNodes.find(function (connectedNode) {
                return connectedNode.symbol === Symbol.Source;
            })) {
                return true;
            }
            for (var connectedNodeIndex = 0; connectedNodeIndex < node.connectedNodes.length; connectedNodeIndex++) {
                if (!visitedNodesHash["".concat(node.connectedNodes[connectedNodeIndex].x, ",").concat(node.connectedNodes[connectedNodeIndex].y)]) {
                    found = this._isNodeConnectedToSource(node.connectedNodes[connectedNodeIndex], visitedNodesHash);
                }
                if (found) {
                    break;
                }
            }
            return found;
        };
        PipeNetwork.prototype._isSinkConnectedToSource = function (sink) {
            if (!this.source) {
                return false;
            }
            var visitedNodesHash = {};
            return this._isNodeConnectedToSource(sink, visitedNodesHash);
        };
        PipeNetwork.prototype._layPipes = function (pipeDefinitions) {
            var _this = this;
            this.nodes = new Array();
            var currentNode;
            pipeDefinitions.forEach(function (pipe) {
                currentNode = {
                    connectedNodes: new Array(),
                    symbol: pipe[0],
                    x: pipe[1],
                    y: pipe[2]
                };
                if (currentNode.symbol === Symbol.Source) {
                    _this.source = currentNode;
                }
                else if (/[A-Z]/.test(currentNode.symbol)) {
                    _this.sinkMap.set(currentNode.symbol, currentNode);
                }
                if (!_this.nodes[currentNode.y]) {
                    _this.nodes[currentNode.y] = new Array();
                }
                _this.nodes[currentNode.y][currentNode.x] = currentNode;
            });
            this._connectPipes();
        };
        return PipeNetwork;
    }());
    function getPipeData() {
        var data = fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' });
        var parsedData = data.split(/\n/g);
        return parsedData.map(function (row) {
            var rowData = row.split(" ");
            return [rowData[0], +rowData[1], +rowData[2]];
        });
    }
    var pipeNetwork = new PipeNetwork(getPipeData());
    // DEBUG
    // pipeNetwork.assert([0, 1, 2]);
    return pipeNetwork.getConnectedSinks();
}
;
