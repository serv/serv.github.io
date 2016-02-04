---
layout: post
title: "Reading 'What is a router?'"
date: 2014-07-04 22:51:25 -0700
comments: true
categories: javascript
---

## tl;dr

Reading of [What is a router?](http://backbonetutorials.com/what-is-a-router/).

## What is a router?

- Routing app using (#)
- Route matches a corresponding function
- Interpret anything after #
- Example: http://example.com/#/pages/help

```js
<script>
var AppRouter = Backbone.Router.extend({
  routes: {
    "*actions": "defaultRoute" // matches http://example.com/#anything-here
  }
});
// Initiate the router
var app_router = new AppRouter;

app_router.on('route:defaultRoute', function(actions) {
  alert(actions);
});

// Start Backbone history a necessary step for bookmarkable URL's
Backbone.history.start();

</script>
```

## Dynamic routing

- Example: http://example.com/#/posts/12

```js
<script>
var AppRouter = Backbone.Router.extend({
  routes: {
    "posts/:id": "getPost",
    "*actions": "defaultRoute"
  }
});

var app_router = new AppRouter;
app_router.on('route:getPost', function (id) {
  // Note the variable in the route definition being passed in here
  alert( "Get post number " + id );
});
app_router.on('route:defaultRoute', function (actions) {
  alert( actions );
});

Backbone.history.start();

</script>
```

## ":params" and "*splats"

- params
  - Match any URL components between slashes
- splats
  - Match any number of URL components
  - Last variable in the URL
    - Any and all components
- These are passed as arguments

```js
var AppRouter = Backbone.Router.extend({
  routes: {
    "posts/:id": "getPost",
    // <a href="http://example.com/#/posts/121">Example</a>

    "download/*path": "downloadFile",
    // <a href="http://example.com/#/download/user/images/hey.gif">Download</a>

    ":route/:action": "loadView",
    // <a href="http://example.com/#/dashboard/graph">Load Route/Action View</a>
  },
});

app_router.on('route:getPost', function( id ){
  alert(id); // 121
});
app_router.on('route:downloadFile', function( path ){
  alert(path); // user/images/hey.gif
});
app_router.on('route:loadView', function( route, action ){
  alert(route + "_" + action); // dashboard_graph
});
```
