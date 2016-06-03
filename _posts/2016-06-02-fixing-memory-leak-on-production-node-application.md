---
layout: post
title: "Fixing Memory Leak on Production Node.js Application"
date: 2016-06-02 22:30:56 -0700
comments: true
categories: "node"
---

The last few days at work were rough.
My team was intensely focused on
preparing the production environment to be stable.
We've been having some
serious issues on the production environment.
One of the most serious production issues was a
nasty memory leak.

![](http://i.imgur.com/lEnDrWZ.png)

The graph above displays the memory usage of
12 node applications on our production
environment. The y-axis shows the memory usage
in percentage and the x-axis shows the time
span of 7 days. This narrow sawtooth
pattern on memory usage is extremely bad.
As you can see, all 12 servers
are accumulating usage in memory rapidly.
As a remedy for the memory leak, we had to
periodically restart our servers. This was less
than ideal, but because we had so many other
really high priority items last few weeks, we
just had to bite our tongue and suck it up.
However, the frequency at which we had to
restart our server started to increase.
We had to restart our servers every few days,
then every day, then it came to a point where we
were restarting our servers every 4 to 5 hours.
Thank god we have a globally distributed team
(Croatia, and Argentina), it could've been a
lot tougher without having team members in other
timezones. I can't
emphasize this point enough, and I will take
another opportunity to praise having globally
distributed software development team in another
post in the future.

After some [pitfalls](http://blog.jasonkim.ca/blog/2016/06/02/battle-technical-assumptions/), we fixed the
memory leak. As you can see below, the overall
memory usage stays flat after 13:30 PM after our
memory leak fix was applied.

![](http://i.imgur.com/JnCgcoi.png)

We came up with several different strategies to
fix the memory issue, but the working solution
came down to comparing two memory dumps at
different times and comparing their content.
I used [gcore](http://man7.org/linux/man-pages/man1/gcore.1.html) on a production server to gather a
memory dump soon after the server restart when
the memory usage is around 30%. After around
3 hours when the memory usage for the server
starts to hover around 60%, I took another memory
dump. I used [mdb](https://docs.oracle.com/cd/E18752_01/html/816-5041/chapter-8.html) on a local VM running
Solaris 11 to analyze the two memory dumps.

Here is the memory dump of the production server
at around 30% memory usage.

{% highlight text %}
73ce2207ea9     4643        2 Arguments: 0, length
101b5ab4f71     5519        4 Object: albumId, albumNames, ...
 9719767799     6070        2 Object: localeCode, value
 971977c371     6966        1 Object: entry
1102bfc1dc31     8775        2 Object: id, genreIds
 971977b021     9086        2 Object: ids, href
 971973e051     9430        3 Array
    3015e01    16203        0 Object
 971974c9c9    19854        1 Object: nr_exclusive_duration_millis
 9719710199    19917       13 TraceSegment: name, transaction, ...
 971971cb11    20186        7 Timer: state, touched, duration, ...
    342d8d9    49769        0 Array
 971971cbb9    59489        1 Array
 971970f1c9    71743        2 Array
     OBJECT #OBJECTS   #PROPS CONSTRUCTOR: PROPS
{% endhighlight %}

And here is the memory dump of the production
server at around 80% around 4 hours after
the server restart.

{% highlight text %}
1102bfc1dc31   8775        2 Object: id, genreIds

...

110879a2c9    14099        6 ExponentialBackoffStrategy: ...
1108779561    15593        3 Array
45357fdf31    17059        2 Object: ids, href
   3015db1    34680        0 Object
110875b221    35287        4 Object: albumId, albumNames, ...
110875b2c9    38401        1 Object: entry
110875aff1    38481        2 Object: localeCode, value
1108708d51   198161        0 Array
1108706ae1   202984        1 Array
1108706a81   206039        1 Object: nr_exclusive_duration_millis
11087046d9   209896       13 TraceSegment: name, transaction, ...
1108704801   223481        7 Timer: state, touched, duration, ...
1108706aa1   507224        2 Array
    OBJECT #OBJECTS   #PROPS CONSTRUCTOR: PROPS
{% endhighlight %}

The most notable cause of the memory increase is
`TraceSegment: name, transaction, ...`.
You can see that the number of `TraceSegment`
object count increased by 10 folds going
from 19917 to 209896. You can also see some
other object such as `Timer` and `Array`
increasing. This is because those are properties
of the `TraceSegment` object.
Contrast this number with the genre-tags object
that stayed exactly the same
`2 Object: id, genreIds` at 8775. That object
is a json file parsed into memory at startup
of the app and it does not increase. This
suggests to me that the memory dump is indeed
accurate, and Node retains memory steady on
correctly coded objects.

It turns out `TraceSegment` objects are created
by [NewRelic](https://github.com/newrelic/node-newrelic/blob/1e7bbbaf34a15f0bb35aca63b0d8a3cfa2669d27/lib/transaction/trace/segment.js). The fact that
I wasn't able to recreate the severity of
memory leak convincingly on the development
environment from previous attempts also tells
me that the memory leak was caused by something
happening on the production environment.

We get some benefits of having NewRelic monitoring, but disabling NewRelic on
production was no-brainer at this point.
We had to do it. We all acknowledged that
NewRelic is not the initial cause of the memory leak.
There is still something in our code that is
behaving naughtily with NewRelic, but we
got to put our the damn fire on production
first. So we did it. We disabled NewRelic
on production and the memory usage stopped
climbing and it remains very steady for now.

I want to thank [Yunong Xiao for sharing
Netflix's experience on debugging Node.js in
production](https://yunong.io/2015/11/13/debugging-node-js-in-production/). It informed me about
useful tools in the wild and taught me how
I can use those tools to find the cause
of the memory leak. I also want to thank
[Bryce Neal for writing a detailed tutorial on setting up Solaris to use MDB](http://bryce.is/writing/code/mdb_v8/vm/virtualbox/omnios/2016/02/06/mdbv8-getting-started.html).
