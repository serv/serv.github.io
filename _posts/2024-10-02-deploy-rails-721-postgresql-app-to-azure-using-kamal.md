---
layout: post
title: Deploy Rails 7.2.1 + Postgresql App to Azure Using Kamal
date: 2024-10-02T00:51:07-07:00
comments: true
categories: []
---

# 1. Settings up Rails App

## 1.1 Create a new Rails app

`$ rails new rails-pg-kamal-deployed-to-azure --minimal --database=postgresql`

## 1.2 Add a scaffold

- `$ cd rails-pg-kamal-deployed-to-azure`
- `$ rails g scaffold post title:string content:text`

## 1.3 Locally set up Postgresql for Testing

- Create `docker-compose.development.yml`

```yml
version: '3.8'
services:
  db:
    image: postgres:16.2-alpine
    container_name: rails-pg-kamal-deployed-to-azure-development-db
    restart: always
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=rails_pg_kamal_deployed_to_azure_development
    ports:
      - '5442:5432'
    volumes:
      - db:/var/lib/postgresql/data
volumes:
  db:
    driver: local
```

- Note the username, password, db name, and the port above

- `config/database.yml`
```yaml
development:
  <<: *default
  database: rails_pg_kamal_deployed_to_azure_development
  port: 5442
  host: localhost
  username: postgres
  password: postgres
```

- Start PG DB locally
  - `$ docker-compose -f docker-compose.development.yml up --build`

## 1.4 Run migration

- You can omit running `$ rails db:create` because database will be created by starting docker-compose
- Run `$ rails db:migrate` 

## 1.5 Add Routes

- `routes.rb`

```ruby
root "posts#index"
```

## 1.6 Start server locally

- `$ ./bin/dev`
- Go to localhost:3000