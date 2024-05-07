const fs = require('fs');

// Read tree structure from JSON file
const treeData = JSON.parse(fs.readFileSync('tree_structure.json'));

// Function to find a node by its value
function findNode(nodeValue) {
    for (const node of treeData) {
        if (node.className === nodeValue) {
            return node;
        }
    }
    return null; // Node not found
}

// Function to traverse through child nodes
function traverseChildren(node) {
    if (node.children) {
        console.log(`Children of ${node.className}:`);
        for (const child of node.children) {
            console.log(child.className);
        }
    } else {
        console.log(`No children found for ${node.className}`);
    }
}

// Function to find children of a node
function findChildren(nodeValue) {
    const node = findNode(nodeValue);
    if (node) {
        traverseChildren(node);
    } else {
        console.log("Node not found");
    }
}

// Function to traverse through parent nodes
function traverseParents(node) {
    if (node.parent) {
        console.log(`Parents of ${node.className}:`);
        for (const parent of node.parent) {
            console.log(parent);
        }
    } else {
        console.log(`No parents found for ${node.className}`);
    }
}

// Function to find parents of a node
function findParents(nodeValue) {
    const node = findNode(nodeValue);
    if (node) {
        traverseParents(node);
    } else {
        console.log("Node not found");
    }
}

// Function to find connections of a node
function findConnections(nodeValue) {
    const node = findNode(nodeValue);
    if (node) {
        console.log(`Connections of ${nodeValue}:`);
        traverseConnections(node);
    } else {
        console.log("Node not found");
    }
}

// Function to display children, parents, and connections of a node
function displayConnections(nodeValue) {
    console.log(`Displaying connections for node ${nodeValue}:`);
    console.log("");
    findChildren(nodeValue);
    console.log("");
    findParents(nodeValue);
    console.log("");
    findConnections(nodeValue);
}

// Example usage
displayConnections("Entity");
