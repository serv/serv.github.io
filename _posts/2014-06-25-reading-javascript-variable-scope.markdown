---
layout: post
title: "Reading 'JavaScript Variable Scope'"
date: 2014-06-25 15:44:44 -0700
comments: true
categories: javascript
---

## tl;dr

This is tldr for the first half of [Javascript Is Sexy's article titled "JavaScript Variable Scope and Hoisting Explained"](http://javascriptissexy.com/javascript-variable-scope-and-hoisting-explained/) only covering variable scope.

## Local Variables

- a.k.a function level scope
- Variables declared in a function
- Only accessible:
  - In that function
  - Functions in that function
- Local variables have precedence over global variables
- Function-level scope

```javascript
var name = 'Rich';

function showName() {
  var name = 'Jack';
  console.log(name); // Jack
}
console.log(name); // Rich
```
- There's no block level scope

```javascript
var name = 'Rich';

function showName() {
  name = 'Jack';
  console.log(name); // Jack
}
console.log(name); // Jack
```

## Global Variables

- Variables declared outside of a function
- Available in the whole app
- Don't forget `var`

``` javascript
function showAge () {
	age = 90;
	console.log(age);
}

showAge(); // 90

console.log(age); // 90
```

- Don't pollute the global scope. Wrap them up as a local variable.
