---
layout: post
title: Setting Up Typescript For Node.js in 2022
date: 2022-06-11T22:05:05-07:00
comments: true
categories: []
---

Let's setup an Express app using Typescript.

# 1. Install TSC, TSLint, and type declarations for NodeJS

- `npm install --save-dev typescript tslint @types/node @tsconfig/node16`
- Let's install express as well
  - `npm install --save express`

# 2. Write tsconfig.json

```json
{
  "extends": "@tsconfig/node16/tsconfig.json",
  "compilerOptions": {
    "outDir": "dist"
  },
  "include": ["index.ts"]
}
```

# 3. Add npm run commands

We want to be able to run `npm run build` to compile typescript file into a javascript file. 

Add `"build": "./node_modules/.bin/tsc"` under `"scripts"` key.

We also want to run `npm run start` to run the express app.

Add `"start": "node ./dist"` under `"scripts"` key.

The `package.json` file should look like this.

```json
{
  "name": "typescript-nodejs",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "./node_modules/.bin/tsc",
    "start": "node ./dist"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@tsconfig/node16": "^1.0.3",
    "@types/node": "^17.0.42",
    "tslint": "^6.1.3",
    "typescript": "^4.7.3"
  },
  "dependencies": {
    "express": "^4.18.1"
  }
}
```

# 4. Add index.ts with express.js

Add the following. THe code is from [the express website](https://expressjs.com/en/starter/hello-world.html).

```typescript
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
```

# 5. Compile and run

- Compile: `npm run build`
- Start: `npm run start`

You should see `Example app listening on port 3000` printed in the console.

You can see the hello world when you go to [localhost:3000](http://localhost:3000/).

You can find the code [here](https://github.com/serv/blog-tutorials/tree/master/typescript-nodejs).
