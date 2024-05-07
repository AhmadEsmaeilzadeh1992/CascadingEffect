
const fs = require('fs');
const treeData = JSON.parse(fs.readFileSync('treeData.json'));


  




  function findNode(nodevalue) {
    for (const node of treeData) {
      if (node.value === nodevalue) {
        visited.add(node.value);
        //console.log("Node found:", node);
        return node;
      }
      if (node.connection) {
        for (const child of node.connection) {
          const foundNode = findNodeInConnection(child, nodevalue);
          if (foundNode) {
            return foundNode;
          }
        }
      }
    }
    console.log("Node not found");
    return null; 
  }
  
  function findNodeInConnection(node, targetValue) {
    if (node.value === targetValue) {
      visited.add(node.value);
      //console.log("Node found in connection:", node);   Beacuse we just want to show the nodes that are traversed
      return node;
    }
    if (node.connection && !visited.has(node.value)) {
      for (const child of node.connection) {
        const foundNode = findNodeInConnection(child, targetValue);
        if (foundNode) {
          return foundNode;
        }
      }
    }
    return null;
  }
  
 
const visited = new Set();











/*
function loopThrough(node) {
    if (node.connection && node.type === "parent" && node.propagation) {
        console.log(node.value, " -- impacted");
        visited.add(node.value);
        node.connection.forEach((child) => {
            loopThroughChild(child);
        });
    }
}
*/
function loopThroughChild(node) {
  const attackNumber= 5
  const threshold = 10
  const isImpacted =calculateImpact(node,attackNumber,threshold) 
 
    if (node.connection && isImpacted && !visited.has(node.value)) {
        console.log(node.value, " -- impacted");
        visited.add(node.value);
        ancestorsOf(node.value)       //hereeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        
        node.connection.forEach((child) => {
            loopThroughChild(child);
            
            
        });
    }
}

function findChildren(nodeValue) {
    const node = findNode(nodeValue);
    
    if (node) {
        visited.clear(); 
       // loopThrough(node)
        loopThroughChild(node)
    } else {
        console.log("Node not found");
    }
}




//const intendedNode=findNode("SA8")
//findChildren("SA8");




//---------------------------------- Ancestor of node --------------------------------------


function findAncestors(nodeValue, tree) {
  const ancestors = new Set();
  const visited = new Set();


  function traverseNodes(node) {
      if (!visited.has(node.value)  && node.connection && node.connection.some((child) => child.value === nodeValue)) {
          ancestors.add(node);
          visited.add(node.value);
        
      }

      if (node.connection) {
          node.connection.forEach((child) => {
              traverseNodes(child);
          });
      }
  }
  //entire tree
  tree.forEach((node) => {
      traverseNodes(node);
  });

  // Recursively find ancestors for each ancestor node found
  ancestors.forEach((ancestor) => {
      const parentAncestors = findAncestors(ancestor.value, tree);
      parentAncestors.forEach((parentAncestor) => {
          ancestors.add(parentAncestor);
      });
  });

  return ancestors;
}


//const nodeToFindParents = "SA8"


//console.log(`Ancestors of ${nodeToFindParents}`, [...ancestorsOfOne].map(node => node.value));
function ancestorsOf (nodeToFindParents){
  const ancestorsOfOne = findAncestors(nodeToFindParents, treeData);
 

  ancestorsOfOne.forEach((node)=>{
  const attackNumber= 5
  const threshold = 10
  const isImpacted =calculateImpact(node,attackNumber,threshold) 

  if (isImpacted && !visited.has(node.value)){ 
  console.log(node.value, "-- impactedd")
  visited.add(node.value)
  loopThroughChild(node.value)

  }
})
}











function connection(node){
 
  findChildren(node)
  ancestorsOf(node)

}



connection("SA8")











function calculateImpact(node,attackNumber,threshold){
  const impact = node.weight * attackNumber
  return impact>= threshold
  
}
