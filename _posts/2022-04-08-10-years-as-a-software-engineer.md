---
layout: post
title: 10 Years As a Software Engineer
date: 2022-04-08T15:15:28-07:00
comments: true
categories: []
---

The year 2022 marks the 10th year I've worked as a software engineer professionally.
There are lots of good memories, but I was noticing that I am starting to forget about the things I've done and learned.
This post is to archive the experience I had as a software engineer for the last 10 years or so.

## Beginning

I learned about Ruby on Rails in 2010 and read [Ruby on Rails Tutorial](https://www.railstutorial.org/book) by Michael Hartl.
I became familiar with the basics of web app development. I started to have hope that maybe I can code a web app on my own.

## Vidyard (Sep 2011 - Dec 2011)

This was my first programming coop job. When I think back, I was really lucky to get this job.
Vidyard is now a pretty big company now in Waterloo, Canada, but at the time I joined, 
there were less than 10 people in the company. 
It was a small company, but the spirit was high. It was so fun working there. The founders cared greatly about everyone they hired.
They made me feel welcome and be part of the company, even though I was just a coop who will work they just for 4 months.
I saw the leaders of the company becoming important focal points in the Waterloo tech scene. 
They may be young and still inexperienced at the time, but they stood out among many founders coming out of Waterloo at the time. 

I learned a lot working just 4 months there. I learned to use javascript and jQuery more. I still was not good at using either, but
exposure to it was important. I also shipped a feature that was sending out emails using Mailgun API. 

Working at Vidyard helped me decide that I want to become a software engineer. This was the most important realization I had 
from working here.

## Rhapsody / Napster (July 2012 - March 2018)

After I finished school around May 2012, I was busy applying to different entry level jobs all over US and Canada.
After failing many different interviews with different companies, I landed a job with Rhapsody, Seattle-based music streaming
company.

I worked on many different projects here. When I first joined the company, I built a FAQ / support page for the company.
Unfortuatenly, it didn't go to production. I then started working on the web streaming application built on Ruby on Rails, jQuery and Flash.
This was early example of a single page web app. When I think back, it's actually amazing that
such complex single page web app could be built with jQuery alone.

After this, I had a chance to work on a brand new project of my own. Napster was preparing international launch in several countries
in Europe and South America. I was asked to create a content managemeng system that can handle multiple regions and languages. 
I built the solution in Ruby on Rails and MySQL on the backend.

I worked on Sountracking application and the webclient to enable social sign in featrues.

I worked on the API Gateway which was built as the service our web and mobile clients was using.
This was the first Node.js application I worked on.

Then I lead the development of the web application for Napster. I didn't realize it as much at the time
but now when I think back, it was another lucky opportunity for me. I was leading the web application for
an app used by 2 million users at the time. It's unbelievable.

The most important thing I did was creating the new audio playback engine for Napster's webclient.
I deprecated the decade old Flash audio playback engine, and replacing it
with the HTML5 Audio player that is DRM compliant with all modern web browsers.

I created the new audio player using [Video.js](https://github.com/videojs/video.js).
The player was bundled with an newly emerging (at the time) builder called 
[Webpack](https://webpack.js.org/).
The hard problem was supporting [EME](https://web.dev/media-eme/) from all the major browsers.
Everything from development, testing and validating was an extreme undertaking and
whenever issues happened, reproducing the issues were challenging.
To make matters even more complicated, the browsers support different streaming protocols (DASH, HLS)
and DRMs (Widevine, Playready, Apple Fairplay).
This accomplishment means a lot to me because when I first joined Napster in 2012, 
the engineers in the web team were discussing ways to deprecate Flash player and move over to HTML5 
player. And in the end, I was able to do that.

At Napster, I learned to become independant and solve difficult technical challenges on my own.

## Coupang (March 2018 - Present)

I joined Coupang's advertising team as the number 2 engineer. The first thing I needed to do
was working on a data pipeline that provided the data foundation for other ad services
to be built. I described my experience building the data pipeline here as a [blog post](https://blog.jasonkim.ca/post/big-data-engineering-with-nodejs). I also gave a 
[talk about it in Seattle.js meetup](https://www.youtube.com/watch?v=HBHStmv4Y8g).

This was one of the toughest onboarding I've had at a new company or a new team ever. There was no engineering 
team to speak of. It was purely myself alone who needed to figure everything out. I understand that we
were in a startup mode, but in retrospect, it's still not a good excuse for not having any support
structure at all for any onboarding. This experience helped me learn how important it is to have a supportive
team and culture to help onboard engineers are.

Briefly, I'll state important components of a successful onboarding system.

- Documentation of systems and runbooks for them
  - Documentations are the most effective ways to scale the onboarding process. Use it.
- Overview of the business
  - Help engineers understand the goal of the overall business
- Mentor / buddy to sync up daily or a couple of times a week
  - Every blockage that seems trivial which may take hours to resolve for a new engineer can be solved in minutes by someone who's already faimiliar with the system

After this I worked on the Reporting UI for advertisers. This was built using Next.js, MySQL and Redis.
The Reporting UI is the window which the advertisers judge the entire Coupang ads offering, so it is important that the app works well.

I am now working on Settlements app. The Settlements app determines how much advertisers need to be 
charged monthly. The app is originally created by another engineer, but I took it over as a tech lead
later. The app is written in Java. 

I am currently rewriting the app using Spark instead of Sprign Batch. The goal behind the redesign is to simplify the
application by modularizing the calculation steps more and making the coupling between different modules looser. 
This allows for easier to understand application that'll be easier to modify over time.

At Coupang, I learned to prioritize work based on business importance.