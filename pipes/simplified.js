function getConnectedSinks(filePath) {

    var fs = require("fs");

    const UP = 0;
    const DOWN = 0;
    const LEFT = 0;
    const RIGHT = 0;
    const OPEN = "1";
    const SOURCE = "*";


    let sourceNode;
    let sinkMap = {};


    function buildPipeNetwork(pipeDefinitions) {

        const nodes = [];

        let currentNode;

        pipeDefinitions.forEach((pipe) => {

            currentNode = {
                connectedNodes: [],
                symbol: pipe[0],
                x: pipe[1],
                y: pipe[2]
            };

            if (currentNode.symbol === SOURCE) {
                sourceNode = currentNode;
            }
            else if (/[A-Z]/.test(currentNode.symbol)) {
                sinkMap[currentNode.symbol] = currentNode;
            }

            if (!nodes[currentNode.y]) {
                nodes[currentNode.y] = [];
            }

            nodes[currentNode.y][currentNode.x] = currentNode;
        });

        return nodes;
    }


    function connectPipes(pipeNetwork) {

        pipeNetwork.forEach((row, rowIndex) => {
            row.forEach((node, columnIndex) => {

                if (node?.symbol !== SOURCE) {
                    if (
                        rowIndex > 0 &&
                        (
                            sinkMap[node.symbol] ||
                            getOpeningsBySymbol(node.symbol)?.charAt(UP) === OPEN
                        ) &&
                        pipeNetwork[rowIndex - 1][columnIndex]
                    ) {
                        node.connectedNodes.push(pipeNetwork[rowIndex - 1][columnIndex]);
                    }

                    if (
                        rowIndex < (pipeNetwork.length - 1) &&
                        (
                            sinkMap[node.symbol] ||
                            getOpeningsBySymbol(node.symbol)?.charAt(DOWN) === OPEN
                        ) &&
                        pipeNetwork[rowIndex + 1][columnIndex]
                    ) {
                        node.connectedNodes.push(pipeNetwork[rowIndex + 1][columnIndex]);
                    }

                    if (
                        columnIndex > 0 &&
                        (
                            sinkMap[node.symbol] ||
                            getOpeningsBySymbol(node.symbol)?.charAt(LEFT) === OPEN
                        ) &&
                        pipeNetwork[rowIndex][columnIndex - 1]
                    ) {
                        node.connectedNodes.push(pipeNetwork[rowIndex][columnIndex - 1]);
                    }

                    if (
                        columnIndex < (pipeNetwork[rowIndex].length - 1) &&
                        (
                            sinkMap[node.symbol] ||
                            getOpeningsBySymbol(node.symbol)?.charAt(RIGHT) === OPEN
                        ) &&
                        pipeNetwork[rowIndex][columnIndex + 1]
                    ) {
                        node.connectedNodes.push(pipeNetwork[rowIndex][columnIndex + 1]);
                    }
                }
            });
        });
    }


    function getOpeningsBySymbol(symbol) {

        switch (symbol) {

        case "╗":
            return "0110";
        case "╔":
            return "0101";
        case "╝":
            return "1010";
        case "╚":
            return "1001";
        case "*":
            return ;
        case "═":
            return "0011";
        case "║":
            return "1100";
        case "╦":
            return "0111";
        case "╣":
            return "1110";
        case "╠":
            return "1101";
        case "╩":
            return "1011";
        }
    }


    function getPipeData() {

        const data = fs.readFileSync(
            filePath, 
            { encoding: 'utf8', flag: 'r' }
        );

        let parsedData = data.split(/\n/g);

        return parsedData.map((row) => {

            const rowData = row.split(" ");

            return [rowData[0], +rowData[1], +rowData[2]];
        });
    }


    function isNodeConnectedToSource(node, visitedNodesHash) {

        visitedNodesHash[`${node.x},${node.y}`] = true;

        let found = false;

        if (node.connectedNodes.find((connectedNode) => {

            return (connectedNode.symbol === SOURCE);
        })) {
            return true;
        }

        for (let connectedNodeIndex = 0; connectedNodeIndex < node.connectedNodes.length; connectedNodeIndex++) {
            if (!visitedNodesHash[`${node.connectedNodes[connectedNodeIndex].x},${node.connectedNodes[connectedNodeIndex].y}`]) {
                found = isNodeConnectedToSource(node.connectedNodes[connectedNodeIndex], visitedNodesHash);
            }

            if (found) {
                break;
            }
        }

        return found;
    }


    function isSinkConnectedToSource(sink) {

        if (!sourceNode) {
            return false;
        }

        return isNodeConnectedToSource(sink, {});
    }


    const pipeNetwork = buildPipeNetwork(getPipeData(filePath));

    connectPipes(pipeNetwork);

    let connectedSinks = [];

    Object.keys(sinkMap).forEach((sink) => {

        if (isSinkConnectedToSource(sinkMap[sink])) {
            connectedSinks.push(sink);
        }
    });

    connectedSinks.sort();

    return connectedSinks.join("");
}
