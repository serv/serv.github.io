---
layout: post
title: "[Coursera Algorithms I: Week 1] Quick Find and Quick Union in Java"
date: 2014-02-06 18:21:42 -0800
comments: true
categories: ['java', 'algorithms']
---

## tl;dr

- What is Quick Find
- Programming Quick Find in Java
- What is Quick Union
- Programming Quick Union in Java

![algo1](http://i.imgur.com/nlWL17x.png)

Let me give a big shout out to [Coursera's Algorithm I course](https://class.coursera.org/algs4partI-004/) currently running right now. I went through week 1 lecture material that covered, topics in union find and analyzing algorithm. In this blog post, I will focus on the first part, union find.

## Union Find

Say there are N nodes in a given set. What kind of data
structure would it take to represent that these nodes are
connected to one another? What kind of algorithm would we need
to use to connect one node to another? What do we do to check
if two nodes are connect? These questions will be answered
through learning about quick find and quick union
implementations of union find.

## Quick Find

Quick find is an algorithm that places emphasis on finding out
if two nodes are connected or not. We can use a typical array to
represent a set of nodes and their connections to each other.

{% highlight java %}
{1,2,3,4,5};
{% endhighlight %}

Indexes of the array are the nodes and the values of the array
are the connections. When the value of one index equals that of
another node's value, then the two nodes are connected.

Quick Find approach has a very fast method to check connectivity.
To check the connectivity, you just need to access the array
twice. However, union is extremely slow. Since whenever you do
union, you have to go through all the array, you will end up
with O(N) runtime.

The quick find has 3 methods. They are:

- constructor: prepares the set as an array
- connected: checks if two nodes are connected or not
- union: connects two nodes

{% highlight java %}
// QuickFind.java
public class QuickFind {
  private int[] id;
  private int count;

  // constructor
  // Given N, create an array with N elements
  public QuickFind(int N) {
    count = N;
    id = new int[N];
    for (int i = 0; i < N; i++) {
      id[i] = i;
    }
  }

  // if values of two index are the same,
  // return true, else false
  public boolean connected(int p, int q) {
    return id[p] == id[q];
  }

  // connect two nodes
  public void union(int p, int q) {
    for (int i = 0; i < count; i++) {
      if (id[i] == id[p]) {
        id[i] = id[q];
      }
    }
    System.out.println(p + " " + q);
  }

  public void print() {
    StringBuilder temp = new StringBuilder();
    temp.append("");

    for(int i = 0; i < count; i++) {
      temp.append(id[i]);
      temp.append(" ");
    }
    String strI = temp.toString();
    System.out.println(strI);
  }

  public static void main(String[] args) {
    QuickFind qf = new QuickFind(10);
    qf.union(5,6);
    qf.print();
    qf.union(0,9);
    qf.print();
    qf.union(9,3);
    qf.print();
    qf.union(2,1);
    qf.print();
    qf.union(7,0);
    qf.print();
    qf.union(4,8);
    qf.print();
  }
}
{% endhighlight %}

###To run this java program

1. Compile the program. `javac QuickFind.java`
2. Run the compiled program. `java QuickFind`

## Quick Union

Quick union improves greatly in union operation. Instead of
going through entire array during union, you attach one node's
root to another's root.

{% highlight java %}
// QuickUnion.java
public class QuickUnion {
  private int[] id;
  private int[] sz;
  private int count;

  public QuickUnion(int N) {
    count = N;
    id = new int[N];
    sz = new int[N];
    for (int i = 0; i < N; i++) {
      id[i] = i;
      sz[i] = 0;
    }
  }

  private int root(int i) {
    while (i != id[i]) {
      i = id[i];
    }
    return i;
  }

  public boolean connected(int p, int q) {
    return root(p) == root(q);
  }

  public void union(int p, int q) {
    int i = root(p);
    int j = root(q);
    if (i == j) return;
    if (sz[i] < sz[j]) { id[i] = j; sz[j] += sz[i]; }
    else { id[j] = i; sz[i] += sz[j]; }
  }

  public void print() {
    StringBuilder temp = new StringBuilder();
    temp.append("");

    for(int i = 0; i < count; i++) {
      temp.append(id[i]);
      temp.append(" ");
    }
    String strI = temp.toString();
    System.out.println(strI);
  }

  public static void main(String[] args) {
    int N = StdIn.readInt();
    QuickUnion qu = new QuickUnion(N);
    while (!StdIn.isEmpty()) {
      int p = StdIn.readInt();
      int q = StdIn.readInt();
      if (!qu.connected(p, q)) {
        qu.union(p, q);
        StdOut.println(p + " " + q);
      }
    }
    qu.print();
  }
}
{% endhighlight %}

---
### Edited on Feb 11, 2014

- Code for `QuickUnion.java` and `QuickFind.java` were updated to fix some
bugs
