---
layout: post
title: "Reading 'What Is a View?'"
date: 2014-07-04 16:15:21 -0700
comments: true
categories: javascript
---

## tl;dr

- Reading ["What is a view?"](http://backbonetutorials.com/what-is-a-model/)

## What is a view?

- Reflects changes in model
- Listens to events and react

```js
SearchView = Backbone.View.extend({
  initialize: function(){
    alert("Alerts suck.");
  }
});

var search_view = new SearchView();
```

## `el` property

- Refers to the DOM object created in the browser
- Default: empty <div> element

```js
<div id="search_container"></div>

<script type="text/javascript">
  SearchView = Backbone.View.extend({
    initialize: function(){
      alert("Alerts suck.");
    }
  });

  var search_view = new SearchView({ el: $("#search_container") });
</script>
```

## Loading a template

- Using `underscore`
- `render()`
  - Called when view is initiated
  - Load the template into the view's `el` property using jQuery

```js
<script type="text/template" id="search_template">
  <label>Search</label>
  <input type="text" id="search_input" />
  <input type="button" id="search_button" value="Search" />
</script>

<div id="search_container"></div>

<script type="text/javascript">
SearchView = Backbone.View.extend({
  initialize: function(){
    this.render();
  },
  render: function(){
    // Compile the template using underscore
    var template = _.template( $("#search_template").html(), {} );
    // Load the compiled HTML into the Backbone "el"
    this.$el.html( template );
  }
});

var search_view = new SearchView({ el: $("#search_container") });
</script>
```

## Listen for events

- Listen with a listener
- Even listen attached to child elements of `el`

```js
<script type="text/template" id="search_template">
  <label><%= search_label %></label>
  <input type="text" id="search_input" />
  <input type="button" id="search_button" value="Search" />
</script>

<div id="search_container"></div>

<script type="text/javascript">
  SearchView = Backbone.View.extend({
    initialize: function(){
      this.render();
    },
    render: function(){
      var variables = { search_label: "My Search" };
      var template = _.template( $("#search_template").html(), variables );
      this.$el.html( template );
    },
    events: {
      "click input[type=button]": "doSearch"
    },
    doSearch: function( event ){
      // Button clicked, you can access the element that was clicked with event.currentTarget
      alert( "Search for " + $("#search_input").val() );
    }
  });

  var search_view = new SearchView({ el: $("#search_container") });
</script>
```
