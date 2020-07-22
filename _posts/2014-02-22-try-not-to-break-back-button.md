---
layout: post
title: "Try Not To Break The Back Button"
date: 2014-02-22 16:22:52 -0800
comments: true
categories: mobile web
---

I come across websites that break the Back button too often for bad reasons.
Back button is one of the longest living orthodoxies in web people take for 
granted, and rightly so.

![back](http://i.imgur.com/3FAYPf6.png?1)

Back button is useful. It serves its purpose for navigation so perfectly that
there's been little to no change done it for decades. Phones subsequently 
adopted it without modifying what it does that much. Back button remains
useful in mobile browser even more so because other kinds of precise actions
require so much more effort to pull off. Most users resort to the back button
for most of rudimentary navigations.

Back button gets broken with using `window.location` which will redirect the page to the address that `window.location` set to.

## Anatomy of Broke Back Button

![location](http://i.imgur.com/KBSu4K3.jpg)

1. User is on page A.
2. User clicks on a link and goes to B.
3. B has `window.location` set to page C.
4. User is finished with the page C, and wants to return to A.
5. User clicks back.
6. User is back to B, and is immediately redirected to C again.

There are some ways to mitigate the problem.

- Use redirect with countdown so that the user can get a chance to click 
back button again, while the countdown happens.
- If the redirect is to a mobile site for mobile users, try building 
adaptive or responsive site that doesn't require rediecting the user to a
new site
- Use a gentle call to action that prompts user to the mobile, instead of
a silent redirect.

Not breaking the default behaviour of the back button is a general rule of 
thumb. I am sure there are times, when you must end up breaking the back
button for a bigger gain. :)
