---
layout: post
title: Deploy Rails 7.2.1 + Managed Postgresql App to Azure Using Kamal 2.1.1
date: 2024-11-09T00:51:07-07:00
comments: true
categories: []
---

Let's setup a Rails app that uses Postgresql as the DB and deploy it to Azure using Kamal. Note that the Postgresql in production environment will be using the managed Postgresql instance in Azure.

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

# 2. Azure

## 2.1 Everything except Postgresql

Please follow [the instructions here](https://blog.jasonkim.ca/post/deploy-rails-721-sqlite3-app-to-azure-using-kamal).

You may want to skip "2.2 Create Container Registry", if you already have a container registry to use.

## 2.2 Postgresql

### 2.2.1 Setting up Basics

1. Go ["Create a resource" page](https://portal.azure.com/#view/Microsoft_Azure_Marketplace/PlusNew.ReactView/package/hub/additionalConfig~/%7B%7D/selectedMenuItemId/undefined/createLanding/undefined)
2. In the left hand side bar, select "Databases".
3. Click "Create" for "Azure Database for PostgreSQL"
4. Select the Subscription and Resource Group
5. Under Server Details, provide info like below.
  - ![](/images/2024/10/azure-pg-server-details.png)
6. Make sure to Click "Configure server" and size down the DB server appropriately.
  - ![](/images/2024/10/azure-pg-server-config.png)
7. Provide info to setup "Authentication" for the db.
  - ![](/images/2024/10/azure-pg-auth.png)
8. Click "Review + create".



PG
- pgadminops
- 8132a28d96bc@

### 2.2.2 Networking

- Setup the Networking setup like below
- ![](/images/2024/10/azure-pg-server-network.png)
- Click "Create".

### 2.2.3 Dealing with `extension "plpgsql" is not allow-listed for "azure_pg_admin" users in Azure Database for PostgreSQL` error.

When you use Azure Database for PostgreSQL, you will see the following error.

```
 ERROR 2024-10-16T06:56:56.367508062Z bin/rails aborted!
2024-10-16T06:56:56.367929864Z ActiveRecord::StatementInvalid: PG::FeatureNotSupported: ERROR:  extension "plpgsql" is not allow-listed for "azure_pg_admin" users in Azure Database for PostgreSQL (ActiveRecord::StatementInvalid)
2024-10-16T06:56:56.367975864Z HINT:  to learn how to allow an extension or see the list of allowed extensions, please refer to https://go.microsoft.com/fwlink/?linkid=2281561
2024-10-16T06:56:56.368497566Z /rails/db/schema.rb:15:in `block in <top (required)>'
2024-10-16T06:56:56.368509766Z /rails/db/schema.rb:13:in `<top (required)>'
2024-10-16T06:56:56.368641767Z
2024-10-16T06:56:56.368669567Z Caused by:
2024-10-16T06:56:56.368799368Z PG::FeatureNotSupported: ERROR:  extension "plpgsql" is not allow-listed for "azure_pg_admin" users in Azure Database for PostgreSQL (PG::FeatureNotSupported)
2024-10-16T06:56:56.368809368Z HINT:  to learn how to allow an extension or see the list of allowed extensions, please refer to https://go.microsoft.com/fwlink/?linkid=2281561
2024-10-16T06:56:56.368998368Z /rails/db/schema.rb:15:in `block in <top (required)>'
2024-10-16T06:56:56.369025368Z /rails/db/schema.rb:13:in `<top (required)>'
2024-10-16T06:56:56.369153969Z Tasks: TOP => db:prepare
2024-10-16T06:56:56.369269569Z (See full trace by running task with --trace)
2024-10-16T06:57:00.413100892Z bin/rails aborted!
```

1. Go to `Azure Database for PostgreSQL`
2. Select the PG database
3. Click Settings > Server Parameters
4. Search for `azure.extensions`.
5. Click `Value` column
6. Check `PLPGSQL`.
  - ![](/images/2024/10/pg-azure-exte.png)

See [link](https://stackoverflow.com/a/74002100/536890) for more info.

# 3. Setting up Kamal 2 for Rails

## 3.1. Follow these steps here

Follow Step 3 in the following [link](https://blog.jasonkim.ca/post/deploy-rails-721-sqlite3-app-to-azure-using-kamal), but you can skip Step 3.1.

## 3.2. Update `.kamal/secrets`

- Add secrets in `.kamal/secrets`.

```
RAILS_MASTER_KEY=$(cat config/master.key)
KAMAL_REGISTRY_PASSWORD=...
POSTGRES_PASSWORD=...
```

## 3.3. Update `config/database.yml`

```yml
production:
  <<: *default
  database: rails_pg_kamal_deployed_to_azure_production
  username: pgadminops
  password: <%= ENV["POSTGRES_PASSWORD"] %>
  host: <%= ENV["DB_HOST"] %>
```

## 3.4. Update `config/deploy.yml`

- Comment out `proxy.host`.

Example:

```yml
<% require "dotenv"; Dotenv.load(".env") %>

# Name of your application. Used to uniquely configure containers.
service: rails-pg-kamal-deployed-to-azure

# Name of the container image.
image: serv/rails-pg-kamal-deployed-to-azure

# Deploy to these servers.
servers:
  web:
    hosts:
      - x.y.z.a  
  # job:
  #   hosts:
  #     - 192.168.0.1
  #   cmd: bin/jobs

# Enable SSL auto certification via Let's Encrypt (and allow for multiple apps on one server).
# Set ssl: false if using something like Cloudflare to terminate SSL (but keep host!).
proxy:
  ssl: false
  # host: 52.146.91.48
  # kamal-proxy connects to your container over port 80, use `app_port` to specify a different port.
  app_port: 3000
  healthcheck:
    path: /up

# Credentials for your image host.
registry:
  # Specify the registry server, if you're not using Docker Hub
  # server: registry.digitalocean.com / ghcr.io / ...
  server: xyz.azurecr.io
  username: xyz

  # Always use an access token rather than real password (pulled from .kamal/secrets).
  password:
    - KAMAL_REGISTRY_PASSWORD

# Configure builder setup.
builder:
  # context: .
  arch: amd64
# Inject ENV variables into containers (secrets come from .kamal/secrets).
#
env:
  clear:
    DB_HOST: <%= ENV["DB_HOST"] %>
  secret:
    - RAILS_MASTER_KEY
    - KAMAL_REGISTRY_PASSWORD
    - POSTGRES_PASSWORD

# Aliases are triggered with "bin/kamal <alias>". You can overwrite arguments on invocation:
# "bin/kamal logs -r job" will tail logs from the first server in the job section.
#
# aliases:
#   shell: app exec --interactive --reuse "bash"

# Use a different ssh user than root
ssh:
  user: azureuser
```

## 3.5 Update `config/environments/production.rb`

Comment out `force_ssl`.

```ruby
# config.force_ssl = true
```

## 3.6. Update `config/routes.rb`

```ruby
root "posts#index"
```

