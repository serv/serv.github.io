---
layout: post
title: 'What I learned upgrading a large Ember.js project from v2.3.0 to v2.12.1'
date: 2017-05-28 13:00:00 -0700
comments: true
categories: ['software development']
---

I worked on upgrading a ~19 KLOC Ember.js codebase.
The previous Ember.js version was 2.3.0.
Now it is 2.12.1. Here, I am going to discuss why I had to upgrade
Ember.js, general approach to solving problems while upgrading a
framework.

For a long time, Ember.js version 2.3.0 served us just fine. The framework
pretty much provided us with everything we needed out of
the box and small flaws here and there didn't bother us. However, over
time, there started to arise several glaring problems with using an
older Ember.js version.

As our app grew larger with some pages generating a large number of
components in a view, we experienced noticeable performance degredation in
DOM rendering. To mitigate this problem, we used an alternative way to
render components, [ember-cli-raw-handlebars](https://www.npmjs.com/package/ember-cli-raw-handlebars) which stripped away much of Ember related functionalities from the view
in order to increase the DOM rendering speed. The trade off for this was
introducing the "none-Ember.js" way of organizing our codebase, which made
our codebase look rather messy.

Using older Ember.js also made it hard to use newer packages out in the wild.
When we wanted to introduce a new package or upgrade an existing package
to a newer version, the Ember framework started to throw cryptic errors
that were hard to debug and fix. The cost of not upgrading Ember.js became
greater than the convenience of relying on an older Ember.js.

## Procedure to upgrade Ember.js

Ember v2.3.0 came out on Jan 17, 2016. A lot has changed since then. Simply
bumping the Ember version to the latest simply will not work. There will
be a lot of noticeable and unnoticeable bugs from doing that. Fixing those bugs
all at once is very difficult. I built a procedure to safely upgrade Ember.js
without creating tons of regressions.

I needed Ember.js upgrade only branch on beta environment. Upgrading Ember.js
of a large endeavor takes a long time. Most likely, you will be asked to develop
features and fix bugs while you are working on upgrade Ember. For that reason,
preparing an isolated Ember.js upgrade only branch on beta will be
useful to allow QA to test the branch while you are working on other features.

I wrote more automated tests. While I was making changes to the Ember.js
upgrade branch, I needed to make sure that I wasn't breaking things while
I fix an issue. Automated tests helped me make sure that I make
safe changes that are tested.

Since your team most likely will QA and review your changes, they will
also need to know how to prepare the development environment for the
Ember upgrade and how to bring it back to their own normal development
environment. I made sure this is clearly described and communicated to
others.

Having some dedicated QA time is also really important. Framework update
touches all aspects of the app, and every core functionalities need to
be tested thoroughly before the change is released on production.

I used binary search like algorithm to bump the versions to the move towards
the latest version.

{% highlight ruby %}
next_non_erroring_version(start_version, destination_version)
  return start_version if start_version == destination_version

  half_way = (destination_version - start_version) / 2

  if causes_error?(half_way)
    next_non_erroring_version(start_version, half_way - patch_version('0.0.1'))
  else
    next_non_erroring_version(half_way + patch_version('0.0.1'), destination_version)
  end
end

next_non_erroring_version('2.3.0', '2.12.1') + patch_version('0.0.1')
{% endhighlight %}

The method above tries to find the first version closest to the original
version to causes error.


