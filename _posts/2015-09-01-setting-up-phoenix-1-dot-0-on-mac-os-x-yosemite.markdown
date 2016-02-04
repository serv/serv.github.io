---
layout: post
title: "Setting up Phoenix 1.0 on Mac OS X Yosemite (With Troubleshooting Steps)"
date: 2015-09-01 22:15:10 -0700
comments: true
categories: ['elixir', 'phoenix']
---

[Phoenix](http://www.phoenixframework.org/) is a promising
[Elixir](http://elixir-lang.org/) web framework that is fast and productive.
I heard about Phoenix through a coworker a couple of weeks
ago and started playing with it.
Then stopped for a while, until I heard that the framework finally
hit [1.0 on Hacker News](https://news.ycombinator.com/item?id=10135825).
There were many praises for the framework and success stories
that I thought I had to try it again.

This is a summary of what I did to set up Phoenix 1.0 on
Mac OS X Yosemite (Version 10.10.5). I also included how
I solved some odd errors that appeared during installation process.

1. `$ brew install elixir`
2. `$ mix local.hex`
3. `$ mix archive.install https://github.com/phoenixframework/phoenix/releases/download/v1.0.0/phoenix_new-1.0.0.ez`

    In this step, you might see this error.

    ```
    ** (Mix) Could not access url https://github.com/phoenixframework/phoenix/releases/download/v1.0.0/phoenix_new-1.0.0.ez, error: {:failed_connect, [{:to_address, {'github.com', 443}}, {:inet, [:inet], :nxdomain}]}
    ```

    To solve this issue, you need to ensure that `~/.mix/archives directory` has write permission.

    Run `$ sudo chmod a+rw ~/.mix/archives/` then try running #3 again.

4. Go into the directory where you want your Phoenix app to live.
5. `$ mix phoenix.new hello_phoenix`
6. Say yes to `Fetch and install dependencies? [Yn] y`

    You might see an error during this process. And most likely, it's happening because your Phoenix project directory doesn't have write permission.

    Run `$ sudo chmod -R a+rw hello_phoenix`.
    Then try running #5 again.
7. Run `$ npm install` with node > 0.12.0
8. Ensure that you have postgresql running.
9. Run `$ mix ecto.create`

    You might get this error.
    ```
    ** (Mix) The database for HelloPhoenix.Repo couldn't be created, reason given: "psql: FATAL:  role \"postgres\" is not permitted to log in\n".
    ```

    Run `$ psql postgres`

    In the psql, run `CREATE ROLE postgres;`

    Try running `$ mix ecto.create` again.

    You might get this error.
    ```
    ** (Mix) The database for HelloPhoenix.Repo couldn't be created, reason given: "psql: FATAL:  role \"postgres\" is not permitted to log in\n".
    ```

    In the psql, run `ALTER ROLE postgres LOGIN;`

    Try running `$ mix ecto.create` again.

    You might get this error.
    ```
    ** (Mix) The database for HelloPhoenix.Repo couldn't be created, reason given: "ERROR:  permission denied to create database\n".
    ```

    In the psql, run `ALTER ROLE postgres CREATEDB;`

    Now try `$ mix ecto.create` again

    You should see `The database for HelloPhoenix.Repo has been created.`

10. Run `$ mix phoenix.server`
11. Go to http://localhost:4000/

![](http://i.imgur.com/o7mD8Fv.png)
