---
layout: post
title: Enable HTTPS for a Rails app with Kamal to Azure
date: 2024-12-03T23:13:30-08:00
comments: true
categories: ["rails", "kamal"]
---

Refer to previous two posts to deploy a Rails app to Azure.

- [Deploy Rails 7.2.1 + Sqlite3 App to Azure Using Kamal](https://blog.jasonkim.ca/post/deploy-rails-721-sqlite3-app-to-azure-using-kamal)
- [Deploy Rails 7.2.1 + Managed Postgresql App to Azure Using Kamal 2.1.1](https://blog.jasonkim.ca/post/deploy-rails-721-managed-postgresql-app-to-azure-using-kamal-211)

This post is made for:

- Ruby: 3.3.5
- Rails: 8.0.0
- Kamal: 2.3.0 

# 1. Load Balancer Setup

1. Sign into Azure
2. Search for Load Balancers and select it.
3. Select the load balancer for the VM running the Rails app.
4. Select Settings > Inbound NAT rules link in the left sidebar.
5. Click +Add
6. Create a new NAT inbound rule like below
    - ![](/images/2024/12/3/lb-nat-inbound.png)

# 2. Rails App

Setup the Rails like like the following.

## 2.1 `config/environments/production.rb`

```ruby
config.force_ssl = true
```

## 2.2 `config/deploy.yml`

```yaml
...
proxy:
  ssl: true
  host: yourdomain.com
...
```

## 2.3 Deploy and Check

1. Run `kamal deploy`
2. Check `yourdomain.com`