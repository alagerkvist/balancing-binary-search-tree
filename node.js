// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning
// Node in the tree

function Node(n){
  this.right = n;
}

function Node(val, x, y, n=null) {
  this.value = val;
  this.left = null;
  this.right = n;
  // How far apart should the children nodes be
  // This will be based on "level" in the tree
  this.distance = 2;
  // Now has a an xy position
  this.x = x;
  this.y = y;
}

// Search the tree for a value
Node.prototype.search = function(val) {
  if (this.value == val) {
    return this;
  } else if (val < this.value && this.left != null) {
    return this.left.search(val);
  } else if (val > this.value && this.right != null) {
    return this.right.search(val);
  }
  return null;
}

Node.prototype.visit = function(parent) {
  // Recursively go left
  if (this.left != null) {
    this.left.visit(this);
  }

  // Draw a line from the parent
  stroke(100);
  line(parent.x, parent.y, this.x, this.y);
  // Draw a circle
  stroke(255);
  fill(0);
  ellipse(this.x, this.y, 24, 24);
  noStroke();
  // Display the value
  fill(255);
  textAlign(CENTER);
  textSize(12);
  text(this.value, this.x, this.y + 4);

  // Go right
  if (this.right != null) {
    this.right.visit(this);
  }
}

// Add a new Node
Node.prototype.addNode = function(n) {
  // If it's less go left
  if (n.value < this.value) {
    // Is there nothing there? Place the node
    if (this.left == null) {
      this.left = n;
    // Keep going!
    } else {
      this.left.addNode(n)
    }
    // If it's more go right
  } else if (n.value > this.value) {
    // Is there nothing there? Place the node
    if (this.right == null) {
      this.right = n;
    // Keep going!
    } else {
      this.right.addNode(n);
    }
  }
}

Node.prototype.calcView = function(n){
  //Check the value should be on the left or right side
  if(this.value > n.value){
    // Exponentially shrink the distance between nodes for each level
    n.distance = this.distance +1;
    n.x = this.x - (width / pow(2, n.distance))-10;
    n.y = this.y + (height / 12);
  }else{
    n.distance = this.distance +1;
    n.x = this.x + (width / pow(2, n.distance)) +10;
    n.y = this.y + (height / 12);
  }

  //Continue on left side if possible
  if(n.left != null){
    n.calcView(n.left);
  }

  //Continue on left side if possible
  if(n.right != null){
    n.calcView(n.right);
  }

}
