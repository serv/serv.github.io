---
layout: post
title: "Reading 'Javascript Hoisting'"
date: 2014-06-26 15:26:37 -0700
comments: true
categories: javascript
---

## tl;dr

This is tldr for the second half of [Javascript Is Sexy's article titled "JavaScript Variable Scope and Hoisting Explained"](http://javascriptissexy.com/javascript-variable-scope-and-hoisting-explained/) only covering variable scope.

## Variable Hoisting

- Variable declaration
  - Inside a function
    - Hoisted (lifted and declared) to the top of the function
{% highlight js %}
// How it's written
function showName() {
  console.log ("First Name: " + name);
  var name = "Ford";
  console.log ("Last Name: " + name);
}

showName();
{% endhighlight %}

{% highlight js %}
// How it's actually processed
function showName () {
	var name;
  console.log ("First Name: " + name); // First Name: undefined

  name = "Ford";

  console.log ("Last Name: " + name); // Last Name: Ford
}
{% endhighlight %}
  - Outside a function
    - Global context

- Function declaration
  - Has precedence over variable declaration
  - But not variable assignment
- Function expressions are not hoisted
{% highlight js %}
var myName = function () {
  console.log ("Rich");
}
{% endhighlight %}
