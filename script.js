class Node {
	constructor(data) {
		this.data = data;
		this.left = null;
		this.right = null;
	}
}

class Tree {
	root = null;
	constructor(array) {
		const cleanArray = [...new Set(array)].sort((a, b) => a - b);
		this.root = this.buildTree(cleanArray, 0, cleanArray.length - 1);
	}

	prettyPrint(node, prefix = '', isLeft = true) {
		if (node === null) {
			return;
		}
		if (node.right !== null) {
			this.prettyPrint(
				node.right,
				`${prefix}${isLeft ? '│   ' : '    '}`,
				false
			);
		}
		console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
		if (node.left !== null) {
			this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
		}
	}

	buildTree(array, start, end) {
		if (start > end) return null;
		const mid = Math.floor((start + end) / 2);
		const node = new Node(array[mid]);

		node.left = this.buildTree(array, start, mid - 1);
		node.right = this.buildTree(array, mid + 1, end);

		return node;
	}

	insert(value) {
		if (this.root === null) {
			this.root = new Node(value);
			return;
		}

		let current = this.root;

		while (true) {
			if (value === current.data) return;

			if (value < current.data) {
				if (current.left === null) {
					current.left = new Node(value);
					return;
				}
				current = current.left;
			} else {
				if (current.right === null) {
					current.right = new Node(value);
					return;
				}
				current = current.right;
			}
		}
	}

	deleteItem(value, node = this.root) {
		// Value not found
		if (node === null) return null;

		// Find the node
		if (value < node.data) {
			node.left = this.deleteItem(value, node.left);
		} else if (value > node.data) {
			node.right = this.deleteItem(value, node.right);
		}

		// We found the node!
		else {
			// 0 or 1 child
			if (node.left === null) return node.right;
			if (node.right === null) return node.left;

			// 2 children
			let successor = node.right;
			while (successor.left !== null) {
				successor = successor.left;
			}
			node.data = successor.data;
			node.right = this.deleteItem(successor.data, node.right);
		}
		return node;
	}

	delete(value) {
		this.root = this.deleteItem(value, this.root);
	}

	find(value, node = this.root) {
		if (node === null || node.data === value) return node;

        if (value < node.data) {
            return this.find(value, node.left);
        }
        return this.find(value, node.right);
	}

    levelOrderForEach(callback) {

    }

    inOrderForEach(callback) {

    }

    preOrderForEach(callback) {

    }

    postOrderForEach(callback) {

    }

    height(value) {

    }

    depth(value) {

    }

    isBalanced() {

    }

    rebalance() {
        
    }

}

function generateRandomNumbers(amount) {
	let array = [];

	for (let i = 0; i < amount; i++) {
		let randomInt = Math.floor(Math.random() * 100);
		array.push(randomInt);
	}

	return array;
}


const randomData = generateRandomNumbers(10);
const tree = new Tree(randomData);

console.log('First tree: ');
tree.prettyPrint(tree.root);
console.log('Second tree: ');
tree.insert(101);
tree.prettyPrint(tree.root);
tree.delete(74);
console.log;
tree.prettyPrint(tree.root);

const target = randomData[0]

console.log('Searching for:', target);
console.log('Found node:', tree.find(target));
