// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

// Binary tree

//BST - https://en.wikipedia.org/wiki/Day%E2%80%93Stout%E2%80%93Warren_algorithm
// Anders Lagerkvist

function treeToVine(root){
  let tail = root;
  let rest = tail.right;
  while(rest != null || rest != undefined){
    if(rest.left == null || rest.left == undefined){
      tail = rest;
      rest = rest.right;
    }else{
      let temp = rest.left;
      rest.left = temp.right;
      temp.right = rest;
      rest = temp;
      tail.right = temp;
    }

  }
}

function compress(root, count){
  let scanner = root;
  for(let i = 1; i <= count; i++){
    let child = scanner.right;
    scanner.right = child.right;
    scanner = scanner.right;
    child.right = scanner.left;
    scanner.left = child;
  }
}

function vineToTree(root, len){
  let leaves = floor(len + 1 - Math.pow(2, Math.log2(len+1)));
  compress(root, leaves);
  len = len - leaves;
  while (len > 1){
    compress(root, floor(len/2));
    len = floor(len / 2);
  }
}



// Binary tree
let tree;


function setup() {
  createCanvas(800, 600);
  //How many nodes it should be
  let nodes = 15;

  //Create a array so the values are going to be unique
  let r = [];
  // New tree
  tree = new Tree();

  //Add numbers 0 - 99
  for(let i = 0; i < 100; i++){
    r.push(i);
  }

  for (let i = 0; i < nodes; i++) {
    //Pick a random number from the array
    let val = random(r);
    tree.addValue(val);
    //Remove the value is it won't be picked again
    r.splice(r.indexOf(val), 1);
  }

  background(0);

  let psedoroot = new Node(0,0,0,tree.root);
  treeToVine(psedoroot);
  vineToTree(psedoroot, nodes);
  tree.root = psedoroot.right;
  tree.root.x = width / 2;
  tree.root.y = 16;
  tree.root.calcView(tree.root.left);
  tree.root.calcView(tree.root.right);
  tree.traverse();
  console.log(tree);
  let result = tree.search(42);
  if (result == null) {
    console.log('not found');
  } else {
    console.log(result);
  }

}
