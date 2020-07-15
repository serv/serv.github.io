---
yout: post
title: "Investigating Memory Leak in a Node.js Application"
date: 2020-07-12 20:17:11 -0800
comments: true
categories: ["node"]
---

I was struck with a memory leak problem in Node.js application recently.
It is not fun dealing with memory leak problems. Unlike other typical bugs you
face caused by errors in syntax of your code or failures in upstream services,
a memory leak problem defies conventional approaches to squashing the bug.
You need to use unusual tools you don't normally use and you typically will
need more time to solve the problem.

![memory leak](https://i.imgur.com/Skr597z.png)

Let's evaluate some some approaches and tools that you can use to resolve a
memory leak issue in Node.js Applications.

## Heapdump NPM package

[node-heapdump](https://github.com/bnoordhuis/node-heapdump) is an easy to use
NPM package that generates a V8 heap dump of your Node.js application.
You can examine the heap dump with the Developer Tool in the Chrome browser.

- Pros
  - Simple setup
  - Can integrate with your Node.js application and create [a maintenance endpoint](https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/production/createmaintenanceendpoint.md)
  - Easily inspect the V8 heap dump using Chrome Developer Tool
- Cons
  - Only useable if the app is still responsive

My Node.js app was unresponsive because it was executing a blocking function.
The blocking function was preventing the Node.js app from accepting any requests to create a heapdump.

As you can see, there's no silver bullet to investigating and resolving a memory
leak problem. The essence of solving memory leak problem can be described as
simply as 1) get a heap dump 2) inspect the heap dump 3) identify the cause of the
most memory exhausting object creation.
However, there are many different tools and techniques you to solve the
problem and no single way will present a simple solution. Let's continue evaluating
other tools.

## gcore + MDB on Solaris

4 years ago, I solved [another memory leak problem](http://blog.jasonkim.ca/blog/2016/06/03/fixing-memory-leak-on-production-node-application/)
in Node.js application. At that
time, the tool that allows you to inspect memory heap dump of a process, llnode
(I'll present this tool last), wasn't as mature as it is today. And at that time,
I could not use it with the heap dump. I had to use a tool called [MDB](https://docs.oracle.com/cd/E18752_01/html/816-5041/intro-27.html) with [gcore](https://man7.org/linux/man-pages/man1/gcore.1.html).

- Pros
  - You can run gcore even when the Node.js app is unresponsive
- Cons
  - Difficult setup. You need Solaris to run MDB. To learn more, you can read
    this [previous blog post](http://blog.jasonkim.ca/blog/2016/06/03/fixing-memory-leak-on-production-node-application/) I wrote on this topic.

Because setting up Solaris is too cumbersome, I decided to explore using llnode
to inspect the gcore heap dump.

## gcore + llnode

[llnode](https://github.com/nodejs/llnode) is another tool for inspecting gcore heap dump.
I decided to use llnode because I was able to install the tool inside a docker container,
which hosts my Node.js app.

- Pros
  - Moderately easy to setup.
  - llnode is easy to use.
  - You can run gcore even when the Node.js app is unresponsive.

I could not find notable reasons why I shouldn't use gcore + llnode to investigate
the memory issue.

Here are the steps needed to prepare the tools needed to perform your investigation.
I am running Node.js application inside Ubuntu 18 Docker container.

- Go inside the Docker container running the Node.js app.
  `docker exec -it app_name bash`
- Update Ubuntu
  `apt-get update`
- Install lldb
  `apt install lldb-4.0 liblldb-4.0-dev`

  You might see an warning message that reads

  ```
  mount: permission denied
  update-binfmts: warning: Couldn't mount the binfmt_misc filesystem on /proc/sys/fs/binfmt_misc.
  ```

  [You can safely ignore it for our purpose.](https://stackoverflow.com/questions/54951262/binfmt-misc-problems-in-ubuntu18-04-under-docker)

- Install node-gyp
  `npm i node-gyp`
- Install llnode
  `npm install llnode`
- Install gcore
  `apt-get install gdb`
- Run `top` to identify the process number for your Node.js app.
  `36 root 20 0 5700608 4.482g 29724 R 99.7 29.7 100:45.02 node /usr/src/a`
  In this case, the process number is 36.
- Run gcore on the process.
  `gcore 36`
  You might see this error.

  ```
  ptrace: Operation not permitted.
  You can't do that without a process to debug.
  The program is not being run.
  gcore: failed to create core.36
  ```

- To solve the problem in 8, you need to add this to your docker-compose file.

  ```
  cap_add:
  - SYS_PTRACE
  ```

  This is [a good blog post](https://jvns.ca/blog/2020/04/29/why-strace-doesnt-work-in-docker/) on why you need if you are curious.

- Try step 8 again. gcore should work now.
- Inspect the core dump with llnode
  `./node_modules/.bin/llnode node -c core.36`

The process of investigation goes something like this.

- Run `v8 findjsobjects` inside llnode to determine what object is causing the memory leak. You might be wondering how does one tell which object is causing the memory leak.
  There are mainly two ways to nail down the object causing the memory leak.

  - When you have a rapidly growing memory leak, your heap dump presents an extreme version of [Pareto principle](https://en.wikipedia.org/wiki/Pareto_principle). The object will present itself to be occupying a vast majority of memory will be where you will want to investigate. Here's my result of `v8 findjsobjects` demonstrating this effect.

  ```
  ...
  Instances      Size    Name
          109       3488 ContextifyScript
          138       9936 I
          187      13464 (ArrayBufferView)
          213      11928 NodeError
          220      17600 Layer
          226      12656 Node
          226      14456 Entry
          231      11096 Source
          273       6552 CallSite
         3129     250240 Module
        10930     961840 Tok
        16150    1033480 Loc
        30496     975872 (Array)
       336951    8086824 RowDataPacket
      8901702  286210248 Object
     11881688    3728960 (String)
  ```

- When you have a much more slowly growing memory leak, you can't easily tell what
  JS object is responsible for the memory leak. In this case, you have to take 2 heap
  dumps over a period time and see if you see any growth in some JS objects. The
  object growing in the number of instances will be the cause of your memory leak.

- Generic JS primitives (String, Number, Array etc) and Objects are unactionable. Determine what is the JS
  object that is not JS primitives and Objects which appears to be cause
  of the memory leak? In my case, it is `RowDataPacket`.

- By padding logs and metrics around suspicious code, determine where in your code
  causes the `RowDataPacket` object to be created in such number.

You've now found the cause of the memory leak. Unfortunately, finding the cause of the memory leak is not sufficient to resolving the actual memory leak issue.
You still have to apply a remedy to mitigate the cause of the memory leak.
And for that step, good luck.
