---
layout: post
title: "Metaprogramming in Ruby should be avoided if possible"
date: 2015-06-06 10:36:48 -0700
comments: true
categories: ["ruby"]
---

This isn't the first time [someone has considered metaprogramming in ruby to be harmful](https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=metaprogramming%20harmful),
and it won't be the last. Metaprogramming is useful when you are programming
reactively against external changes that you have to account for with your
code. An example I like to use is the time when I had to create attributes
for an object based on external json object. So even if the json object
changes its attributes, the ruby program is able to account for the changed
attributes.

However, in the real world, proper use of metaprogramming is infrequent.
I would even venture to say that, if you are considering doing something
with metaprogramming in Ruby, stop and try to solve it without metaprogramming.

Metaprogramming is not obvious and even to the author himself, it'll become
less obvious over time. Metaprogramming often ends up ugly. This is
certainly true for someone else reading the code. It is harder to debug.
You end up having a hard time finding the code using `grep` or the text editor because
the code is obscured via metaprogramming.

If you must metaprogram, document it well. Let your colleagues know what you
are doing. Be very open about how your metaprogramming works. And it never
hurts to get a second opinion on how you can avoid doing this altogether.
