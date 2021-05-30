# Spec

This problem was asked by Google.

Implement locking in a binary tree.
A binary tree node can be locked or unlocked only if all of its descendants or ancestors are not locked.

Design a binary tree node class with the following methods:

 *  `is_locked`, which returns whether the node is locked
 *  `lock`, which attempts to lock the node.
    If it cannot be locked, then it should return false.
    Otherwise, it should lock it and return true.
 *  `unlock`, which unlocks the node.
    If it cannot be unlocked, then it should return false.
    Otherwise, it should unlock it and return true.

You may augment the node to add parent pointers or any other property you would like.
You may assume the class is used in a single-threaded program, so there is no need for actual locks or mutexes.
Each method should run in O(h), where h is the height of the tree.

# Notes on implementation

This could be easily extended to have a delete method (with a balancing algorithm, i.e. what node takes over if a root or parent is deleted).
On node deletion, it would run `_update_ancestors(locked=False)` if the deleted node was locked.
It might be better to not even allow locked nodes to be deleted though.
I guess that's business logic.

I also wish I improved the testing code, but oh well. This works well enough I think.

# Output

```
Test 0
Test 1
Test 2
Test 3
Test 4
Test 5
Test 6
Test 7
Test 8
Test 9
Test 10
Test 11
Test 12
Test 13
Test 14
Test 15
Test 16
Test 17
Test 18
Test 19
Test 20
Test 21
Test 22
Test 23
Test 24
Test 25
Test 26
Success!
```
