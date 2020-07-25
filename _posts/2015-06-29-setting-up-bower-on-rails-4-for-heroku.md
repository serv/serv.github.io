---
layout: post
title: "Setting up Bower on Rails 4 for Heroku"
date: 2015-06-29 10:51:56 -0700
comments: true
categories: ["rails"]
---

We know Bower is great for managing frontend packages such as jQuery and Bootstrap.
I noticed that it's not obvious how I can use Bower with Rails and Heroku.
Here is how I set up Bower to work with Rails 4 app running on Heroku.

My local system setup looks like this.

- OS X Yosemite V 10.10.3
- ruby 2.2.1p85 (2015-02-26 revision 49769) [x86_64-darwin14]
- Rails 4.2.3
- Bower 1.4.1
- Node v0.10.38

## 1. Prerequisites

I'm gonna assume that you have some basics down already.

- Install Ruby and Ruby on Rails.
- Install Node and have npm working.
- Install Bower

## 2. Configure npm package and bower package

Run `npm init` to create `package.json` file with correct npm
configuration for your app.

Now run `npm install bower --save`. This will include bower as a
dependency for your npm package.json.

Whenever you install a npm package, add `--save` to automatically
add the package as the dependency.

Run `bower init` to create `bower.json` file with correct bower
configuration for your app.

Now install your packages running `npm install [pakcage-name] --save`.

Again, whenever you install a bower package, add `--save` to automatically
add the bower package as the dependency.

## 3. Make Bower work with Rails

Let's specify where bower packages are installed on the Rails app.

Create a file called `.bowerrc`, and add

{% highlight json %}
{
"directory": "vendor/assets/bower_components"
}
{% endhighlight %}

`vendor/assets/bower_components` is where bower packages will be installed.

At this point, let's edit `.gitignore`, so we don't commit npm packages or bower packages.
At the end of `.gitignore` file, add

{% highlight text %}
node_modules
vendor/assets/bower_components
{% endhighlight %}

In `config/application.rb`, add:

{% highlight ruby %}
config.assets.paths << Rails.root.join('vendor', 'assets', 'bower_components')
{% endhighlight %}

This will ensure that Rails picks up asset files from where bower packages are
installed.

If you wanna start using Bootstrap for example, in the `app/assets/stylesheets/application.css`,
you can add:

{% highlight js %}
\*= require bootstrap/dist/css/bootstrap
{% endhighlight %}

And in `app/assets/javascript/application.js`,

{% highlight js %}
//= require bootstrap/dist/js/bootstrap
{% endhighlight %}

Make sure restart the Rails app to see the bower packages working with Rails.

## 4. Use Bower on Heroku

At this point, Bower should be working well with Rails on your local environment.
However, when you try to use it on Heroku, it'll error out while it
is trying to precompile assets.

This part, I am following some steps taken in [Anthony Smith's post](https://coderwall.com/p/6bmygq/heroku-rails-bower).

Configure Heroku to use ddollar's multi-buildpack:

`heroku config:add BUILDPACK_URL=https://github.com/ddollar/heroku-buildpack-multi.git`

Create a file called: `.buildpacks` and add:

{% highlight text %}
https://github.com/heroku/heroku-buildpack-nodejs
https://github.com/heroku/heroku-buildpack-ruby
{% endhighlight %}

Make sure that the ruby buildpack is the last one in the list.
This will allow you to access the Rails console when running heroku run console.

In the `package.json`, add a postinstall script. It should look like this.

{% highlight json %}
{
...

"scripts": {
"postinstall": "./node_modules/bower/bin/bower install"
}

...
}
{% endhighlight %}

Now push to Heroku!

`git push heroku master`

`npm install` will take a while to finish.
