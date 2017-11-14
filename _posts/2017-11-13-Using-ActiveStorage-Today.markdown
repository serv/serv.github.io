---
yout: post
title: "Using ActiveStorage Today (prior to Rails 5.2 release)"
date: 2017-11-13 11:17:11 -0800
comments: true
categories: ['ruby on rails']
---

[DHH announced earlier in the year that Rails 5.2 will have a brand new component called ActiveStorage](http://weblog.rubyonrails.org/2017/7/15/this-week-in-rails-active-storage-telling-secrets-and-time-travelling/).
ActiveStorage will manage user uploads such as photos directly.

Since then, a lot of progress has been made to integrate ActiveStorage to
Rails, and you can actually use ActiveStorage today. This blog will explore
the how you can update your Rails app to use ActiveStorage.

**Warning!** You will be using the bleeding edge version of Rails and
there may be unforseen problems caused by it.

1. If you are using Rails version before 5.1.14, update Rails to 5.1.14 by
updating your Gemfile

```ruby
gem 'rails', '~> 5.1', '>= 5.1.4'
```

2. Run `$ bundle update rails`

3. Run `$ rails app:update` and resolve any code differences.

4. Test that updating to `5.1.14` went ok.

5. Now we want to update rails to the latest bleeding edge version.

```ruby

```
