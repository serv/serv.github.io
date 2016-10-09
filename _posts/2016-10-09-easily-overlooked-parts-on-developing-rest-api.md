---
layout: post
title: 'Easily Overlook Parts on Developing REST API'
date: 2016-10-09 09:45:58 -0700
comments: true
categories: ['api', 'rest']
---

I recently transitioned off the API team and moved
work on web client team at work. I wanted to share
some things I wish I had known when I was deepdiving
in developing REST API.

## 1. Stability uber alles

You can drop nearly everything on the ground and
focus on restoring stability of the API. No one
will mind.

## 2. Versioned API from the start

APIs are suppose to return consistent data that's
been agreed by the server and the client. There
are times when the server must change the response
body structure to serve the needs of some clients
better. You should not change the response structure
for a given endpoint in such case. You should
version your API so that you can serve the needs
of the old clients and new clients equally well.

Versioning can easily be a topic of conversation
on its own, but here are several considerations
you need to make when you implement versioning.

- Where is versioning going to occur?
  At load balancer or at app?
- Is it going to be done via header or url?
- How are you going to isolate the code change to
  remain within a specific version? Also while
  ensuring that the versioning doesn't make coding
  any more difficult.
- How will you automatically test the newly
  versioned APIs?

## 3. Use API specs

Make use of spec to come to an agreement between
you and the clients before building the API.
You will be able to serve their needs better and
also possibly explain to the clients your limitations.

## 4. Load testing

I didn't realize how important this is until
our production environment was adversely affected
by some feature changes we made without properly
load testing them first. Develop a load testing
strategy for your codebase and be ready to reject
code changes that could affect production
environment negatively.

## 5. Leverage your teammates and clients for advice

Compared to other kind of products I used to work
on developers usually have more correct opinions
about building API.
