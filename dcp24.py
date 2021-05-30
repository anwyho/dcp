
class Node:
    def __init__(
            self,
            parent = None,
            left = None,
            right = None,
    ):
        self.parent = parent
        self.left = left
        self.right = right
        self._is_locked = False
        self.locked_descendants = 0

    def add_left(self):
        """Adds a left child node to the current node."""
        self.left = Node(parent=self)
        return self.left

    def add_right(self):
        """Adds a right child node to the current node."""
        self.right = Node(parent=self)
        return self.right

    def is_locked(self) -> bool:
        """Returns True if the node is currently locked."""
        return self._is_locked

    def lock(self) -> bool:
        """
        Attempts to lock the node.
        Returns True on success.
        Runs in O(h) time.
        """
        if (not self._is_locked) and self.can_lock_or_unlock():
            self._is_locked = True
            self._update_ancestors(locked=True)
            return True
        return False

    def unlock(self) -> bool:
        """
        Attempts to unlock the node.
        Returns True on success.
        Runs in O(h) time.
        """
        if self._is_locked and self.can_lock_or_unlock():
            self._is_locked = False
            self._update_ancestors(locked=False)
            return True
        return False

    def can_lock_or_unlock(self) -> bool:
        """
        Returns True if the node can be locked or unlocked.
        The criteria is that the node cannot have any locked descendants or locked ancestors.
        Runs in O(h) time.
        """
        return not (self._has_locked_descendants() or self._has_locked_ancestors())

    def _has_locked_descendants(self) -> bool:
        return self.locked_descendants > 0

    def _has_locked_ancestors(self) -> bool:
        # is root or has immediate locked parent or has locked ancestor
        return self.parent is not None and (self.parent.is_locked() or self.parent._has_locked_ancestors())

    def _update_ancestors(self, locked) -> None:
        if self.parent is not None:
            if locked == True:
                self.parent.locked_descendants += 1
            else:
                self.parent.locked_descendants -= 1
            self.parent._update_ancestors(locked)


if __name__ == "__main__":
    root = Node()
    actions_to_expectations = [
        [root.is_locked(), False],
        [root.lock(), True],
        [root.is_locked(), True],
        [root.unlock(), True],
        [root.add_left().lock(), True],
        [root.left.is_locked(), True],
        [root.can_lock_or_unlock(), False],
        [root.left.unlock(), True],
        [root.left.add_left().can_lock_or_unlock(), True],
        [root.left.left.lock(), True],
        [root.can_lock_or_unlock(), False],
        [root.lock(), False],
        [root.left.can_lock_or_unlock(), False],
        [root.left.lock(), False],
        [root.add_right().add_right().lock(), True],
        [root.right.add_left().lock(), True],
        [root.left.left.can_lock_or_unlock(), True],
        [root.can_lock_or_unlock(), False],
        [root.left.left.unlock(), True],
        [root.right.can_lock_or_unlock(), False],
        [root.right.left.unlock(), True],
        [root.right.can_lock_or_unlock(), False],
        [root.right.right.unlock(), True],
        [root.right.can_lock_or_unlock(), True],
        [root.lock(), True],
        [root.right.right.lock(), False],
        [root.left.lock(), False],

    ]

    for action, expectation in actions_to_expectations:
        print(action, expectation)
        assert(action == expectation)


