const fs = require('fs');
const treeData = JSON.parse(fs.readFileSync('treeData.json'));

// Set to keep track of visited nodes
const visitedNodes = new Set();

// Function to find a node by its value
function findNode(nodeValue) {
    for (const node of treeData) {
        if (node.value === nodeValue) {
            return node;
        }
        if (node.connection) {
            const foundNode = findNodeInConnection(node.connection, nodeValue);
            if (foundNode) {
                return foundNode;
            }
        }
    }
    return null;
}

// Function to find a node within connections
function findNodeInConnection(connections, targetValue) {
    for (const connection of connections) {
        if (connection.value === targetValue) {
            return connection;
        }
        if (connection.connection) {
            const foundNode = findNodeInConnection(connection.connection, targetValue);
            if (foundNode) {
                return foundNode;
            }
        }
    }
    return null;
}

// Function to traverse child nodes in DFS manner
function loopThroughChild(node) {
    if (node.connection) {
        node.connection.forEach((child) => {
            if (!visitedNodes.has(child.value)) {
                console.log(child.value); // Process the child node
                visitedNodes.add(child.value);
                loopThroughChild(child);
            }
        });
    }
}

// Function to traverse parent nodes in DFS manner
function loopThroughParent(node) {
    if (node.parent) {
        node.parent.forEach((parentValue) => {
            const parentNode = findNode(parentValue);
            if (parentNode && !visitedNodes.has(parentNode.value)) {
                console.log(parentNode.value); // Process the parent node
                visitedNodes.add(parentNode.value);
                loopThroughParent(parentNode);
            }
        });
    }
}

// Function to find children of a node and traverse them
function findChildren(nodeValue) {
    const node = findNode(nodeValue);
    if (node) {
        console.log(`Children of ${nodeValue}:`);
        loopThroughChild(node);
    } else {
        console.log("Node not found");
    }
}

// Function to find parents of a node and traverse them
function findParents(nodeValue) {
    const node = findNode(nodeValue);
    if (node) {
        console.log(`Parents of ${nodeValue}:`);
        loopThroughParent(node);
    } else {
        console.log("Node not found");
    }
}

// Main function to initiate traversal
function connection(nodeValue) {
    findChildren(nodeValue);
    findParents(nodeValue);
}

// Initiate traversal with a node value
connection("SA8");
