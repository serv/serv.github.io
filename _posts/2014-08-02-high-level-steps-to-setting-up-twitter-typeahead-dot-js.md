---
layout: post
title: "High level steps to setting up Twitter Typeahead.js to work with Backbone.js"
date: 2014-08-02 13:44:42 -0700
comments: true
categories: ["javascript"]
---

## tl;dr

To use [Twitter Typeahead.js](https://github.com/twitter/typeahead.js/) with Backbone.js,
you need to set up the typeahead function in a Backbone view's `render()`.
And you need to style the typeahead dropdown appropriately with css.

## What is Twitter Typeahead?

![](http://i.imgur.com/AjpDzWL.png)

Twitter Typeahead is a autocomplete/suggestion engine
made for text fields on websites. As a dependency,
Typeahead requires jQuery.

## Typeahead with Backbone

### 1

Check the [Typeahead examples](https://twitter.github.io/typeahead.js/examples/)
and find the example that is suitable for
your app's use case.

### 2

Copy the example js code and create a function
in the view which is responsible for generating the form.

{% highlight js %}
// ...

this.twitterTypeahead: function() {
// constructs the suggestion engine
var states = new Bloodhound({
datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
queryTokenizer: Bloodhound.tokenizers.whitespace,
// `states` is an array of state names defined in "The Basics"
local: \$.map(states, function(state) { return { value: state }; })
});

// kicks off the loading/processing of `local` and `prefetch`
states.initialize();

\$('#bloodhound .typeahead').typeahead({
hint: true,
highlight: true,
minLength: 1
},
{
name: 'states',
displayKey: 'value',
// `ttAdapter` wraps the suggestion engine in an adapter that
// is compatible with the typeahead jQuery plugin
source: states.ttAdapter()
});
},

// ...
{% endhighlight %}

### 3

This function should run within the view's `render()`
function.

{% highlight js %}
// ...
this.redner: function() {
// ...
this.twitterTypeahead();
// ...
},
// ...
{% endhighlight %}

### 4

You need to style the typeahead drowpdown. See
this [stackoverflow thread](http://stackoverflow.com/questions/20198247/twitters-typeahead-js-suggestions-are-not-styled-have-no-border-transparent-b)
for more info.

### 5 Optional

If you happen to use a remote source for data,
use the remote example in the Twitter Typeahead example
page. Also on the server side, set up routes, controller etc.
for allowing the Typeahed to make calls to your server
for data.
