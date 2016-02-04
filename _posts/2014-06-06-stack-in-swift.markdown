---
layout: post
title: "Stack in Swift"
date: 2014-06-06 00:51:14 -0700
comments: true
categories: ['swift', 'algorithms']
---

##tl;dr
I wrote a stack using linked list in Swift

---

When I try to learn a new language, I try writing
a stack using a linked list. This makes you learn a
few basic things about the language and helps you
become familiar with the language faster. I decided to do
the same with Swift.

As a prerequisite, you need XCode 6 Beta in order to run
Swift.

### 1. Define classes

```js
import Foundation

class Stack {

}
```

```js
import Foundation

class node {

}
```

I created two classes in different files in XCode.

### 2. Define attributes of the Node class

```js
import Foundation

class node {
  var value: NSObject?
  var next: Node?
}
```

I defined two attributes called:

1. `value`
2. `next`

`value` is an optional attribute with `NSObject` type.
First, `value` is optional because it may have `nil` value.
Second, `value` is typed as `NSObject` because we want
the Node to handle multiple types of value such as
integer, double and string.

`next` is also on optional attribute because some nodes may
not have any next node. So `next` might be `nil`. `next`
is typed as `Node` because it points to another node.

### 3. `init` functions in Node

```js
import Foundation

class Node {
  var value: NSObject?
  var next: Node?

  init() {

  }

  init(value: NSObject) {
    self.value = value
    self.next = Node()
  }
}
```

We want two `init` functions because we want to
instantiate a node with some `value` or without anything.
We are done with Node class

### 4. `init` function for Stack and its attributes

```js
import Foundation

class Stack {
var count: Int = 0
  var head: Node = Node()

  init() {
  }
}
```

Stack has `head` and `count` attributes.
`head` points to the top of the stack.
`count` has the total number of nodes in the stack.

### 5. `isEmpty` function

```js
import Foundation

class Stack {
var count: Int = 0
  var head: Node = Node()

  init() {
  }

  func isEmpty() -> Boolean {
    return self.count == 0
  }
}
```

`isEmpty` function returns `true` if the stack is empty
and returns `false` if the stack is not empty.

### 6. `push` function

`push` function inserts some value to the top of the stack.

```js
func push(value: NSObject) {
  if isEmpty() {
    self.head = Node()
  }

  var node = Node(value: value)
  node.next = self.head
  self.head = node
  self.count++
}
```

### 7. `pop` function

`pop` function removes some value from the top
of the stack.

```js
func pop() -> NSObject? {
  if isEmpty() {
    return nil
  }

  var node = self.head
  self.head = node.next!
  self.count--

  return node.value
}
```

This function has optional return type because if the
stack is empty, it should return nothing, `nil`.

In the line, `self.head = node.next!`, we use `!` to force
the optional variable to unwrap its value.

---

You can see the [full source code on github](https://github.com/serv/algorithms-in-swift/tree/master/DataStructuresAndAlgorithmsInSwift/StackLinkedList/StackLinkedList).
