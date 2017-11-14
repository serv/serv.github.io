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

## Setting up ActiveStorage for Rails

1. If you are using Rails version before 5.1.14, update Rails to 5.1.14 by
updating your Gemfile
```ruby
gem 'rails', '~> 5.1', '>= 5.1.4'
```

2. Run `$ bundle update rails`

3. Run `$ rails app:update` and resolve any code differences.

4. Test that updating to `5.1.14` went ok.

5. Now we want to update rails to the latest bleeding edge version. In the
`Gemfile`, add the following lines.
```ruby
git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end
...
gem 'rails', github: 'rails/rails'
gem 'arel', git: 'https://github.com/rails/arel.git'
gem 'bootsnap', '~> 1.1', '>= 1.1.5', require: false
```

6. Run `$ bundle update rails`

7. `$ bundle exec rails -v` should display the bleeding edge version,
`Rails 5.2.0.alpha`.

8. Update the application configs. Run `$ bundle exec rails app:update`.

9. When you run, `$ ./bin/rails --tasks`, you should see,
`rails active_storage:install` as an available task.

10. Run `$ ./bin/rails active_storage:install`. This should generate a migration
file.

11. Run `$ ./bin/rails db:migrate`. Now our sqlite db should
be ready to support ActiveStorage.

## A simple image uploading example using ActiveStorage

Up until now, we've been preparing Rails application to support ActiveStorage.
Now that the application is equipped with ActiveStorage, let us build a
simple post with images feature that uses ActiveStorage.

1. Generate post model. `$ ./bin/rails g model post`.

2. Let's add two columns to post table, `title`, `body` in the migration file.
```ruby
# db/migrate/20171114063756_create_posts.rb
class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.string :title
      t.text :body

      t.timestamps
    end
  end
end
```

3. Let's create a controller for posts resource.
`$ ./bin/rails g controller posts`

4. And add posts resources routes in the `config/routes.rb`.
```ruby
Rails.application.routes.draw do
  resources :posts
end
```

5. We need to associate post with images.
```ruby
class Post < ApplicationRecord
  has_many_attached :images
end
```

6. Let's add code for index, show and create actions.
```ruby
# app/controllers/posts_controller.rb
class PostsController < ApplicationController
  # we will display post form here
  def index
    @post = Post.new
  end
  # we will create post here
  def create
    post = Post.create! params.require(:message).permit(:title, :body)
    post.images.attach(params[:message][:images])
    redirect_to post
  end
  # we will display post with photo
  def show
    @post = Post.find(params[:id])
  end
end
```

7. Add the index view for the post with the following code. This
will display upload form on localhost:3000/posts page.
```erb
# app/views/posts/index.html.erb
<%= form_with model: @post, local: true do |form| %>
  <%= form.text_field :title, placeholder: "Title" %><br>
  <%= form.text_area :body %><br><br>
  <%= form.file_field :images, multiple: true %><br>
  <%= form.submit %>
<% end %>
```

8. Now let's add a view for show post.
```erb
# app/views/posts/show.html.erb
<%= image_tag @post.images.first %>
```

9. Try submitting a photo and you will see the show view displays the
image you just submitted. The image is currently stored locally in a
directory called `storage` in the app root level. But you can configure
this to push the files to cloud file storage systems like AWS S3, Google Cloud
and Azure.

As you can see, ActiveStorage presents a simplied file management system
that is well integrated into Rail's ActiveRecord component. While there are
other file management systems out there for Rails, we should see
majority of use cases being covered by ActiveStorage. I suggest that
if you are looking to implement anything related to photo uploading or
attaching files, consider ActiveStorage before you explore other options.

Also check out [the documentation on ActiveStorage](https://github.com/rails/rails/blob/master/activestorage/README.md).

You can see the final working code on the [github repo](https://github.com/serv/rails-alpha-activestorage-example).

I wanna thank [@jeffreyguenther](https://twitter.com/jeffreyguenther) who
shared his experience of using ActiveStorage on his projects with me.



