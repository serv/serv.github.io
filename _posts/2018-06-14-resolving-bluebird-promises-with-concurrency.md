---
yout: post
title: "Resolving Bluebird Promises With Concurrency"
date: 2018-06-14 20:17:11 -0800
comments: true
categories: ['node', 'javascript', 'bluebird']
---

I am using [Bluebird](http://bluebirdjs.com/docs/getting-started.html) as 
the main [promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) library for
my Node projects these days.
I frequently use `Promise.all(array)` or `Promise.props(object)` to
resolve multiple promises in an array or an object at once.
This is fine if there is not limit to the number of promises 
your system can handle. Often, this is not the case.
For example, it's not a good idea to resolve 1K requests at once.
This is when you want to use **concurrency** provided by Bluebird.

## Dealing with an Array of Promises

Let's say we used to resolve an array of promises naively this way.

{% highlight javascript %}
function main() {
    let requestUrls = [ '...' ]; // has 1K urls

    let promises = requestUrls.map(reqUrl => {
        return new Promise((resolve, reject) => {
            // ...
        });
    });

    return Promise.all(promises);
}
{% endhighlight %}

Better way to handle this is with concurrency. In this example,
we will resolve 4 at a time. If you want to resolve the promises one at 
a time, you will want to use the concurrency of 1. 

{% highlight javascript %}
function main() {
    let requestUrls = [ '...' ]; // has 1K urls

    return Promise.map(requestUrls, (reqUrl) => {
        return new Promise((resolve, reject) => {
            // ...
        })
    }, { concurrency: 4 });
}
{% endhighlight %}

## Dealing with an Object of Promises

If the number of promises in the object is small, you can use `props` 
to resolve them.

{% highlight javascript %}
function main() {
    let idRequestUrlPairs = { ... }; // has 1K urls

    let promises = {};
    
    idRequestUrlPairs.forEach((value, key) => {
        promises[key] = new Promise((resolve, reject) => {
            // ...
        });
    });

    return Promise.props(idRequestUrlPairs);
}
{% endhighlight %}

Bluebird doesn't have a direct way to resolve an object of promises 
concurrently, but here is a way to do it with `map`. Resolving an object
of promises using concurrency looks something like this.

{% highlight javascript %}
async function main() {
    let idRequestPromisePairs = { ... }; // has 1K urls
    let toBeResolved = {};
    
    await Promise.map(Object.keys(idRequestPromisePairs), key => {
        return new Promise((resolve, reject) => {
            // ...
            return resolve(idRequestPromisePairs[key]);
        })
            .then(result => {
                toBeResolved[key] = result;
            });
    }, { concurrency: 4 });

    // toBeResolved should have resolved promises;
    return toBeResolved;
}
{% endhighlight %}