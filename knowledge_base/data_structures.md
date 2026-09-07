# Data Structures Laboratory Knowledge Base

This knowledge base contains concepts, procedures, complexity information, requirements, precautions, and viva topics for common Data Structures laboratory experiments.

---

## Bubble Sort Algorithm

### Concept

Bubble Sort is a comparison-based sorting algorithm used to arrange elements in ascending or descending order.

The algorithm repeatedly compares adjacent elements in an array. If two adjacent elements are in the wrong order, they are swapped. After every complete pass, the largest unsorted element moves to its correct position at the end of the array.

### Working Principle

For ascending order:

1. Start from the first element of the array.
2. Compare the current element with the next element.
3. If the current element is greater than the next element, swap them.
4. Continue comparing adjacent elements until the end of the array.
5. Repeat the passes until the array becomes sorted.
6. An optimized implementation can stop early when no swaps occur.

### Complexity

- Worst-case time complexity: O(n²)
- Average-case time complexity: O(n²)
- Best-case time complexity: O(n) with an optimized early-stop condition
- Space complexity: O(1)

### Advantages

- Simple to understand and implement.
- Useful for teaching basic sorting concepts.
- Requires constant auxiliary space.
- Can work reasonably well for small or nearly sorted datasets when optimized.

### Limitations

- Inefficient for large datasets.
- Performs many comparisons and swaps.
- Algorithms such as Merge Sort and Quick Sort are generally preferred for larger datasets.

### Laboratory Requirements

- Computer or laptop
- Programming environment
- Basic knowledge of arrays
- Basic knowledge of loops and conditional statements

### Common Precautions

- Ensure array indices remain within valid bounds.
- Check loop boundaries carefully.
- Use the correct comparison condition.
- Test the algorithm with different input arrays.
- Consider an early-stop condition when no swaps occur.

### Viva Topics

Students should understand:

- Definition of Bubble Sort
- Working principle
- Time and space complexity
- Stable sorting
- Advantages and limitations
- Comparison with other sorting algorithms

---

## Binary Search

### Concept

Binary Search is an efficient searching algorithm used to find a target element in a sorted array or list.

Instead of checking every element sequentially, Binary Search repeatedly divides the search range into two halves.

### Working Principle

1. Ensure that the array is sorted.
2. Set the low index to the first element.
3. Set the high index to the last element.
4. Calculate the middle element.
5. Compare the middle element with the target.
6. If they are equal, the target has been found.
7. If the target is smaller, search the left half.
8. If the target is larger, search the right half.
9. Repeat until the element is found or the search range becomes empty.

### Complexity

- Best-case time complexity: O(1)
- Average-case time complexity: O(log n)
- Worst-case time complexity: O(log n)
- Space complexity: O(1) for an iterative implementation

### Advantages

- Much faster than linear search for large sorted datasets.
- Reduces the search space by half after every comparison.
- Simple and efficient when data is sorted.

### Limitations

- Requires the data to be sorted.
- Maintaining sorted data can require additional processing.
- Not ideal when frequent insertions and deletions occur in an array.

### Laboratory Requirements

- Computer or laptop
- Programming environment
- Sorted array
- Basic knowledge of arrays and loops

### Common Precautions

- Ensure the input array is sorted.
- Use valid low and high indices.
- Handle the case where the target is not present.
- Avoid incorrect midpoint calculations.
- Test both successful and unsuccessful searches.

### Viva Topics

Students should understand:

- Definition of Binary Search
- Why sorting is required
- Difference between Binary Search and Linear Search
- Time complexity
- Iterative and recursive implementations
- Applications of Binary Search

---

## Stack

### Concept

A Stack is a linear data structure that follows the LIFO principle: Last In, First Out.

The element inserted last is the first element to be removed.

### Basic Operations

- Push: Inserts an element onto the top of the stack.
- Pop: Removes the top element.
- Peek or Top: Returns the top element without removing it.
- IsEmpty: Checks whether the stack contains elements.
- IsFull: Checks whether an array-based stack is full.

### Working Principle

1. Create an empty stack.
2. Use the push operation to insert elements.
3. The newest element becomes the top element.
4. Use pop to remove the top element.
5. Continue operations according to the application requirements.
6. Handle stack overflow and underflow conditions where applicable.

### Complexity

For an array-based or linked-list implementation:

- Push: O(1)
- Pop: O(1)
- Peek: O(1)
- Search: O(n)
- Space complexity: O(n)

### Advantages

- Simple and efficient insertion and deletion from one end.
- Useful for managing temporary data.
- Push and pop operations are generally constant time.

### Limitations

- Direct access to arbitrary elements is not efficient.
- Array-based stacks have a fixed capacity unless dynamically resized.
- Overflow can occur when a fixed-size stack becomes full.

### Applications

- Function call management
- Expression evaluation
- Parentheses matching
- Undo operations
- Backtracking
- Depth First Search

### Laboratory Requirements

- Computer or laptop
- Programming environment
- Basic knowledge of arrays or linked lists

### Common Precautions

- Check for stack overflow before pushing into a fixed-size stack.
- Check for stack underflow before performing pop.
- Maintain the top pointer correctly.
- Ensure that the stack boundaries are valid.

### Viva Topics

Students should understand:

- LIFO principle
- Stack operations
- Stack overflow and underflow
- Array and linked-list implementations
- Applications of stacks
- Difference between stack and queue

---

## Queue

### Concept

A Queue is a linear data structure that follows the FIFO principle: First In, First Out.

The element inserted first is removed first.

### Basic Operations

- Enqueue: Inserts an element at the rear.
- Dequeue: Removes an element from the front.
- Front or Peek: Returns the front element.
- IsEmpty: Checks whether the queue is empty.
- IsFull: Checks whether an array-based queue is full.

### Working Principle

1. Create an empty queue.
2. Insert elements from the rear using enqueue.
3. Remove elements from the front using dequeue.
4. Maintain front and rear positions correctly.
5. Continue operations according to the application requirements.

### Complexity

For a suitable array or linked-list implementation:

- Enqueue: O(1)
- Dequeue: O(1)
- Peek: O(1)
- Search: O(n)
- Space complexity: O(n)

### Advantages

- Maintains data in FIFO order.
- Efficient insertion and deletion from appropriate ends.
- Useful for scheduling and resource management.

### Limitations

- Direct access to arbitrary elements is not efficient.
- Fixed-size array implementations may experience overflow.
- Incorrect front and rear management can cause errors.

### Applications

- CPU scheduling
- Printer scheduling
- Process management
- Breadth First Search
- Request handling
- Waiting-line simulations

### Laboratory Requirements

- Computer or laptop
- Programming environment
- Basic knowledge of arrays or linked lists

### Common Precautions

- Check for queue overflow before insertion in a fixed-size queue.
- Check for underflow before deletion.
- Maintain front and rear positions correctly.
- Handle the empty queue condition carefully.

### Viva Topics

Students should understand:

- FIFO principle
- Queue operations
- Queue overflow and underflow
- Circular queue
- Difference between stack and queue
- Applications of queues

---

## Linked List

### Concept

A Linked List is a dynamic linear data structure consisting of nodes.

Each node generally contains data and a reference or pointer to the next node. Unlike arrays, linked-list elements do not need to occupy consecutive memory locations.

### Structure

A singly linked-list node contains:

- Data
- Pointer or reference to the next node

The final node points to NULL or an equivalent end-of-list indicator.

### Working Principle

1. Create a node containing data.
2. Store a reference to the next node.
3. Connect nodes sequentially.
4. Use a head pointer to identify the first node.
5. Traverse the list by following the next references.
6. Insert or delete nodes by updating the appropriate links.

### Common Operations

- Insertion at the beginning
- Insertion at the end
- Insertion at a specific position
- Deletion from the beginning
- Deletion from the end
- Deletion of a specific element
- Traversal
- Searching

### Complexity

For a singly linked list:

- Insertion at beginning: O(1)
- Deletion at beginning: O(1)
- Search: O(n)
- Traversal: O(n)
- Access by position: O(n)
- Space complexity: O(n)

Insertion or deletion at a known node can be O(1) when the required references are already available.

### Advantages

- Dynamic size.
- Efficient insertion and deletion when appropriate node references are available.
- Does not require contiguous memory.

### Limitations

- Extra memory is required for pointers or references.
- Random access is not efficient.
- Traversal is generally sequential.
- Pointer or reference handling can introduce implementation errors.

### Laboratory Requirements

- Computer or laptop
- Programming environment
- Basic knowledge of pointers or references
- Understanding of structures or classes

### Common Precautions

- Initialize pointers or references correctly.
- Check for an empty list.
- Update links carefully during insertion and deletion.
- Ensure the last node points to the correct end marker.
- Avoid losing references to existing nodes.

### Viva Topics

Students should understand:

- Structure of a linked-list node
- Singly linked list
- Doubly linked list
- Circular linked list
- Array versus linked list
- Advantages and limitations
- Insertion and deletion operations

---

## Binary Search Tree

### Concept

A Binary Search Tree (BST) is a binary tree in which values smaller than a node are generally stored in its left subtree and values greater than the node are stored in its right subtree.

The BST property allows searching and maintaining ordered data.

### Working Principle

For insertion:

1. Start at the root.
2. Compare the new value with the current node.
3. If the value is smaller, move to the left subtree.
4. If the value is greater, move to the right subtree.
5. Continue until an empty position is found.
6. Insert the new value at that position.

For searching, follow the same comparisons until the value is found or the search reaches an empty subtree.

### Tree Traversals

Common traversal methods include:

- Inorder
- Preorder
- Postorder

Inorder traversal of a valid BST produces values in sorted order.

### Complexity

For a balanced BST:

- Search: O(log n)
- Insertion: O(log n)
- Deletion: O(log n)

Worst-case complexity for a highly unbalanced BST:

- Search: O(n)
- Insertion: O(n)
- Deletion: O(n)

Space complexity is generally O(n) for storing n nodes.

### Advantages

- Maintains elements in an ordered structure.
- Supports searching, insertion, and deletion.
- Inorder traversal can produce sorted data.

### Limitations

- Performance can degrade when the tree becomes highly unbalanced.
- More complex than basic linear data structures.
- Requires careful handling during deletion.

### Laboratory Requirements

- Computer or laptop
- Programming environment
- Basic knowledge of trees
- Understanding of recursion or tree traversal

### Common Precautions

- Maintain the BST ordering property.
- Handle insertion into an empty tree correctly.
- Check for NULL or empty child nodes.
- Handle deletion cases carefully.
- Test the tree with different insertion orders.

### Viva Topics

Students should understand:

- Definition of a Binary Search Tree
- BST property
- Tree traversals
- Difference between binary tree and BST
- Search, insertion, and deletion
- Balanced versus unbalanced trees
- Applications of BSTs