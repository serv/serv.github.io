---
layout: post
title: "Updating Eclipse Kepler and Fixing its Woes on Mac OS X Yosemite"
date: 2014-11-11 19:26:47 -0800
comments: true
categories: ['Java 8', 'Eclipse']
---

## tl;dr

- Installing Java 8 on Mac OS X Yosemite
- Updating Eclipse Kepler to work with Java 8
- Fixing `Error: Could not find or load main class packageName.ClassName`
- Fixing `No JREs in workspace compatible with specified execution environment: JavaSE-1.8`

## Dirty Java 8 and Eclipse

Making Eclipse Kepler to work with Java 8 on Mac OS X Yosemite wasn't all that obvious. I guess this
is [why people hate Eclipse so much][1]. Here are the steps I followed to make
Eclipse Kepler to work with Java 8.

1. Visit this [page][2].
2. Follow the section, `Installing Java™ 8 support for Eclipse Kepler SR2`.
3. Install [Java SE Development Kit 8][3].
4. Follow the subsection, `Use the Eclipse Marketplace to add Java™ 8 support to your Eclipse Kepler SR-2 package`.
5. If you attempt to create a new project, a new package then a new class with
a `main` function and run it, you might get an error that goes: `Error: Could not find or load main class packageName.ClassName`
6. One of the top hits on Google for this error was this [Stackoverflow page][4].
7. When I right-clicked on the project and tried to edit the build path, I kept on
seeing `No JREs in workspace compatible with specified execution environment: JavaSE-1.8`.
8. To fix this, I found another [Stackoverflow page][5] that suggested a solution.
9. The problem is how the fuck do you know where Java 8 is? Thankfully, there a
command in terminal you can run `/usr/libexec/java_home -V`.
10. Look for `"Java SE 8"	/Library/Java/JavaVirtualMachines/jdk1.8.0_25.jdk/Contents/Home`
11. Go through the [second Stackoverflow page][5] with the newly found location
of Java SE 8.
12. You should be able to run the example program now.

[1]: http://www.ihateeclipse.com/
[2]: http://www.eclipse.org/downloads/java8/
[3]: http://www.oracle.com/technetwork/java/javase/downloads/index.html
[4]: http://stackoverflow.com/questions/22755551/eclipse-error-could-not-find-or-load-main-class-hello
[5]: http://stackoverflow.com/questions/22619262/upgrade-eclipse-to-java-8
