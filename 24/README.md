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

This could be easily extended to have a delete method (with a balancing algorithm, i.e. what node takes over if a roo  t or parent is deleted).
On node deletion, it would run `_update_ancestors(locked=False)` if the deleted node was locked.
It might be better to not even allow locked nodes to be deleted though.
I guess that's business logic.

I also wish I improved the testing code, but oh well. This works well enough I think.

# Output

```
at index 0
at index 1
at index 2
at index 3
at index 4
at index 5
at index 6
at index 7
at index 8
at index 9
at index 10
at index 11
at index 12
at index 13
at index 14
at index 15
at index 16
at index 17
at index 18
at index 19
at index 20
at index 21
at index 22
at index 23
at index 24
at index 25
at index 26
Success!
```
