---
layout: post
title: "Reading 'JavaScript Objects in Detail'"
date: 2014-06-25 12:28:20 -0700
comments: true
categories:
---

## tl;dr

This is tldr of [Javascript Is Sexy's article titled "JavaScript Objects in Detail"](http://javascriptissexy.com/javascript-objects-in-detail/).

## Javascript Data Types

- Mutable
  - Object
- Immutable / simple
  - Number
  - String
  - Boolean
  - Undefined
  - Null

## What is an Object

```javascript
var myName = {firstName: 'Jason', lastName: 'Kim'};
```

- Unordered
  - Like a dictionary or a hash table
  - Unlike an array
- Contains data of types:
  - primitives
  - references
- Has properties written in
  - unique names
  - strings or numbers

## Reference Data Types and Primitive Data Types

- Reference data types
  - stored as a reference
- Primitive data types
  - directly stored on the variable
- Saved-as-value
```javascript
var person = 'Kobe';
var anotherPerson = person;
person = 'Bryant';

console.log(anotherPerson); // Kobe
console.log(person); // Bryant
```
  `anotherPerson` was saved a value.
- Saved-as-reference
```javascript
var person = {name: "Kobe"};
var anotherPerson = person;
person.name = "Bryant";

console.log(anotherPerson.name); // Bryant
console.log(person.name); // Bryant
```
  `anotherPerson` was saved as a reference to `person`. Changes to the property of `person` affects `anotherPerson` as well.

## Object Data Properties Have Attributes

- Object property that stores regular data
- 3 other attributes set to default
  - configurable attribut
  - enumerable
  - writable

## Creating Objects

- Objects can contain
  - Numbers
  - Strings
  - Arrays
  - Other Objects
- Object literal
```javascript
var myBooks = {};

var mango = {
  color: "yellow",
  shape: "round",
  sweetness: 8,

  howSweetAmI: function () {
    console.log("Hmm Hmm Good");
  }
}
```
- Object constructor
```javascript
var mango =  new Object ();
mango.color = "yellow";
mango.shape= "round";
mango.sweetness = 8;

mango.howSweetAmI = function () {
  console.log("Hmm Hmm Good");
}
```

## Practical Patterns for Creating Objects

- Use these patterns when you want to create objects
  repeatedly many times
- Constructor pattern for creating objects
```javascript
function Fruit (theColor, theSweetness, theFruitName, theNativeToLand) {

  this.color = theColor;
  this.sweetness = theSweetness;
  this.fruitName = theFruitName;
  this.nativeToLand = theNativeToLand;

  this.showName = function () {
    console.log("This is a " + this.fruitName);
  }

  this.nativeTo = function () {
    this.nativeToLand.forEach(function (eachCountry)  {
      console.log("Grown in:" + eachCountry);
    });
  }
}
```
- Prototype pattern for creating objects
```javascript
function Fruit () {

}

Fruit.prototype.color = "Yellow";
Fruit.prototype.sweetness = 7;
Fruit.prototype.fruitName = "Generic Fruit";
Fruit.prototype.nativeToLand = "USA";

Fruit.prototype.showName = function () {
  console.log("This is a " + this.fruitName);
}

Fruit.prototype.nativeTo = function () {
  console.log("Grown in:" + this.nativeToLand);
}
```
