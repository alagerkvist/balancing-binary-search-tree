// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

// Tree object
//BST - https://en.wikipedia.org/wiki/Day%E2%80%93Stout%E2%80%93Warren_algorithm
// Anders Lagerkvist

function Tree() {
  // Just store the root
  this.root = null;
}

Tree.prototype.reset = function(node){
  node.distance = 2;
  if(node.left != null){
    this.reset(node.left);
  }

  if(node.right != null){
    this.reset(node.right);
  }
}

// Start by visiting the root
Tree.prototype.traverse = function() {
  this.root.visit(this.root);
}

// Start by searching the root
Tree.prototype.search = function(val) {
  var found = this.root.search(val);
  return found;
}

// Add a new value to the tree
Tree.prototype.addValue = function(val) {
  var n = new Node(val);
  if (this.root == null) {
    this.root = n;

  } else {
    this.root.addNode(n);
  }
}
