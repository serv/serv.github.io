---
layout: post
title: "Using Recursive Depth-first Traversal to Make API Calls to the Object’s Children"
date: 2016-05-28 23:47:42 -0800
comments: true
categories:
  - algorithms
  - ruby
---

I solved an interesting problem at work
recently, so I wanted to discuss that here.

At Rhapsody, we handle millions of tracks and
tracks are categorized under hundreds of genres.
Genres are related to other genres by being
a parent or a child to another genre. A genre
may have up to 1 parent genre and have as many
children genres. Some top level genres such as
rock, pop, and hip hop do not have any parents.
It looks like a tree. The figure below is an
simplified example of how a genre tree looks
like.

![](http://i.imgur.com/ynbGcss.png)

Some genres have tags associated with them.
Tags are objects that describes what kind of
quality a piece of content has. Drake’s latest
album, Views, feels summery, catchy, soulful
and reflective. Then Views will have tags like
summer, pop, soulful and reflective.

Now there was a problem where we had a way to
retrieve genres from tags, but we could not
retrieve tags from genres. As a temporary solution
to the problem, we decided that we would build and
store the mapping of going from genres to tags as
a static JSON file.

Genre tags are similar to genres themselves, and
genre tags also have a tree data structure. Each
tag has a parent tag and can have many children
tags.

In order to go through the entire genre tags tree,
I decided that I would implement recursive depth
first traversal method in ruby to make API calls to
retrieve data on all genre tags and its children.

There are different parts to the code to accomplish
this, but let’s just look at the meatest part of
the code.

{% highlight ruby %}
def self.get_children(tag, array)
  if tag['childrenTagList'].nil? || tag['childrenTagList'].empty?
    array << { 'id' => tag['id'], 'genreIds' => tag['genreIds'] || [] }
    return array
  end

  array << { 'id' => tag['id'], 'genreIds' => tag['genreIds'] || [] }
  tag['childrenTagList'].each do |t|
    array << get_children(get_tag(CATALOG, t['id']), [])
  end

  array
end
{% endhighlight %}

The code accepts `tag` which is a string and
`array` which contains pairs of tag_id and
genre_id. I better check for the terminating
condition. The terminating condition is to check
to see if the tag has any children tags. If it
doesn’t have any children tags, I proceed to
populate the array with the tag-genre pair and
return the array. Otherwise, I should still
populate the array with the tag-genre pair. But in
addition to that, I have to recursively call
`get_children` for all children tags.
`get_children` is responsible for requesting
metadata of children tags given a tag ID, using
[Faraday](https://github.com/lostisland/faraday).
The response body in JSON format is parsed by
[Oj](https://github.com/ohler55/oj).
