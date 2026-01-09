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
		let queue = [];
		queue.push(this.root);

		if (!callback) {
			throw new Error("A callback is required");
		}
		if (this.root === null) return;

		while (queue.length) {
			let current = queue.shift();
			callback(current);
			if (current.left) queue.push(current.left);
			if (current.right) queue.push(current.right);
		}
    }

    inOrderForEach(callback, node = this.root) {
		if (!callback) throw new Error('Callback required');
		if (node === null) return;

		this.inOrderForEach(callback, node.left);
		callback(node);
		this.inOrderForEach(callback, node.right);
    }

    preOrderForEach(callback, node = this.root) {
		if (!callback) throw new Error('Callback required');
		if (node === null) return;

		callback(node);
		this.preOrderForEach(callback, node.left);
		this.preOrderForEach(callback, node.right);		
    }

    postOrderForEach(callback, node = this.root) {
		if (!callback) throw new Error('Callback required');
		if (node === null) return;

		this.postOrderForEach(callback, node.left);
		this.postOrderForEach(callback, node.right);	
		callback(node);
    }

    height(value) {
		const node = this.find(value);
		if (node === null) return "Value does not exist";

		return this.findHeight(node);
    }

	findHeight(node) {
		if (node === null) return -1;

		return Math.max(this.findHeight(node.left), this.findHeight(node.right)) + 1
		
	}

    depth(value) {
		let current = this.root;
		let distance = 0;

		while (current !== null) {
			if (value < current.data) {
				current = current.left;
				distance++;
			} else if (value > current.data) {
				current = current.right;
				distance++;
			} else {
				// Found it!
				return distance;
			}
		}

		return "Value doesn't exist";
    }

    isBalanced(node = this.root) {
		if (node === null) return true;


		// Calculate height of both sides
		let leftHeight = this.findHeight(node.left);
		let rightHeight = this.findHeight(node.right);

		// Check if the specific node is balanced
		let difference = Math.abs(leftHeight - rightHeight);

		return (
			difference <= 1 &&
			this.isBalanced(node.left) &&
			this.isBalanced(node.right)
		)
		
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

// console.log('First tree: ');
// tree.prettyPrint(tree.root);
// console.log('Second tree: ');
// tree.insert(101);
// tree.prettyPrint(tree.root);
// tree.delete(74);
// console.log;
tree.prettyPrint(tree.root);

const target = randomData[0]

// console.log('Searching for:', target);
// console.log('Found node:', tree.find(target));
const printNode = (node) => console.log(node.data);
// tree.levelOrderForEach(printNode);
// tree.inOrderForEach(printNode);
console.log(target)
console.log(tree.height(target));
console.log(tree.isBalanced());