---
layout: post
title: "Singly Linked List"
date: 2014-02-15 22:02:34 -0800
comments: true
categories: ['ruby', 'algorithms']
---

## tl;dr

- Basic components and methods of a linked list
- Testing singly linked list implementation
- Programming a singly linked list using Ruby
- Complete code can be view on [github](https://github.com/serv/learning/tree/master/serv.github.io/algorithms/singly_linked_list)

## Components

A linked list is a data structure that consists of nodes that
make a sequence. A typical linked list consists of these following components.

- Head pointer: a node that indicates the start of the list
- Tail pointer: a node that indicates the end of the node
- Head node: a node that the head pointer points to
- Tail node: a node that the tail node points to
- Pointer: an attribute of node that *links* to another node
- Linked list: a sequence of nodes interconnected by pointers
- Singly linked list: a sequence of nodes connected by pointers
going from a previous node to its next node

![linked list components](http://i.imgur.com/V5dj7GG.jpg)
Figure 1: Components of a singly linked list

There are many ways to implement a linked list. You will easily
find other ways to create a head and a tail for a linked list
in other tutorials. Other tutorials might have different methods
for their linked lists.

## Methods

Here are some common methods for a singly linked list and their
average big-O notations. I gave intuitive reasons for given
runtimes.

- Searching [O(n)]: You typically have to go through a certain
number of nodes in order to find the node you are looking for
in a linked list. In the best case scenario, you will find the
node you are looking for at the head node and the runtime is
O(1). In the worst case scenario, you will find the node you are
looking for right before the tail node and the runtime is O(n).
- Push head [O(1)]: You can immediately access the head node's
location. Placing a new node in front of the head node is
trivial and it will have a constant runtime.
- Push tail [O(1)]: You can immediately access the tail node's
location. Placing a new node in front of the head node is
trivial and it will have a constant runtime.
- Pop head [O(1)]: You can immediately access the head node's
location. Deleting the head node is trivial and it will have a
constant runtime.
- Pop tail [O(n)]: In a singly linked list, the runtime for popping ting is O(n) surprisingly. You can immediately access the head node's
location. However, setting the second last node to be the new head involves intreating through all nodes in the list.
- Print [O(n)]: You have to go through all nodes in the list to
get the values of each nodes.
- Reverse [O(n)]: You have to go through all the nodes in the
list to reverse the pointers.

## Implementation in Ruby

We will create a Node class and a List class. Before we do that,
let's create some tests for the implementation.

### Prepare RSpec & FactoryGirl

Please follow [Basic Testing Setup with RSpec and FactoryGirl](http://serv.github.io/blog/2014/02/04/basic-testing-setup-with-rspec-and-factorygirl/) to prepare RSpec and FactoryGirl for testing.

### Planning Models

We need to plan attributes of the Node model and the List
model.

- Node
    - value
    - point
- List
    - head
    - tail
    - count

### Building Factories

Now that we know what attributes are needed for models, we can
build factories.

{% highlight ruby %}
# spec/factories/lists.rb
FactoryGirl.define do
  factory :list do
    head  { head }
    tail  { tail }
    count { count }
  end
end
{% endhighlight %}

{% highlight ruby %}
# spec/factories/nodes.rb
FactoryGirl.define do
  factory :node do
    value { value }
    point { point }
  end
end
{% endhighlight %}

Running the tests now should result in failure.

### Instantiation tests

Let's write some tests for building list and node instantiations.

{% highlight ruby %}
# spec/models/list_spec.rb
require 'spec_helper'

describe List do
  describe 'instantiation' do
    let!(:list) { build(:list, head: nil, tail: nil, count: 0) }

    it 'instantiates a list' do
      expect(list.class.name).to eq("List")
    end
  end

  describe '#new' do
    let!(:list) { List.new }

    it 'build a list' do
      expect(list.head).to eq(nil)
      expect(list.tail).to eq(nil)
      expect(list.count).to eq(0)
    end
  end
end
{% endhighlight %}

{% highlight ruby %}
# spec/models/node_spec.rb
require 'spec_helper'

describe Node do
  describe 'instantiation' do
    let!(:node) { build(:node, value: 1, point: nil) }

    it 'instantiates a list' do
      expect(node.class.name).to eq("Node")
    end
  end

  describe '#new' do
    let!(:node) { Node.new }

    it 'build a list' do
      expect(node.value).to eq(nil)
      expect(node.point).to eq(nil)
    end
  end
end
{% endhighlight %}

If you run the tests now, they should still fail. This is because we
haven't written `new` methods for the models yet.

### `new` Method and attributes

Now we will write new methods and attributes for the models.

{% highlight ruby %}
# lib/models/node.rb
class Node
  attr_accessor :value, :point

  def initialize
    @value = nil
    @point = nil
  end
end
{% endhighlight %}

{% highlight ruby %}
# lib/models/list.rb
class List
  attr_accessor :head, :tail, :count

  def initialize
    @head = nil
    @tail = nil
    @count = 0
  end
end
{% endhighlight %}

### All Methods with Tests

{% highlight ruby %}
# spec/models/list_spec.rb
require 'spec_helper'

describe List do
  describe 'instantiation' do
    let!(:list) { build(:list, head: nil, tail: nil, count: 0) }

    it 'instantiates a list' do
      expect(list.class.name).to eq("List")
    end
  end

  describe '#new' do
    let!(:list) { List.new }

    it 'build a list' do
      expect(list.head).to eq(nil)
      expect(list.tail).to eq(nil)
      expect(list.count).to eq(0)
    end
  end

  describe '#push_head(value)' do
    let!(:list) { build(:list, head: nil, tail: nil, count: 0) }

    it 'no node in the list' do
      random_value = rand(10)
      list.push_head(random_value)
      list.head.value.should == random_value
    end

    it 'one node in the list already' do
      random_value_1 = rand(10)
      random_value_2 = rand(10)
      list.push_head(random_value_1)
      list.push_head(random_value_2)
      list.head.value.should == random_value_2
      list.tail.value.should == random_value_1
    end

    it 'many nodes in the list already' do
      tail = rand(10)
      head = rand(10)
      list.push_head(tail)
      list.push_head(rand(10))
      list.push_head(rand(10))
      list.push_head(head)
      list.head.value.should == head
      list.tail.value.should == tail
    end

    it 'increments count' do
      list.count.should == 0
      list.push_head(rand(10))
      list.push_head(rand(10))
      list.count.should == 2
      list.push_head(rand(10))
      list.count.should == 3
    end
  end

  describe '#push_tail(value)' do
    let!(:list) { build(:list, head: nil, tail: nil, count: 0) }

    it 'no node in the list' do
      random_value = rand(10)
      list.push_tail(random_value)
      list.head.value.should == random_value
      list.tail.value.should == random_value
    end

    it 'one node in the list already' do
      random_value_1 = rand(10)
      random_value_2 = rand(10)
      list.push_tail(random_value_1)
      list.push_tail(random_value_2)
      list.head.value.should == random_value_1
      list.tail.value.should == random_value_2
    end

    it 'many nodes in the list already' do
      tail = rand(10)
      head = rand(10)
      list.push_tail(head)
      list.push_tail(rand(10))
      list.push_tail(rand(10))
      list.push_tail(tail)
      list.head.value.should == head
      list.tail.value.should == tail
    end

    it 'increments count' do
      list.count.should == 0
      list.push_tail(rand(10))
      list.push_tail(rand(10))
      list.count.should == 2
      list.push_tail(rand(10))
      list.count.should == 3
    end
  end

  describe '#pop_head' do
    let!(:list) { build(:list, head: nil, tail: nil, count: 0) }

    it 'no node in the list' do
      list.pop_head.should == false
    end

    it 'one node in the list already' do
      random_value_1 = rand(10)
      list.push_tail(random_value_1)
      list.head.value.should == random_value_1
      list.tail.value.should == random_value_1
      list.pop_head.should == random_value_1
      list.count.should == 0
    end

    it 'many nodes in the list already' do
      tail = rand(10)
      head = rand(10)
      list.push_tail(head)
      list.push_tail(tail)
      list.head.value.should == head
      list.tail.value.should == tail

      list.pop_head.should == head
      list.count.should == 1
      list.head.value.should == tail
      list.tail.value.should == tail
    end
  end

  describe '#pop_tail' do
    let!(:list) { build(:list, head: nil, tail: nil, count: 0) }

    it 'no node in the list' do
      list.pop_tail.should == false
    end

    it 'one node in the list already' do
      random_value_1 = rand(10)
      list.push_tail(random_value_1)
      list.head.value.should == random_value_1
      list.tail.value.should == random_value_1
      list.pop_tail.should == random_value_1
      list.count.should == 0
    end

    it 'many nodes in the list already' do
      tail = 1
      head = 2
      list.push_head(head)
      list.push_tail(tail)
      list.head.value.should == head
      list.tail.value.should == tail

      list.pop_tail.should == tail
      list.count.should == 1
      list.head.value.should == head
      list.tail.value.should == tail
    end
  end

  describe '#nodes' do
    let!(:list) { build(:list, head: nil, tail: nil, count: 0) }

    it 'prints lists' do
      nodes = []

      5.times do |i|
        x = rand(5)
        nodes << x
        list.push_tail(x)
      end

      list.nodes.should == nodes
    end
  end

  describe '#reverse' do
    let!(:list) { build(:list, head: nil, tail: nil, count: 0) }

    it 'reverses list with many nodes' do
      nodes = [1,2,3,4,5]

      nodes.each do |n|
        list.push_tail(n)
      end

      list.reverse.nodes.should == nodes.reverse
    end

    it 'reverses list with one node' do
      nodes = [1]

      nodes.each do |n|
        list.push_tail(n)
      end

      list.reverse.nodes.should == nodes.reverse
    end

    it 'reverses list with no node' do
      nodes = []

      nodes.each do |n|
        list.push_tail(n)
      end

      list.reverse.should == false
    end
  end

  describe '#search(value)' do
    let!(:list) { build(:list, head: nil, tail: nil, count: 0) }

    it 'search a node in a list with no nodes' do
      list.search(1).should == false
    end

    it 'search a node in a list' do
      nodes = [1,2,3,4,5]

      nodes.each do |n|
        list.push_tail(n)
      end

      list.search(4).value.should == 4
      list.search(6).should == false
    end
  end
end
{% endhighlight %}

{% highlight ruby %}
# lib/models/list.rb
class List
  attr_accessor :head, :tail, :count

  def initialize
    @head = nil
    @tail = nil
    @count = 0
  end

  # Push a tail node
  def push_head(value)
    node = Node.new
    node.value = value

    if @count == 0
      @head = node
      @tail = node
      node.point = nil
    else
      node.point = @head
      @head = node
    end
    @count += 1
  end

  # Push a head node
  def push_tail(value)
    node = Node.new
    node.value = value

    if @count == 0
      @head = node
      @tail = node
      node.point = nil
    else
      @tail.point = node
      @tail = node
      node.point = nil
    end

    @count += 1
  end

  # Get head value and delete head node
  def pop_head
    return false if @count < 1

    pop = @head.value
    @head = @head.point
    @count -= 1
    pop
  end

  # Get tail value and delete tail node
  def pop_tail
    return false if @count < 1

    pop = @tail.value
    prev = nil
    current = @head

    while current
      prev = current
      current = current.point
    end

    @tail = prev
    prev.point = nil

    @count -= 1
    pop
  end

  # Returns all nodes in a list
  def nodes
    return false if @count < 1

    current = @head
    str = []

    while current
      str << current.value
      current = current.point
    end

    str
  end

  # Prints all nodes in a list
  def print
    puts nodes.join('-')
  end

  # Reverse a list
  def reverse
    if @count < 1
      false
    elsif @count == 1
      self
    else
      first = nil
      second = @head

      while second
        temp = second.point

        second.point = first
        first = second

        second = temp
      end

      @head.point = nil
      t_head = @head
      @head = @tail
      @tail = t_head

      self
    end
  end

  # Searches a value in a list
  def search(value)
    if @count < 1
      false
    else
      current = @head

      while current
        return current if value == current.value
        current = current.point
      end

      false
    end
  end
end
{% endhighlight %}
