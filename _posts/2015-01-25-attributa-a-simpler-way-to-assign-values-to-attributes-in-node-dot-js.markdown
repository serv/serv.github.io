---
layout: post
title: "attributa: a simpler way to assign values to attributes in node.js"
date: 2015-01-25 21:04:45 -0800
comments: true
categories: ['javascript', 'node.js']
---

[Attributa](https://github.com/serv/attributa) is a node.js package
that helps you to assign multiple attributes
in just one line.

## Problem

Did you ever have to do this?

{% highlight js %}
function User(data) {
  this.username = data.username;
  this.password = data.password;
  this.address = data.address;
  this.email = data.email;
  // ...
  // After a dozen more attributes...
  this.privacySetting = data.privacySetting;
}
{% endhighlight %}

## Solution

You can now do this instead!

{% highlight js %}
function User(data) {
  attributa(this, data);
}
{% endhighlight %}

The installation instructions and docs can be found in
[the repository](https://github.com/serv/attributa).
