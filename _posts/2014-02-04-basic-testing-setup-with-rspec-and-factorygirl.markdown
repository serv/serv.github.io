---
layout: post
title: "Basic Testing Setup with RSpec and FactoryGirl"
date: 2014-02-04 19:52:08 -0800
comments: true
categories: ['ruby', 'testing']
---

## tl;dr

- Hate TDD blah blah
- A directory structure of a Ruby program
- Setting up RSpec
- Setting up FactoryGirl

> Setting up RSpec and FactoryGirl wanted me to choke
> a few people.
>
> -- *John Smith*, renown Rubyist,
> husband, author of no books, father of none

#### An Adaquate Response by @tenderlove

<blockquote class="twitter-tweet" lang="en"><p>Here is a Friday Hug. Deal with it. (HAPPY FRIDAY!!! &lt;3&lt;3&lt;3) <a href="http://t.co/6i5rNWqybv">pic.twitter.com/6i5rNWqybv</a></p>&mdash; Aaron Patterson (@tenderlove) <a href="https://twitter.com/tenderlove/statuses/426779493747810305">January 24, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

O boy, do I hate test driven development. Nothing feels
worse than writing clean automated tests only to realize that
they've just rendered useless by a small change in an
application feature.
And yet, we writes tests anyway because they pay off in
the long run.

With that in mind, I wanted to write a guide on preparing RSpec
and FactoryGirl for writing Ruby programs. RSpec and FactoryGirl
are great Gems that help you immensely in writing automated
tests, but I've had times when I would curse gods in just
prepping RSpec and FactoryGirl.

## A Directory Structure of a Ruby Program

There is no *one right way* to structure a Ruby program.
However, from my experience, I notice myself increasingly
structuring Ruby programs as if I am writing a Ruby Gem.
Others looking at the code understand the program better,
if they are familiar with how Ruby Gems are typically written.
Modularized code helped me debug easier as well.

Let's say we are writing a Ruby program for a linked list with
a List class and a Node class. Then we will have a directory
structure like below.

	├── Gemfile
	├── Gemfile.lock
	├── lib
	│   └── models
	│       ├── list.rb
	│       └── node.rb
	└── spec
	    ├── factories
	    │   ├── lists.rb
	    │   └── nodes.rb
	    ├── models
	    │   ├── list_spec.rb
	    │   └── node_spec.rb
	    └── spec_helper.rb

- `Gemfile`: contains a list of Gems used in the program
- `lib`: a directory that contains code that runs the program
- `spec`: a directory that contains RSpec and FactoryGirl
related code
- `spec/factories`: a directory that contains factories for
FactoryGirl

## Setting Up RSpec and FactoryGirl

#### Tutorial Environment

- Mac OS X Mavericks Version 10.9.1
- ruby 2.1.0p0 (2013-12-25 revision 44422) [x86_64-darwin12.0]
- rspec 2.14.7

### 1. Gemfile

Prepare Gemfile with RSpec and FactoryGirl.

{% highlight ruby %}
# Gemfile
source 'https://rubygems.org'

gem "rspec"
gem "factory_girl"
{% endhighlight %}

Run `$ bundle install`.

### 2. Prepare RSpec

RSpec is a Ruby Gem that helps you write automated tests.

{% highlight ruby %}
# spec/spec_helper.rb
require 'rubygems'

RSpec.configure do |config|
end
{% endhighlight %}

### 3. Prepare FactoryGirl

FactoryGirl is a Ruby Gem that mocks certain classes for
automated tests. We will use FactoryGirl to mock nodes and
lists.

Add this to the RSpec config.

{% highlight ruby %}
# spec/spec_helper.rb
require 'rubygems'
require 'factory_girl'

RSpec.configure do |config|
  config.include FactoryGirl::Syntax::Methods
end
{% endhighlight %}

### 4. Building Factories

These are just empty factories.

{% highlight ruby %}
# spec/factories/lists.rb
FactoryGirl.define do
  factory :list do
  end
end
{% endhighlight %}

{% highlight ruby %}
# spec/factories/nodes.rb
FactoryGirl.define do
  factory :node do
  end
end
{% endhighlight %}

### 5. Describing Models in RSpec

And these are just empty model specs.

{% highlight ruby %}
# spec/models/node_spec.rb
require 'spec_helper'

describe Node do

end
{% endhighlight %}

{% highlight ruby %}
# spec/models/list_spec.rb
require 'spec_helper'

describe List do

end
{% endhighlight %}

Try running RSpec tests now. Run `$ rspec spec`.

You should get an error message that reads something like:

	/...../spec/models/list_spec.rb:3:in `<top (required)>': uninitialized constant List (NameError)

### 6. Add Models

The error above is caused by the fact that we don't actually
have any models yet.

{% highlight ruby %}
# lib/models/node.rb
class Node
end
{% endhighlight %}

{% highlight ruby %}
# lib/models/list.rb
class List
end
{% endhighlight %}

Try running RSpec tests again. Run `$ rspec spec`.

You should get the same error message that reads:

	/...../spec/models/list_spec.rb:3:in `<top (required)>': uninitialized constant List (NameError)

### 7. Adding Dependancies in RSpec Config

We are getting this error because RSpec is unable to location the models we just created.

{% highlight ruby %}
# spec/spec_helper
require 'rubygems'
require 'factory_girl'

require_relative '../lib/models/list'
require_relative '../lib/models/node'

RSpec.configure do |config|
  config.include FactoryGirl::Syntax::Methods
end
{% endhighlight %}

Now try running `$ rspec spec`.

Voila! Tests are running! Well, we don't really have any tests,
but we have RSpec finally running.

	No examples found.


	Finished in 0.00006 seconds
	0 examples, 0 failures

### 8. Running Tests

We will write very basic test that confirms that we can create
a Node object and a List object.

{% highlight ruby %}
# spec/models/node_spec.rb
require 'spec_helper'

describe Node do  
  describe 'instantiation' do
    let!(:node) { build(:node) }

    it 'instantiates a list' do
      expect(node.class.name).to eq("Node")
    end
  end
end
{% endhighlight %}

{% highlight ruby %}
# spec/models/list_spec.rb
require 'spec_helper'

describe List do  
  describe 'instantiation' do
    let!(:list) { build(:list) }

    it 'instantiates a list' do
      expect(list.class.name).to eq("List")
    end
  end
end
{% endhighlight %}

Try running the tests `$ rspec spec`.

You should get an error saying that node and list factories
have not been registered.

	FF

	Failures:

	  1) List instantiation instantiates a list
	     Failure/Error: let!(:list) { build(:list) }
	     ArgumentError:
	       Factory not registered: list
	     # ./spec/models/list_spec.rb:5:in `block (3 levels) in <top (required)>'

	  2) Node instantiation instantiates a list
	     Failure/Error: let!(:node) { build(:node) }
	     ArgumentError:
	       Factory not registered: node
	     # ./spec/models/node_spec.rb:5:in `block (3 levels) in <top (required)>'

	Finished in 0.00074 seconds
	2 examples, 2 failures

	Failed examples:

	rspec ./spec/models/list_spec.rb:7 # List instantiation instantiates a list
	rspec ./spec/models/node_spec.rb:7 # Node instantiation instantiates a list

The problem is caused by RSpec not being able to find
FactoryGirl files.

Add FactoryGirl files as dependancies running RSpec.

{% highlight ruby %}
# spec/spec_helper.rb
require 'rubygems'
require 'factory_girl'

require_relative '../lib/models/list'
require_relative '../lib/models/node'
require_relative '../spec/factories/lists.rb'
require_relative '../spec/factories/nodes.rb'

RSpec.configure do |config|
  config.include FactoryGirl::Syntax::Methods
end
{% endhighlight %}

Now you should be able to run tests successfully.

	..

	Finished in 0.00151 seconds
	2 examples, 0 failures
