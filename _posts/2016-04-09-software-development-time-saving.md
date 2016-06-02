---
layout: post
title: "Time Saving Tips for Software Development for Developers"
date: 2016-04-09 16:47:42 -0800
comments: true
categories: ['software development']
---

I waste a lot of time not coding. Typical work involves many activities,
that are process related chores, meetings and etc, so only a fraction of time
can be spent on coding and working on a feature. I find it important that
you should try to squeeze most out of this time as possible.

I try to understand the product feature and its use cases before I begin
coding on a feature.
In an ideal world, your product owner will write a perfect story that
doesn't require any edits whatsoever. This never happens. Product owners are
humans and they will usually write an insufficient story
when the stories are sufficiently large and complicated.
Developers must be able to wear the product owner's hat to come up with the
rest of the acceptance requirements for a story.
Try to come up with what makes sense and what doesn't make sense about the
story. While you are trying to come up with what makes sense,
bring it up with your product owner to see if some additional acceptance
criteria needs to be added. When things don't make sense in the story, also
bring it up with product owner sooner rather than later.

Here's another thing I do before I begin coding.
I spend a good length of time thinking about the software design of the feature.
Explore how each acceptances in the story can be mapped to your software design.
Your code builds on top of other code you wrote.
Code you write has inertia. Early on during the coding phase, you can make
small and large changes without much trouble. You are nimble when your code
for the feature isn't large yet. But when you have to change the software design
later on down the road, changing your existing code that has grown larger
is way more difficult. There are many more moving parts and each changes
you have to make in your code will need to make multiplicative changes across
your code base. Also engage your teammates in brainstorming session and
pick their brains on how they think the code should look.

After you are completed with coding, have a rigorous code review with your
coworker. I was wrong about this before. I have been doing more lenient
code review that left quite a room for disagreement. Be respectful in your
tone and watch out for strong language. Messages do not get understood
best over the web, especially when that message is about criticizing your code.
This code review should be contrasted with nitpicking. It's not about trying
to inject your preference for the code. It should be about writing good code.
