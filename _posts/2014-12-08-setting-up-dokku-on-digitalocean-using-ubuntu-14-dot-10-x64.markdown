---
layout: post
title: "Setting up Dokku on DigitalOcean using Ubuntu 14.10 x64"
date: 2014-12-08 15:24:03 -0800
comments: true
categories: ['sysadmin', 'deployment']
---

Note: this is still incomplete.

## Prerequisites

- Minimal understanding of what Dokku, DigitalOcean and Ubuntu ara
- Already has DigitalOcean account
- Knows basics of SSH

## Creating DigitalOcean Droplet

1. Sign into DigitalOcean and click on the button, "CREATE" on the left sidebar.
2. Insert a good Droplet Hostname and select the size of the droplet that suits
your application.
3. Select the region. I'm choosing the default one, which is NY3.
4. In "Select Image" section, click on "Linux Distributions" tab.
5. Click on Ubuntu and select **14.10 x64**.
6. We will create and add a new SSH key manually. DO NOT select any SSH key
displayed under "Add SSH Keys" section.
7. Click on "Create Droplet"

## Logging into the new server for the first time

1. You should have received an email that contains your host IP address,
username and the password. Keep the password as secret! Username is `root` by
default.
2. Log into the host server using the username. `$ ssh root@123.123.123.123`
Replace `123.123.123.123` with your host ip address.
3. Type `yes` to the question `Are you sure you want to continue connecting (yes/no)?` and press Enter.
4. Copy and paste the root password that was emailed to you.
5. The server will prompt you to update your password. Follow the instructions
given to you and update the password.

## Creating public key on your local machine

1. On your local computer's terminal, run `$ cd ~/.ssh`
2. Run `$ ssh-keygen -t rsa -C "your_email@example.com"`
3. To the question, `Enter file in which to save the key (/Users/you/.ssh/id_rsa): `, type in the host name of the DigitalOcean droplet you just create. Just
good practise to have the same name.
4. Enter the password for the pubkey you just created. This doesn't have to
be the same as the root password you changed earlier.
5. Run `$ cat key-you-created.pub` to check that pubkey was created successfully.
6. Copy the result of `$ cat key-you-created.pub` in the local machine.

## Adding the new SSH Key in DigitalOcean

1. Log into DigitalOcean
2. Click on "SSH Keys" on the left hand side.
3. Click on "Add SSH Keys" on the top right hand side.
4. Paste the pubkey content in the form and submit it.

## Configuring your local machine to use this specific new pubkey
when connecting to the server

1. In the local machine, run `$ vi ~/.ssh/config`
2. Add the following lines.

{% highlight text %}
Host [some-host-name-nickname]
  Hostname     [123.123.123.123].
  User         root
  IdentityFile ~/.ssh/[key-you-created]
{% endhighlight %}

3. Replace all the data in `[]`.

## Authenticating yourself against the server

1. In the server console run `$ cd ~/.ssh`
2. Again, in the server, run `$ echo "ssh-rsa [paste the content of key-you-created.pub]" >> authorized_keys`.
3. Run `$ cat authorized_keys` and check that your local machine's pubkey is
in the list of authorized_keys in the server.

## Phew, take a breather

If everything went right, you should be able to do, `$ ssh root@some-host-name-nickname`.

## Installing Dokku

1. I am largely following [the official installation doc for Dokku](http://progrium.viewdocs.io/dokku/installation).
2. On the server, run `$ wget -qO- https://raw.github.com/progrium/dokku/v0.3.7/bootstrap.sh | sudo DOKKU_TAG=v0.3.7 bash`
3. `$ cat ~/.ssh/supurl-production.pub | ssh root@104.131.160.133 "sudo sshcommand acl-add dokku $USER"`
4. `$ git remote add dokku dokku@supurl-production:supurl-production`

## Troubleshooting various errors

{% highlight text %}
git push dokku master
Counting objects: 1012, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (772/772), done.
Writing objects: 100% (1012/1012), 109.41 KiB | 0 bytes/s, done.
Total 1012 (delta 526), reused 298 (delta 137)
-----> Cleaning up ...
-----> Building supurl-production ...
Ruby app detected
-----> Compiling Ruby/Rails
-----> Using Ruby version: ruby-2.0.0
-----> Installing dependencies using 1.5.2
New app detected loading default bundler cache
!
!     Command: 'set -o pipefail; curl --fail --retry 3 --retry-delay 1 --connect-timeout 3 --max-time 30 https://s3-external-1.amazonaws.com/heroku-buildpack-ruby/ruby-2.0.0-p481-default-cache.tgz -s -o - | tar zxf -' failed unexpectedly:
!
!     gzip: stdin: unexpected end of file
!     tar: Child returned status 1
!     tar: Error is not recoverable: exiting now
!
To dokku@supurl-production:supurl-production
! [remote rejected] master -> master (pre-receive hook declined)
error: failed to push some refs to 'dokku@supurl-production:supurl-production'
{% endhighlight %}

Build pack error.
https://github.com/heroku/heroku-buildpack-ruby/issues/304


{% highlight text %}
I, [2014-12-09T01:09:50.397656 #12]  INFO -- : listening on addr=0.0.0.0:5000 fd=10
E, [2014-12-09T01:09:50.403558 #12] ERROR -- : could not connect to server: No such file or directory
Is the server running locally and accepting
connections on Unix domain socket "/var/run/postgresql/.s.PGSQL.5432"?
(PG::ConnectionBad)
/app/vendor/bundle/ruby/2.1.0/gems/activerecord-4.1.6/lib/active_record/connection_adapters/postgresql_adapter.rb:888:in `initialize'
/app/vendor/bundle/ruby/2.1.0/gems/activerecord-4.1.6/lib/active_record/connection_adapters/postgresql_adapter.rb:888:in `new'
/app/vendor/bundle/ruby/2.1.0/gems/activerecord-4.1.6/lib/active_record/connection_adapters/postgresql_adapter.rb:888:in `connect'
/app/vendor/bundle/ruby/2.1.0/gems/activerecord-4.1.6/lib/active_record/connection_adapters/postgresql_adapter.rb:568:in `initialize'
/app/vendor/bundle/ruby/2.1.0/gems/activerecord-4.1.6/lib/active_record/connection_adapters/postgresql_adapter.rb:41:in `new'
/app/vendor/bundle/ruby/2.1.0/gems/activerecord-4.1.6/lib/active_record/connection_adapters/postgresql_adapter.rb:41:in `postgresql_connection'
/app/vendor/bundle/ruby/2.1.0/gems/activerecord-4.1.6/lib/active_record/connection_adapters/abstract/connection_pool.rb:435:in `new_connection'
/app/vendor/bundle/ruby/2.1.0/gems/activerecord-4.1.6/lib/active_record/connection_adapters/abstract/connection_pool.rb:445:in `checkout_new_connection'
/app/vendor/bundle/ruby/2.1.0/gems/activerecord-4.1.6/lib/active_record/connection_adapters/abstract/connection_pool.rb:416:in `acquire_connection'
/app/vendor/bundle/ruby/2.1.0/gems/activerecord-4.1.6/lib/active_record/connection_adapters/abstract/connection_pool.rb:351:in `block in checkout'
/app/vendor/ruby-2.1.5/lib/ruby/2.1.0/monitor.rb:211:in `mon_synchronize'
/app/vendor/bundle/ruby/2.1.0/gems/activerecord-4.1.6/lib/active_record/connection_adapters/abstract/connection_pool.rb:350:in `checkout'
/app/vendor/bundle/ruby/2.1.0/gems/activerecord-4.1.6/lib/active_record/connection_adapters/abstract/connection_pool.rb:265:in `block in connection'
/app/vendor/ruby-2.1.5/lib/ruby/2.1.0/monitor.rb:211:in `mon_synchronize'
/app/vendor/bundle/ruby/2.1.0/gems/activerecord-4.1.6/lib/active_record/connection_adapters/abstract/connection_pool.rb:264:in `connection'
/app/vendor/bundle/ruby/2.1.0/gems/activerecord-4.1.6/lib/active_record/connection_adapters/abstract/connection_pool.rb:541:in `retrieve_connection'
/app/vendor/bundle/ruby/2.1.0/gems/activerecord-4.1.6/lib/active_record/connection_handling.rb:113:in `retrieve_connection'
/app/vendor/bundle/ruby/2.1.0/gems/activerecord-4.1.6/lib/active_record/connection_handling.rb:87:in `connection'
./config/unicorn.rb:15:in `block in reload'
/app/vendor/bundle/ruby/2.1.0/gems/unicorn-4.8.3/lib/unicorn/http_server.rb:519:in `call'
/app/vendor/bundle/ruby/2.1.0/gems/unicorn-4.8.3/lib/unicorn/http_server.rb:519:in `spawn_missing_workers'
/app/vendor/bundle/ruby/2.1.0/gems/unicorn-4.8.3/lib/unicorn/http_server.rb:140:in `start'
/app/vendor/bundle/ruby/2.1.0/gems/unicorn-4.8.3/bin/unicorn:126:in `<top (required)>'
/app/vendor/bundle/ruby/2.1.0/bin/unicorn:23:in `load'
/app/vendor/bundle/ruby/2.1.0/bin/unicorn:23:in `<main>'
{% endhighlight %}

`$ dokku postgresql:create supurl-production`

http://dev.housetrip.com/2014/07/06/deploy-rails-and-postgresql-app-to-dokku/

`dokku run APP_NAME rake db:seed `


{% highlight text %}
# installing the plugin
cd /var/lib/dokku/plugins
git clone https://github.com/Kloadut/dokku-pg-plugin postgresql
dokku plugins-install

# Create and setup the db
dokku postgresql:create <db-name>

# Once you've deployed your app once, you can link the db to the app like:
dokku postgresql:link <app-name> <db-name>
{% endhighlight %}


{% highlight text %}
remote: runtime: panic before malloc heap initialized
remote: fatal error: runtime: cannot allocate heap metadata
To dokku@supurl-production:supurl-production
! [remote rejected] master -> master (pre-receive hook declined)
error: failed to push some refs to 'dokku@supurl-production:supurl-production'
{% endhighlight %}

https://github.com/docker/docker/issues/1555
http://stackoverflow.com/a/17174672/536890
