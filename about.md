---
layout: page
title: About
permalink: /about/
---

I am a software engineer working for the music streaming company,
[Rhapsody](http://rhapsody.com)
in Seattle, WA. I graduated in 2012 with a degree in
electrical engineering from the [University of Waterloo](https://uwaterloo.ca/),
Canada.

My interests largely revolve around technology and software development.
Programming languages I like are Ruby and Javascript.

## Projects

I am currently working on [Pingkerton](https://pingkerton.com/).
App servers hosted on Heroku and AWS will become idle when the server is
inactive for a certain period of time. This causes app to have a
lengthy initial load time when it restarts.
To avoid this, every 30 minutes, Pingkerton will ping your app.
This ensures that your apps stay awake. Pingkerton is my first attempt at
building a SaaS application. It contains all the basic features you would
see in a SaaS app such as user authentication over HTTPS, password recovery
flow, and user settings page. Pingkerton uses Ruby on Rails, nginx, Postgresql
for main storage and Redis for application configuration caching. Pingkerton
lives on Digital Ocean and I use Capistrano to deploy the app.

[Dmtri](https://bitbucket.org/jasonk/dmtri2/src) is a forum with
a strong focus on user anonymity. Imagine Reddit but where user can
decide to hide their username sometimes when they want to voice
unpopular opinions. Dmtri uses Ruby on Rails and PostgreSQL.
It used to be hosted on Heroku.

{% include icon-github.html username="serv" %} /
[Supurl API](https://github.com/serv/supurl-api) and
{% include icon-github.html username="serv" %} /
[Supurl web client](https://github.com/serv/supurl)
together make a social bookmarking tool like Delicious.com.
Supurl API provides the backend for
Supurl web client. It is built using Ruby on Rails,
[Grape](https://github.com/ruby-grape/grape) and PostgreSQL.
Supurl web client is a single page application that uses
Backbone.js and jQuery. Writing Supurl API helped me learn
about REST API and its common practices. Supurl web client
helped me learn to use Backbone.js more comfortably and gave me a glimpse
into the complex ecosystem of javascript applications on web
browsers. I also learned about [OAuth 2.0](http://oauth.net/2/) by
rolling out my own *highly insecure* implicit flow for the OAuth system.

[Youtube.md](https://chrome.google.com/webstore/detail/youtubemd/akjklakeodbdkmcligjlmaoihkfinegl)
is a Chrome Extension that create a markdown code snippet
when a Youtube video URL is given. I wanted to check out the basics of
Ember.js by creating Youtube.md.

[Attributa](https://www.npmjs.com/package/attributa) is a node.js package
that helps you assign attributes to objects or `this` with just one line.
This was my first attempt at creating a NPM package in order to try out
Node.js.

{% include icon-github.html username="serv" %} / [4chanify](https://github.com/serv/fourchanify)
is a Ruby gem that lets you download images from 4chan from your terminal.
