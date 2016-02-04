---
layout: post
title: "Reading 'What is a collection?'"
date: 2014-07-04 23:22:36 -0700
comments: true
categories: javascript
---

## tl;dr
Reading [What is a collection?](http://backbonetutorials.com/what-is-a-collection/)

## What is a collection

- an ordered set of models
```js
var Song = Backbone.Model.extend({
  initialize: function(){
    console.log("Music is the answer");
  }
});

var Album = Backbone.Collection.extend({
  model: Song
});
```

## Building a collection

```js
var Song = Backbone.Model.extend({
  defaults: {
    name: "Not specified",
    artist: "Not specified"
  },
  initialize: function(){
    console.log("Music is the answer");
  }
});

var Album = Backbone.Collection.extend({
  model: Song
});

var song1 = new Song({ name: "How Bizarre", artist: "OMC" });
var song2 = new Song({ name: "Sexual Healing", artist: "Marvin Gaye" });
var song3 = new Song({ name: "Talk It Over In Bed", artist: "OMC" });

var myAlbum = new Album([ song1, song2, song3]);
console.log( myAlbum.models ); // [song1, song2, song3]
```
