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

let visitedNodes =  new Set();

function calculateImpact(node,attackNumber,threshold){
    const impact = node.weight * attackNumber
    return impact>= threshold
    
  }

  

//Traverse child nodes in DFS manner and also call function to travesre parents also recursively
function loopThroughChild(node) {
  const attackNumber= 5
  const threshold = 10
  const isImpacted =calculateImpact(node,attackNumber,threshold) 

    if (node.children ) {
        node.children.forEach((child) => {
            if (isImpacted &&!visitedNodes.has(child.className)) {
                console.log(child.className); 
                visitedNodes.add(child.className);
                loopThroughChild(child);
                loopThroughParent(child)
            }
        });
    }
}

//Traverse parent nodes, also call function to traverse children of that parents recursively
function loopThroughParent(node) {
        const attackNumber= 5
        const threshold = 10
        const isImpacted =calculateImpact(node,attackNumber,threshold) 
      
    if (node.parent) {
        node.parent.forEach((parentClassName) => {
            const parentNode = findNode(parentClassName);
            if (parentNode && isImpacted && !visitedNodes.has(parentNode.className)) {
                console.log(parentNode.className); 
                visitedNodes.add(parentNode.className);
                loopThroughParent(parentNode);
                loopThroughChild(parentNode)
            }
        });
    }
}

// Function to print connection (children of parents and parents of children)
function connection(nodeValue) {
    const node = findNode(nodeValue);
    if (node) {
        console.log(`Connections of ${nodeValue}:`);
        loopThroughChild(node);
       // console.log("\nParents of", nodeValue + ":");
        loopThroughParent(node);
    } else {
        console.log("Node not found");
    }
}




connection("CM");


/* I have made some manual modification to the tree)structure of the ontology :
1.I made connection between one node in PA and one in SA, "CM" in SA and "TAFService" in PA
2.I add "weight" propertty to some nodes of the ontology and give a manual value to them
3.I introduce a new function which is called "calculateImpact" to calculate Impact and compare it to threshold If imapact > threshold => isImpacted
4.now before traversing the tree we also check that if the node isImpacted ?

now when we run the code we can see that if "CM" will be underattck then the attack can propagate to other parts,also "TAFService" which is in the PA's and to other parts accordingly.
*/
