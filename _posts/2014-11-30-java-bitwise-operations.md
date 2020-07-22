---
layout: post
title: "Java Bitwise Operations"
date: 2014-11-30 11:43:47 -0800
comments: true
categories: 'java'
---

## Bitwise operators

- `&`: Bitwise AND
- `|`: Bitwise OR
- `^`: Bitwise XOR
- `\>\>`: Shift right
- `>>>`: Unsigned shift right
- `<<`: Shift left
- `~`: One's complement (unary NOT)

You can use these bitwise operators for the following data types.

- `int`
- `long`
- `short`
- `char`
- `byte`

Bitwise operators cannot work on ...

- `boolean`
- `float`
- `double`

## Bitwise operations

![from Java: A Beginner's Guide](http://i.imgur.com/Pic8E71.png)

From [Java: A Beginner's Guide](http://www.amazon.com/Java-Beginners-Guide-Herbert-Schildt/dp/0071809252/ref=sr_1_1?s=books&ie=UTF8&qid=1417377646&sr=1-1&keywords=Java%2C+A+Beginner%27s+Guide)

## Example 1: Getting upper case for a letter

{% highlight java %}
public class UpCase {
  public static void main(String args[]) {
    char ch;

    for(int i=0; i < 10; i++) {
      ch = (char) ('a' + i);
      System.out.print(ch);

      ch = (char) ((int) ch & 65503);

      System.out.print(ch + " ");
    }
  }
}
{% endhighlight %}

The value 65,503 used in the AND statement is the decimal representation of 1111 1111 1101 1111. Thus, the AND operation leaves all bits in ch unchanged except for the 6th one, which is set to 0.

## Iterating through bits

{% highlight java %}
for(int t = 128; t > 0; t = t/2) {
  // ...
}
{% endhighlight %}

## Example 2: Getting lower case for a letter

{% highlight java %}
public class LowCase {
  public static void main(String args[]) {
    char ch;

    for(int i = 0; i < 10; i++) {
      ch = (char) ('A' + i);
      System.out.print(ch);

      ch = (char) ((int) ch | 32);

      System.out.print(ch + " ");
    }
  }
}
{% endhighlight %}

## Shift operators

- `<<`: left shift
- `>>`: right shift
- `>>>`: unsigned right shift
