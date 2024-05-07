const fs = require('fs');
const treeData = JSON.parse(fs.readFileSync('tree_structure.json'));


function findNode(nodeValue) {
    for (const node of treeData) {
        if (node.className === nodeValue) {
            return node;
        }
        if (node.children) {
            const foundNode = findNodeInConnection(node.children, nodeValue);
            if (foundNode) {
                return foundNode;
            }
        }
    }
    return null;
}


function findNodeInConnection(children, targetValue) {
    for (const child of children) {
        if (child.className === targetValue) {
            return child;
        }
        if (child.children) {
            const foundNode = findNodeInConnection(child.children, targetValue);
            if (foundNode) {
                return foundNode;
            }
        }
    }
    return null;
}
let visitedNodes =  new Set()
// Function to traverse child nodes in DFS manner
function loopThroughChild(node) {
    if (node.children) {
        node.children.forEach((child) => {
            if(!visitedNodes.has(child.className)){
            console.log(child.className); 
            loopThroughChild(child);
            }
        });
    }
}


function findChildren(nodeValue) {
    const node = findNode(nodeValue);
    if (node) {
        console.log(`Children of ${nodeValue}:`);
        loopThroughChild(node);
    } else {
        console.log("Node not found");
    }
}


function loopThroughParent(node) {
    if (node.parent) {
        node.parent.forEach((parentClassName) => {
            const parentNode = findNode(parentClassName);
            if (parentNode) {
                console.log(parentNode.className); 
                loopThroughParent(parentNode);
            }
        });
    }
}


function findParents(nodeValue) {
    const node = findNode(nodeValue);
    if (node) {
        console.log(`Parents of ${nodeValue}:`);
        loopThroughParent(node);
    } else {
        console.log("Node not found");
    }
}



//function to get both parent and children

function connection(nodeValue) {
    findChildren(nodeValue);
    console.log("\n")
    findParents(nodeValue)
}


connection("CNSInfrastructure");

