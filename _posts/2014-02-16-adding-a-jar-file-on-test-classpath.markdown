---
layout: post
title: "Adding a .jar file on test classpath"
date: 2014-02-16 14:33:17 -0800
comments: true
categories: ['java', 'os']
---

I am *anti-Eclipse* just because, so I like to add `.jar` file manually.

1. Create `~/.dev` directory
2. Add the jar file (in my case, `junit-4.11.jar`) you want to include in `~/.dev`.
3. In `~/.bash_profile`, add `export CLASSPATH=$CLASSPATH:~/.dev/junit-4.11.jar`
4. Close the current terminal and open a new terminal.

My system is Mac OS X Mavericks version 10.9.1.
