---
layout: post
title: "Setting up Typescript"
date: 2017-11-05 13:40:28 -0800
comments: true
categories: ['typescript']
---

I have been using [ES2015 actively using Babe.js](https://babeljs.io/learn-es2015/)
and I was already convinced that compiling more dev-friendly language to
javascript is useful. One of the langauges that has been praised a lot in
this domain is [Typescript](https://www.typescriptlang.org/index.html).

### Install Typescript

`$ yarn global add typescript`

If you get an error saying `tsc` command is not found, check out this
[SO answer](https://stackoverflow.com/a/40333409/536890) on this issue.

### Linked list in Typescript

Here is a linked list you can start to play with written in Typescript.

```typescript
// index.ts

import { Node } from './node';

export class List {
  head: Node;
  tail: Node;

  constructor() {
  }

  push(val) {
    let node = new Node(val);
    node.next = this.head;
    this.head = node;
  }

  print() {
    let node = this.head;
    while (node !== undefined) {
      console.log(node.val);
      node = node.next;
    }
  }
}
```

```typescript
// list.ts

import { Node } from './node';

export class List {
  head: Node;
  tail: Node;

  constructor() {
  }

  push(val) {
    let node = new Node(val);
    node.next = this.head;
    this.head = node;
  }

  print() {
    let node = this.head;
    while (node !== undefined) {
      console.log(node.val);
      node = node.next;
    }
  }
}

```

```typescript
// node.ts

export class Node {
  val: number;
  next: Node;

  constructor(val) {
    if (!val) {
      return;
    }

    this.val = val;
  }
}

```

Now compile typescript into javascript.

`$ tsc index.ts`

This should generate `index.js`, `list.js` and `node.js`.

Let's run these javascript files.

`$ node index.js`

This should print

```
3
2
1
```

### What I think about Typescript after using it for an hour

Learning Typescript was intuitive and JS I was writing felt more precise
and controlled. This allowed me write less error prone javascript in
a short period time. I should learn more about tooling around Typescript
so that it feels more integrated into the javascript development
workflow.


