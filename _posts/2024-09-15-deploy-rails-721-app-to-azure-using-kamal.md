---
layout: post
title: Deploy Rails 7.2.1 App to Azure Using Kamal
date: 2024-09-15T23:07:51-07:00
comments: true
categories: ["rails", "ruby", "azure", "kamal"]
---

[Kamal](https://kamal-deploy.org/) is a deployment tool for 
deploying Rails apps to cloud environments.
And Azure is a fantastic cloud service provider (I work for Microsoft) to
deploy Rails apps.

Let's try to deploy a test Rails app with a Postgresql DB to Azure.

Although this guide will go into details about setting up various systems in
Azure, the guide assumes that you have Azure account and billing setup already.
The guide also assumes some preliminary understanding of Rails.

Here are the exact versions of tools I am using as of April 7, 2024.

- Ruby: 3.3.0
- Rails: 7.2.1
- Kamal: 1.3.1

# 1. Settings up Rails App

## 1.1 Create a new Rails app

`$ rails new rails-kamal-deployed-to-azure --minimal`

## 1.2 Add a scaffold

- `$ cd rails-kamal-deployed-to-azure`
- `$ rails g scaffold post title:string content:text`

## 1.3 Run migration

- You can omit `rails db:create` because database will be created by starting docker-compose
- Run `$ rails db:migrate` 

## 1.4 Update routes

In `routes.rb`,

```ruby
root "posts#index"
```

## 1.5 Start the server to test locally

- `$ ./bin/rails s`
- Check that the server is locally running.
- Go to [localhost:3000](http://localhost:3000)
- You should see something like this.
    - ![](/images/2024/9/16/16-local-rails.png)

# 2. Azure

You should have a subscription and a resource group for Azure before you proceed.

## 2.1 Create virtual machines

- Go to https://portal.azure.com/#create/Microsoft.VirtualMachine-ARM
- Select a subscription and a resource group.
- Use a name like `rails-kamal-deployed-to-azure-1`
- Choose `SSH public key` for `Authentication type > Administrator account`.
- Add `Key pair name`. Use a name like `rails-kamal-deployed-to-azure-1_key`. 
  - ![](/images/2024/9/16/16-ssh.png)
- Enable ports 22, 80, 443
  - ![](/images/2024/9/16/16-inbound-ports.png)
- Click "Review + create"
- Download the key when prompted and keep it handy.
  - ![](/images/2024/9/16/16-download-key.png)

## 2.2 Create Container Registry

- Go to https://portal.azure.com/#browse/Microsoft.ContainerRegistry%2Fregistries
- Create a Container Registry
  - ![](/images/2024/9/16/16-registry.png)
- Once the registry is created, go to the registry resource
- Go to Settings > Access Keys section
- Check "Admin user"
- Copy the passwords

## 2.3 Create a load balancer

- https://portal.azure.com/#create/Microsoft.LoadBalancer-ARM
