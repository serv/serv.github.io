---
layout: post
title: "Simple Linked List Queue in Swift"
date: 2014-06-07 10:54:54 -0700
comments: true
categories: ['swift', 'algorithms']
---

## tl;dr

Wrote a linked list queue in Swift

---

After writing a [stack in Swift](http://serv.github.io/blog/2014/06/06/stack-in-swift/),
I decided that I try writing a queue in Swift.

Again, this tutorial requires you to have
XCode 6 Beta in order to run Swift.

### 1. Define classes

```js
import Foundation

class Queue {

}
```

```js
import Foundation

class Node {

}
```

I created two classes in different files in XCode.

### 2. Attributes and Constructors for Node class

```js
class Node<T:NSObject> {
    var value: T? = nil
    var next: Node<T>? = nil

    init() {
    }

    init(value: T) {
        self.value = value
    }
}
```

`Node` has two attributes: `value` and `next`.
`value` has an optional generic type `T` which may have `nil` value.
`next` has an optional Node<T> type which also my have `nil` value.

`Node` has two `init` constructors: one that takes `value` as an
argument, and another one that doesn't take any argument.

### 3. Attributes and Constructor for Queue class

```js
import Foundation

class Queue<T:NSObject> {
    var count: Int = 0
    var head: Node<T> = Node<T>()
    var tail: Node<T> = Node<T>()

    init() {
    }
}
```

`Queue` class has three attributes `count`, `head` and `tail`.
`head` is the beginning of the queue and `tail` is the end of the queue.

### 4. `isEmpty` function

```js
import Foundation

class Queue<T:NSObject> {
    var count: Int = 0
    var head: Node<T> = Node<T>()
    var tail: Node<T> = Node<T>()

    init() {
    }

    func isEmpty() -> Bool {
        return self.count == 0
    }
}
```

`isEmpty` is simply comparing `self.count == 0`.
If the queue is empty, returns true, if not, false.

### 5. `enqueue` function

```js
import Foundation

class Queue<T:NSObject> {
    var count: Int = 0
    var head: Node<T> = Node<T>()
    var tail: Node<T> = Node<T>()

    init() {
    }

    func isEmpty() -> Bool {
        return self.count == 0
    }

    func enqueue(value: T) {
        var node = Node<T>(value: value)
        if self.isEmpty() {
            self.head = node
            self.tail = node
        } else {
            node.next = self.head
            self.head = node
        }
        self.count++
    }
}
```

`enqueue` function takes a value and creates a node out of it.
It first checks if the queue is empty.
If it is empty, queue's head and tail are set to the node.
If not, the node is inserted in front of the current head of the queue.
Then increment `count`.

### 6. `dequeue` function

```js
import Foundation

class Queue<T:NSObject> {
    var count: Int = 0
    var head: Node<T> = Node<T>()
    var tail: Node<T> = Node<T>()

    init() {
    }

    func isEmpty() -> Bool {
        return self.count == 0
    }

    func enqueue(value: T) {
        var node = Node<T>(value: value)
        if self.isEmpty() {
            self.head = node
            self.tail = node
        } else {
            node.next = self.head
            self.head = node
        }
        self.count++
    }

    func dequeue() -> T? {
        if self.isEmpty() {
            return nil
        } else if self.count == 1 {
            var temp: Node<T> = self.tail
            self.count--
            return temp.value
        } else {
            var temp: Node<T> = self.tail

            // ??????

            self.count--
            return temp.value
        }
    }
}
```

`dequeue` function has 3 cases to handle.

1. When the queue is empty
2. When the queue has one node
3. When the queue has more than one node

In case 1, you just return `nil`.

In case 2, you return the queue's tail node and decrement.

In case 3, you want to return the queue's tail node as well.
But the problem is that we need to know the reference to the node right before
the tail node. **We need `prev` attribute for nodes.**

### 7. Adding `prev` attribute to Node class

```js
import Foundation

class Node<T:NSObject> {
    var value: T? = nil
    var next: Node<T>? = nil
    var prev: Node<T>? = nil

    init() {
    }

    init(value: T) {
        self.value = value
    }
}
```

`prev` attribute is written the same way as `next`.

```js
import Foundation

class Queue<T:NSObject> {
    var count: Int = 0
    var head: Node<T> = Node<T>()
    var tail: Node<T> = Node<T>()

    init() {
    }

    func isEmpty() -> Bool {
        return self.count == 0
    }

    func enqueue(value: T) {
        var node = Node<T>(value: value)
        if self.isEmpty() {
            self.head = node
            self.tail = node
        } else {
            node.next = self.head
            self.head.prev = node
            self.head = node
        }
        self.count++
    }

    func dequeue() -> T? {
        if self.isEmpty() {
            return nil
        } else if self.count == 1 {
            var temp: Node<T> = self.tail
            self.count--
            return temp.value
        } else {
            var temp: Node<T> = self.tail
            self.tail = self.tail.prev!
            self.count--
            return temp.value
        }
    }
}
```

We add `self.tail = self.tail.prev!`, which
sets the new tail node, when the current tail
node is removed.

---

You can see the [full source code on github](https://github.com/serv/algorithms-in-swift/tree/master/DataStructuresAndAlgorithmsInSwift/QueueLinkedList/QueueLinkedList).
