---
layout: post
title: "Benchmarking Web Frameworks"
date: 2016-07-21 21:45:58 -0700
comments: true
categories: ['node.js', 'ruby', 'java', 'restify', 'spark', 'ruby on rails']
---

I had some time over the weekend, and I decided that I would benchmark some
web frameworks for possible backend API to work with in the future. I copied
[how Koa.js does its benchmark](https://github.com/koajs/koa/blob/master/benchmarks/run).
I prepared [Ruby on Rails](http://rubyonrails.org/),
[Restify](http://restify.com/), and [Spark](http://sparkjava.com/) to be
benchmarked. You can see [the code hosted on GitHub here](https://github.com/serv/framework-benchmarks).

Here are the results of the benchmarks. The number represents requests / second.
Higher is better.

| frameworks        | req/s    |
|-------------------|----------|
| ruby on rails     | 48.73    |
| restify           | 8117.63  |
| spark             | 32634.10 |

![Web framework benchmarked](http://i.imgur.com/gOoneii.png)

I knew Ruby on Rails is slow, but I had no idea that it's this slow. And on
the other hand, I knew Java web frameworks are generally fast, but I had no
idea that Spark is that fast! And Restify occupies a sweet spot between
Ruby on Rails and Spark.

We can draw some conclusions from the findings.

- Use Spark for very highly trafficked microservices that requires requests
  to be served at low latency
- Use Restify for all kinds of backend API when you want to leverage a vast
  catalog of Node.js packages and great development tools
- Reserve using Ruby on Rails for product oriented application only.
  I would not recommend Ruby on Rails for backend API that needs to
  serve a large traffic.
