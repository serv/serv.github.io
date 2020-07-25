---
layout: post
title: "Random Thoughts On Using Backbone.js For 3 Months"
date: 2014-10-11 09:46:52 -0700
comments: true
categories: ['javascript', 'backbone']
---

## tl;dr

- Backbone.js is amazing
- Event driven development was a paradigmatic shift.
- Backbone won't stop you from writing bad code.
- Overwhelmed with other tools
- Creating global variables and methods are not straight forward in Backbone.

Let me preface the entire post by saying, Backbone.js is awesome.
I've been using Backbone.js for last 3 months at work and doing a side project.
I can't imagine pulling them off in pure jQuery alone.
Backbone.js was instrumental in my work.
In this post, I am writing briefly about how I felt about using Backone.js and
some observations I made about the library.

Coming from Rails world with some jQuery flavour in the front end, events
were not a huge deal for me. I never really worried about events in the Rails
side. Even on the front end, I used events in jQuery very limitedly.

On the other hand in Backbone, events are extremely important and useful.
It helps you to write simpler and modular code. Less if-else spaghettis and
chained up functions calling some other functions and so on. With events, even
if one thing falls down, the other part that depends on the event still won't
fall apart.

At the same time though, you can still create a mess when events are chain up
together. I find the debugging sometimes is harder with event driven code
because the links between different parts of the code are not explicit anymore.
A new coder diving into the pre-existing backbone.js codebase will have
some trouble understanding how different parts of the code are working together.
This is because there's less if-else, and explicit chains of functions to
indicate how different codes are working together.

Backbone.js does help you to writing cleaner code. Having more structured js code
with models, views and routes definitely make the code more understandable.
But it seems as though, there's no perfect guard against shitty code.
I still saw myself writing junk and memory hogging code. Rendering a page
multiple times needlessly and making unnecessary ajax calls to server slowing
the page down. So you still to me mind the performance can be hit using
backbone.js.

Backbone.js often comes with many other tools to learn about.

- require.js for loading modules
- marionette.js for giving more structure and proving commonly used functions in backbone
- handlebars.js for templating
- underscore.js for useful functions on arrays, collections, and misc. js objects
- jquery for dom manipulation and ajax

I also started using:

- yeoman for setting up app dev environment
- grunt.js for automating repetitive tasks
- npm and bower for managing js packages

I noticed that doing something I would consider to be really easy to do in
Rails were more complicated and not straight forward. Stuff like global
variables, view helpers, partial views etc were all doable in backbone, but
there's always more than one way to do things in backbone. That makes things hard for
newcomers.

Overall, my adventure in backbone.js is turning out to be a very fruitful one.
I am learning a lot fast and I can't wait to dig deeper into backone and maybe
try out other frameworks like Angular and Ember more seriously.
