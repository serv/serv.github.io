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

```js
Person = Backbone.Model.extend({
  initialize: function() {
    alert("Welcome");
  }
});

var person = new Person;
```
- `initialize()` is called when you create a new instance of a model.

## Setting attributes

```js
Person = Backbone.Model.extend({
  initialize: function() {
    alert("Welcome to this world");
  }
});

var person = new Person({ name: "Thomas", age: 67});
var person = new Person();
person.set({ name: "Thomas", age: 67});
```

## Getting attributes
```js
Person = Backbone.Model.extend({
  initialize: function() {
    alert("Welcome to this world");
  }
});

var person = new Person({ name: "Thomas", age: 67, child: 'Ryan'});
var age = person.get("age"); // 67
var name = person.get("name"); // "Thomas"
var child = person.get("child"); // 'Ryan'
```

## Model defaults
```js
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
```

## Manipulate model attributes
```js
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
```

## Listen to changes of an attribute
```js
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
```

## Interacting with the server
### Set url
```js
var UserModel = Backbone.Model.extend({
  urlRoot: '/user',
  defaults: {
    name: '',
    email: ''
  }
});
```

### Creating a new model
```js
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
```

### Getting a model
```js
// Here we have set the `id` of the model
var user = new Usermodel({id: 1});

// The fetch below will perform GET /user/1
// The server should return the id, name and email from the database
user.fetch({
  success: function (user) {
    alert(user.toJSON());
  }
});
```

### Updating a model
```js
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
```

### Deleting a model
```js
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
```
