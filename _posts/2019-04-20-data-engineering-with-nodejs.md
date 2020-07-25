---
yout: post
title: "\"Big Data\" Engineering with Node.js"
date: 2019-04-26 20:17:11 -0800
comments: true
categories: ['node', 'javascript']
---

When you think about data engineering, people usually think about 
using Java or Python as the primary languages to work with.
The two languages both have a large community backing and many tools 
for handling big data.
While they are fine languages to work with, I want to throw Node.js
into the mix as a serious contender to get the job done.
Node.js is performant enough to do some heavy lifting and has great NPM packages
that help you develop fast. I wanted to share my experience of building data-intensive systems using Node.js.

I've been working at [Coupang](https://www.coupang.com/) for just over a year now. I had the privilege of building the first 
[ETL](https://en.wikipedia.org/wiki/Extract,_transform,_load) 
system for Coupang's advertising platform.
The ETL system began with a modest goal to clean and ingest advertising 
metadata and time series data on a daily basis.
Since the original ETL jobs began every day in the morning, I named
the ETL system, `Morning Star`, referring to planet Venus that appears in 
the east before sunrise.
This is a bit of a misnomer now, given that the system is now running
ETL jobs on a real-time basis. I still kept the name.
Since its inception, Morning Star evolved into a much larger system
that is handling 500 GB of data, 400 million events per day, and the data volume is still growing.

Morning Star needed to provide data to several kinds of users. Services
needed to retrieve appropriate data reliably in a timely fashion.
Analysts asked for a place where they can gather insights about our business. Also, Morning Star needed to provide reliable, normalized data for creating denormalized tables for specific use cases. 

Let's examine the basic data flow of Morning Star. Morning Star's 
infrastructure lives on AWS.
The data flow starts with several Lambda functions that trigger
different jobs for Morning Star by making an HTTP request to the 
load balancer.
The load balancer balances the load in a round robin fashion to 
EC2 instances. Based on the CPU usages, the EC2 instances dynamically
scale up or down to efficiently handle the load.
The EC2 instance that is given the request to handle a job, downloads
the raw files from S3 Data Lake. The raw files in S3 originate
from several other
services. Morning Star cleans, enriches and anonymizes the raw data depending on which job it has to perform. 
The massaged data is then uploaded back to the data lake, where
it is subsequently copied to Redshift.
Redshift is where various other services and users can consume the
data to their liking.

![](https://i.imgur.com/BsZ1i9t.png)

Node.js has been an excellent tool for building the desired system.
Node.js finally has the `async-await` pattern to take advantage of
parallelism without callbacks.
Having worked with callbacks and chained promises, I think
the async-await pattern solved major problems found in the previous
asynchronous programming patterns.
You can program your code spanning vertically rather than horizontally
like the nested callbacks make you do. Your code is easier to read
when it spans vertically.
You can handle errors more precisely than the chained promises pattern where
a single catch block is typically responsible for errors
thrown anywhere during the execution of multiple chained
promises.
You can have a more nimble control flow of your code with `async-await`
because you can use `if-else` statements easier.
The ergonomics of coding was much improved with using async-await.

Speaking of great ergonomics, I should also point out the `stream`
module in Node.js to be a fantastic tool to process large files.
When you work on web services, you typically read and write
discrete chunks of data transactionally. 
On the other hand, it is very common to use stream to move
data from one place another in data engineering.
You often deal with cases where you no longer can load
the entire data onto the memory.
Or you might deal with a source that is continuously generating data that 
needs to be moved to another place in real time. 
That's when you have to stream the data.
Node's stream library helps you stream data reliably and manipulate
the data with ease.
The functions in the stream module are easy to understand and use.
They are well documented with an ample amount of examples, so you can easily
incorporate them into your code.
The stream library plays nicely with the async-await pattern I use
elsewhere as long as I wrap the stream code with a promise.

There are other standard modules in Node.js that makes it 
suitable to do data engineering.
The `child-process` module is used to execute terminal commands,
and it was useful in controlling 
[jq](https://stedolan.github.io/jq/), 
[parallel](https://www.gnu.org/software/parallel/) and 
[Hive Beeline client](https://cwiki.apache.org/confluence/display/Hive/HiveServer2+Clients#HiveServer2Clients-Beeline%E2%80%93CommandLineShell).
The `fs` module had all the functions I needed to work with the file system,
and `zlib` handle gzipping and gunzipping with stream perfectly.
And if I didn't find an adequate module in the standard Node.js modules,
I found almost all of them in the NPM repository.
This assurance gave me the confidence to push development in Node.js,
and help me iterate faster.

Node.js has some downsides when you try to use it to process data.
I applauded Node.js' async-await to be an excellent pattern to use.
However, this means that you have to write a promise wrapper for
callbacks and pipe functions in order to incorporate it with the
async-await pattern. It's not difficult, but it is tedious.

I also had trouble finding an up to date Hive client for Node.js.
Hive is a widely used data warehousing tool for working with big data.
I was surprised to learn that there's no well maintained 
Hive client available to use on NPM.
For this reason, I had to use Hive's Beeline command line client and
write Node wrapper around it.
I had to install JDK, Hadoop, and Hive as dependencies for Beeline
to run.
There were a lot of unpleasant programming I had to do to make this 
work.

Despite some of the problems with Node.js, it is still a great tool
for data engineering. It has many standard and third-party modules
to help to finish work. Node.js is also fast enough to process large datasets
in real-time. 
I knew that Node.js is great at creating nice web apps and services.
I am glad to know that it is also a fine tool for data engineering.
