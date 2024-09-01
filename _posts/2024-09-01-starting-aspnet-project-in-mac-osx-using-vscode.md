---
layout: post
title: Starting ASP.NET project in Mac OSX using VSCode
date: 2024-09-01T13:33:55-07:00
comments: true
categories: []
---

As of Sept 1, 2024, [Microsoft Visual Studio for Mac](https://visualstudio.microsoft.com/vs/mac/) is retired.

![](/images/2024/9/1/vs.png)

This doesn't mean that you can't use Visual Studio on Mac. 
However, Microsoft will not actively develop other than patching 
for security and reliability. [Read more on this.](https://learn.microsoft.com/en-us/visualstudio/releases/2022/what-happened-to-vs-for-mac?view=vsmac-2022)

Thankfully, you can still use VSCode on Mac OSX to develop 
ASP.NET projects.

1. Install prerequisites
    - VSCode
    - [C# Dev Kit extension](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit)
    - [Setup .NET development environment](https://blog.jasonkim.ca/post/setup-a-net-project-on-mac-osx)
2. After C# Dev Kit is installed in VSCode, open it in VSCode.
    - You can do this by opening "Extensions" in the left side.
    - Search for C# Dev Kit and open it.
    - Check that the extension is installed.
3. After the extension is installed, press Command + Shift + P.
4. Search for "Welcome: Open Walkthrough".
    - ![](/images/2024/9/1/walkthrough.png)
5. Select "Get Started With C# Dev Kit"
    - ![](/images/2024/9/1/getstarted.png)
6. Under "Create your dotnet project", click "Choose Project Template".
    - ![](/images/2024/9/1/createdotnet.png)
7. Click "New Project"
    - ![](/images/2024/9/1/newproject.png)
8. Now follow the guided prompts, to create the ASP.NET project you want to create.
