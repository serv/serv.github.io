---
layout: post
title: "Reading 'JavaScript Closures'"
date: 2014-06-29 18:55:31 -0700
comments: true
categories: javascript
---

## tl;dr

This is tldr for
[Javascript Is Sexy's article titled "Understand JavaScript Closures With Ease"](http://javascriptissexy.com/understand-javascript-closures-with-ease/).

## What is closure?
- Function
  - Created by
    - Adding a function inside a function
  - Inner function with access to outer function's variable
    - AKA scope chain
      - access to
        - Its own scope
        - Outer function's variables
        - Global variables
  - Inner function
    - Access to outer function's variable
    - Outer function parameter
    - Cannot use "arguments"
      - But can call function parameters

- Pure javascript example
```javascript
function showName(firstName, lastName) { 
  var nameIntro = "Your name is ";

  function makeFullName () { 
    return nameIntro + firstName + " " + lastName; 
  }

  return makeFullName (); 
} 

showName("Michael", "Jackson"); // Your name is Michael Jackson 
```
- jQuery example
```javascript
$(function() {

  var selections = [];
  $(".niners").click(function() { // this closure has access to the selections variable
    selections.push (this.prop("name")); // update the selections variable in the outer function's scope
  });

});
```

## Rules and side effects

- Closures have access to the outer function’s variable even after the outer function returns
  - You can call inner function later in the program
```javascript
function celebrityName(firstName) {
    var nameIntro = "This celebrity is ";
   function lastName(theLastName) {
        return nameIntro + firstName + " " + theLastName;
    }
    return lastName;
}

var mjName = celebrityName("Michael");

mjName("Jackson");
```

- Closures store references to the outer function’s variables

```javascript
function celebrityID () {
  var celebrityID = 999;

  return {
    getID: function ()  {
      return celebrityID;
    },
    setID: function (theNewID)  {
      celebrityID = theNewID;
    }
  }
}

var mjID = celebrityID();
mjID.getID(); // 999
mjID.setID(567); // Changes the outer function's variable
mjID.getID(); // 567: It returns the updated celebrityId variable 
```

- Immediately Invoked Function Expression

```javascript
function celebrityIDCreator (theCelebrities) {
  var i;
  var uniqueID = 100;
  for (i = 0; i < theCelebrities.length; i++) {
    // the j parametric variable is the i passed in on invocation of this IIFE
    theCelebrities[i]["id"] = function(j)  {
      return function() {
        // each iteration of the for loop passes the current value of i into
        // this IIFE and it saves the correct value to the array
        return uniqueID + j;
      }()
      // BY adding () at the end of this function,
      // we are executing it immediately and returning just
      // the value of uniqueID + j, instead of returning a function.
    }(i);
    // immediately invoke the function passing the i variable as a parameter
    // basically j has the i value
  }

  return theCelebrities;
}

var actionCelebs = [
  {name:"Stallone", id:0},
  {name:"Cruise", id:0},
  {name:"Willis", id:0}
];

var createIdForActionCelebs = celebrityIDCreator(actionCelebs);

var stalloneID = createIdForActionCelebs[0];
 console.log(stalloneID.id); // 100

var cruiseID = createIdForActionCelebs[1];
 console.log(cruiseID.id); // 101
```
