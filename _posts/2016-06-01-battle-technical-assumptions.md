---
layout: post
title: "Battle Technical Assumptions"
date: 2016-06-01 22:30:56 -0700
comments: true
categories: ["software development"]
---

I was burned pretty bad yesterday. I’ve told myself many times to battle assumptions about feature and product requirements, and that product managers cannot give 100% oversight on what I am working on. Now I am going to add another kind of assumption I will question every time. The kind I am talking about is a technical assumption.

Just like assumptions you make about a feature or a product, as a developer, making wrong technical assumptions can cost you dearly. Making technical assumptions get you started with the development faster, but you are playing a Russian roulette with yourself if you don’t have adequate technical planning to accompany your development process.

Wrong technical assumptions can lead you to think that you are able to accomplish something when it is not technically feasible. I learned this the hard way yesterday at work.

![](http://i.imgur.com/UtV84yu.png)

Currently we are having some nasty memory leak problem on the production environment coupled with unstable Redis storage and periodic slow down of upstream services.
My team is working really hard to resolve the issue.
After researching how to debug production Node systems, I decided that I would try getting some memory snapshots on a production server, and examine what is causing the memory increase.
I chose to use [heapdump](https://github.com/bnoordhuis/node-heapdump) to get V8 heap snapshots, and use Chrome’s developer tools’ profiler to examine the data.

![](http://i.imgur.com/tOL9Xir.png)

In theory this was just perfect.
In practice, I made some unsound technical assumptions which resulted in a full day wasted.
Our local development environment are running Node 4.2.4 and the latest NPM 3.x. I was able to install Heapdump package no problem locally. But on the production environment, we are still running NPM 1.x!
I couldn’t find a way to install Heapdump on production. This problem itself can be solved by updating NPM obviously, but we haven’t fully tested how NPM 3 would work with our deployment process to our beta, load, and production environment.
Also any infrastructure change must be orchestrated through our TechOps team, and that typically takes several days to coordinate all efforts.

Wrong technical assumptions are just as deadly as feature/product assumptions.
I will plan out more granular and incremental steps to determine how each development process will be carried out to meet the acceptance criteria of the feature story from now on.
