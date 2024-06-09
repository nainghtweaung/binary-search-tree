class Node {
  constructor(value) {
    this.data = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor() {
    this.root = null;
  }

  log() {
    console.log(this.arr);
  }

  buildTree(arr) {
    arr = mergeSort(arr);
    // this.root = new Node(arr[arr.length / 2]);
    for (let i = 0; i < arr.length; i++) {
      this.insert(arr[i]);
    }
    return this.root;
  }

  insert(value) {
    const newNode = new Node(value);

    if (this.root === null) {
      this.root = newNode;
      return;
    }

    let current = this.root;
    while (true) {
      if (value < current.data) {
        if (current.left === null) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else if (value > current.data) {
        if (current.right === null) {
          current.right = newNode;
          return;
        }
        current = current.right;
      } else {
        return;
      }
    }
  }
}

function mergeSort(arr) {
  if (arr.length === 1 || arr.length === 0) {
    return arr;
  }

  const left = mergeSort(arr.slice(0, arr.length / 2));
  const right = mergeSort(arr.slice(arr.length / 2));
  return merge(left, right);
}

function merge(left, right) {
  let i = 0;
  let j = 0;
  let k = 0;
  let result = [];

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result[k] = left[i];
      i++;
      k++;
    } else {
      result[k] = right[j];
      j++;
      k++;
    }
  }

  for (; i < left.length; i++) {
    result[k] = left[i];
    k++;
  }
  for (; j < right.length; j++) {
    result[k] = right[j];
    k++;
  }
  return result;
}

const tree = new Tree();
const root = tree.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

prettyPrint(root);

function bfs(root) {
  if (root === null) return;
  const queue = [];
  const visited = [];
  queue.push(root);

  while (queue.length !== 0) {
    const node = queue.shift();
    if (node.left !== null) {
      queue.push(node.left);
    }
    if (node.right !== null) {
      queue.push(node.right);
    }
    visited.push(node.data);
  }
  return visited;
}

function dfs(root) {
  const visited = [];
  traverse(root, visited);

  return visited;
}

function traverse(node, arr) {
  if (node === null) {
    return;
  }

  if (node.left !== null) {
    traverse(node.left, arr);
  }
  arr.push(node.data);
  if (node.right !== null) {
    traverse(node.right, arr);
  }
}

console.log(dfs(root));