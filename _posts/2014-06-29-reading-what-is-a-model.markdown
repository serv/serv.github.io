---
layout: post
title: "Reading 'What is a model?'"
date: 2014-06-29 22:13:45 -0700
comments: true
categories: ['javascript', 'backbone.js']
---

## tl;dr

- Reading ["What is a model?"](http://backbonetutorials.com/what-is-a-model/)

## What is a model?

- Interactive data
- Logic surrounding data
  - Conversion
  - Validation
  - Computed properties
  - Access control

{% highlight js %}
Person = Backbone.Model.extend({
  initialize: function() {
    alert("Welcome");
  }
});

var person = new Person;
{% endhighlight %}
- `initialize()` is called when you create a new instance of a model.

## Setting attributes

{% highlight js %}
Person = Backbone.Model.extend({
  initialize: function() {
    alert("Welcome to this world");
  }
});

var person = new Person({ name: "Thomas", age: 67});
var person = new Person();
person.set({ name: "Thomas", age: 67});
{% endhighlight %}

## Getting attributes
{% highlight js %}
Person = Backbone.Model.extend({
  initialize: function() {
    alert("Welcome to this world");
  }
});

var person = new Person({ name: "Thomas", age: 67, child: 'Ryan'});
var age = person.get("age"); // 67
var name = person.get("name"); // "Thomas"
var child = person.get("child"); // 'Ryan'
{% endhighlight %}

## Model defaults
{% highlight js %}
Person = Backbone.Model.extend({
  defaults: {
    name: 'Fetus',
    age: 0,
    child: ''
  },
  initialize: function() {
    alert("Welcome to this world");
  }
});

var person = new Person({ name: "Thomas", age: 67, child: 'Ryan'});

var age = person.get("age"); // 67
var name = person.get("name"); // "Thomas"
var child = person.get("child"); // 'Ryan'
{% endhighlight %}

## Manipulate model attributes
{% highlight js %}
Person = Backbone.Model.extend({
  defaults: {
    name: 'Fetus',
    age: 0,
    child: ''
  },
  initialize: function() {
    alert("Welcome to this world");
  },
  adopt: function(newChildName) {
    this.set({child: newChildName});
  }
});

var person = new Person({ name: "Thomas", age: 67, child: 'Ryan'});
person.adopt('John Resig');
var child = person.get("child"); // 'John Resig'
{% endhighlight %}

## Listen to changes of an attribute
{% highlight js %}
Person = Backbone.Model.extend({
  defaults: {
    name: 'Fetus',
    age: 0
  },
  initialize: function(){
    alert("Welcome to this world");
    this.on("change:name", function(model){
      var name = model.get("name"); // 'Stewie Griffin'
      alert("Changed my name to " + name );
    });
  }
});

var person = new Person({ name: "Thomas", age: 67});
person.set({name: 'Stewie Griffin'}); // This triggers a change and will alert()
{% endhighlight %}

## Interacting with the server
### Set url
{% highlight js %}
var UserModel = Backbone.Model.extend({
  urlRoot: '/user',
  defaults: {
    name: '',
    email: ''
  }
});
{% endhighlight %}

### Creating a new model
{% highlight js %}
var UserModel = Backbone.Model.extend({
  urlRoot: '/user',
  defaults: {
    name: '',
    email: ''
  }
});
var user = new Usermodel();
// Notice that we haven't set an `id`
var userDetails = {
  name: 'Thomas',
  email: 'thomasalwyndavis@gmail.com'
};
// Because we have not set a `id` the server will call
// POST /user with a payload of {name:'Thomas', email: 'thomasalwyndavis@gmail.com'}
// The server should save the data and return a response containing the new `id`
user.save(userDetails, {
  success: function (user) {
    alert(user.toJSON());
  }
});
{% endhighlight %}

### Getting a model
{% highlight js %}
// Here we have set the `id` of the model
var user = new Usermodel({id: 1});

// The fetch below will perform GET /user/1
// The server should return the id, name and email from the database
user.fetch({
  success: function (user) {
    alert(user.toJSON());
  }
});
{% endhighlight %}

### Updating a model
{% highlight js %}
// Here we have set the `id` of the model
var user = new Usermodel({
  id: 1,
  name: 'Thomas',
  email: 'thomasalwyndavis@gmail.com'
});

// Let's change the name and update the server
// Because there is `id` present, Backbone.js will fire
// PUT /user/1 with a payload of `{name: 'Davis', email: 'thomasalwyndavis@gmail.com'}`
user.save({name: 'Davis'}, {
  success: function (model) {
    alert(user.toJSON());
  }
});
{% endhighlight %}

### Deleting a model
{% highlight js %}
// Here we have set the `id` of the model
var user = new Usermodel({
  id: 1,
  name: 'Thomas',
  email: 'thomasalwyndavis@gmail.com'
});

// Because there is `id` present, Backbone.js will fire
// DELETE /user/1
user.destroy({
  success: function () {
    alert('Destroyed');
  }
});
{% endhighlight %}
