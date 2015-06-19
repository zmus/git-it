Napisite funkciju koja obilazi stablo na nacin preorder 
i objasnite sto se treba promijeniti 
da obilazak bude postorder, te sto da bude inorder.

struct Node {
	char data;
	struct Node *left;
	struct Node *right;
};

void Preorder(struct Node *root) {
	if(root == NULL) return;
	printf("%c ", root->data);
	Preorder(root->left);
	Preorder(root->right);
}

// depth of x = no. of edges in path from root to x
// height of x = no. of edges in longest path from x to a leaf 
// height of tree = height of root node