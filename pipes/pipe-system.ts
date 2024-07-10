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
import * as fs from "fs";

export function getConnectedSinks(filePath: string): string {

    type Letter = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z";
    type PipeDefinition = [symbol: string, x: number, y: number];

    enum Direction {
        Up = 0,
        Down,
        Left,
        Right
    }
    
    
    enum Symbol {
        ElbowDL = "╗",
        ElbowDR = "╔",
        ElbowUL = "╝",
        ElbowUR = "╚",
        Source = "*",
        StraightH = "═",
        StraightV = "║",
        TeeD = "╦",
        TeeL = "╣",
        TeeR = "╠",
        TeeU = "╩"
    }


    const OPEN = "1";
    
    
    const PIPE_OPENINGS = new Map<Symbol, string>(
        [
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
        ]
    );
    
    
    interface INode {
        connectedNodes: Array<INode>,
        symbol: Symbol | Letter;
        x: number;
        y: number;
    }


    class PipeNetwork {

        nodes: Array<Array<INode>>;

        source: INode;

        sinkMap: Map<Letter, INode>;


        constructor(pipeDefinitions: Array<PipeDefinition>) {

            this.sinkMap = new Map<Letter, INode>();

            this._layPipes(pipeDefinitions);
        }


        public assert(levels: Array<0 | 1 | 2>): void {
    
            if (levels.includes(0)) {
                this.nodes?.forEach((row: Array<INode>) => {
            
                    console.log(row.map((node: INode) => {
            
                        return node.symbol;
                    }).join(""));
                });
            }

            if (levels.includes(1)) {
                console.log("-----");
    
                this.nodes?.forEach((row: Array<INode>) => {
    
                    row.forEach((node: INode) => {
    
                        console.log("~~", node.x, node.y, "~~");
                        console.log("Connected:", node.connectedNodes.map((connectedNode: INode) => {
    
                            return `(${connectedNode.x}, ${connectedNode.y})`;
                        }));
                    });
                });
            }

            if (levels.includes(2)) {
                console.log("-----");

                console.log(this.getConnectedSinks());
            }
        }


        public getConnectedSinks(): string {

            let connectedSinks = new Array<string>();

            this.sinkMap.forEach((sink: INode) => {

                if (this._isSinkConnectedToSource(sink)) {
                    connectedSinks.push(sink.symbol);
                }
            });

            connectedSinks.sort();

            return connectedSinks.join("");
        }


        private _connectPipes(): void {

            this.nodes?.forEach((row: Array<INode>, rowIndex: number) => {
                row.forEach((node: INode, columnIndex: number) => {

                    // Sinks are connected on all sides, the source is also connected but not useful in this case since it only matters if
                    // it's in another node's connectedNodes set
                    if (node.symbol !== Symbol.Source) {
                        if (
                            rowIndex > 0 &&
                            (
                                this.sinkMap.get(node.symbol as Letter) ||
                                PIPE_OPENINGS.get(node.symbol as Symbol)?.charAt(Direction.Up) === OPEN
                            ) &&
                            this.nodes[rowIndex - 1][columnIndex]
                        ) {
                            node.connectedNodes.push(this.nodes[rowIndex - 1][columnIndex]);
                        }

                        if (
                            rowIndex < (this.nodes.length - 1) &&
                            (
                                this.sinkMap.get(node.symbol as Letter) ||
                                PIPE_OPENINGS.get(node.symbol as Symbol)?.charAt(Direction.Down) === OPEN
                            ) &&
                            this.nodes[rowIndex + 1][columnIndex]
                        ) {
                            node.connectedNodes.push(this.nodes[rowIndex + 1][columnIndex]);
                        }

                        if (
                            columnIndex > 0 &&
                            (
                                this.sinkMap.get(node.symbol as Letter) ||
                                PIPE_OPENINGS.get(node.symbol as Symbol)?.charAt(Direction.Left) === OPEN
                            ) &&
                            this.nodes[rowIndex][columnIndex - 1]
                        ) {
                            node.connectedNodes.push(this.nodes[rowIndex][columnIndex - 1]);
                        }

                        if (
                            columnIndex < (this.nodes[rowIndex].length - 1) &&
                            (
                                this.sinkMap.get(node.symbol as Letter) ||
                                PIPE_OPENINGS.get(node.symbol as Symbol)?.charAt(Direction.Right) === OPEN
                            ) &&
                            this.nodes[rowIndex][columnIndex + 1]
                        ) {
                            node.connectedNodes.push(this.nodes[rowIndex][columnIndex + 1]);
                        }
                    }
                });
            });
        }


        private _isNodeConnectedToSource(node: INode, visitedNodesHash: { [key: string]: true }): boolean {

            visitedNodesHash[`${node.x},${node.y}`] = true;

            let found = false;

            if (node.connectedNodes.find((connectedNode) => {

                return connectedNode.symbol === Symbol.Source;
            })) {
                return true;
            }

            for (let connectedNodeIndex = 0; connectedNodeIndex < node.connectedNodes.length; connectedNodeIndex++) {
                if (!visitedNodesHash[`${node.connectedNodes[connectedNodeIndex].x},${node.connectedNodes[connectedNodeIndex].y}`]) {
                    found = this._isNodeConnectedToSource(node.connectedNodes[connectedNodeIndex], visitedNodesHash);
                }

                if (found) {
                    break;
                }
            }

            return found;
        }


        private _isSinkConnectedToSource(sink: INode): boolean {

            if (!this.source) {
                return false;
            }

            const visitedNodesHash: { [key: string]: true } = {};

            return this._isNodeConnectedToSource(sink, visitedNodesHash);
        }


        private _layPipes(pipeDefinitions: Array<PipeDefinition>): void {

            this.nodes = new Array<Array<INode>>();

            let currentNode: INode;

            pipeDefinitions.forEach((pipe: PipeDefinition) => {
        
                currentNode = {
                    connectedNodes: new Array<INode>(),
                    symbol: pipe[0] as Symbol | Letter,
                    x: pipe[1],
                    y: pipe[2]
                };
        
                if (currentNode.symbol === Symbol.Source) {
                    this.source = currentNode;
                }
                else if (/[A-Z]/.test(currentNode.symbol)) {
                    this.sinkMap.set(currentNode.symbol as Letter, currentNode);
                }
        
                if (!this.nodes[currentNode.y]) {
                    this.nodes[currentNode.y] = new Array<INode>();
                }
        
                this.nodes[currentNode.y][currentNode.x] = currentNode;
            });

            this._connectPipes();
        }
    }
    
    
    function getPipeData(): Array<PipeDefinition> {
    
        const data = fs.readFileSync(
            filePath, 
            { encoding: 'utf8', flag: 'r' }
        );
    
        let parsedData: Array<string> = data.split(/\n/g);
    
        return parsedData.map((row: string) => {
    
            const rowData = row.split(" ");
    
            return [rowData[0], +rowData[1], +rowData[2]];
        });
    }


    const pipeNetwork = new PipeNetwork(getPipeData());

    // DEBUG
    // pipeNetwork.assert([0, 1, 2]);

    return pipeNetwork.getConnectedSinks();
};
