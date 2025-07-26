<h1>
  <span class="headline">Mongoose Relationships</span>
  <span class="subhead">Setup</span>
</h1>

## Setup

Open your Terminal application and navigate to your `~/code/ga/lectures` directory:

```bash
cd ~/code/ga/lectures
```

Make a new directory called `mongoose-relationships`, then enter this directory:

```bash
mkdir mongoose-relationships
cd mongoose-relationships
```

Create a node project along with its `package.json` file by using this command:

```bash
npm init -y
```

Open the contents of the directory in VS Code:

```bash
code .
```

## Install `mongoose` and `dotenv` from NPM

To use mongoose in our application, we'll first need to install the `mongoose` and `dotenv` packages from NPM:

```bash
npm i mongoose dotenv
```

## Add the MongoDB Atlas connection string to your `.env` file

First, create a `.env` file in your project's root directory:

```bash
touch .env
```

This file will be used to store any sensitive, secret information that the application needs to run, but that we don't want to commit to GitHub. Database connection strings definitely qualify: we don't want just anybody to be able to access our database using this string!

`.env` files are a simple list of key-value pairs defined like so:

```plaintext
SECRET_NUMBER=13
PASSWORD=12345
```

This will allow an application to access the `SECRET_NUMBER` and `PASSWORD` properties on a `process.env` object.

Paste your MongoDB Atlas connection string in the app's `.env` file, assigning it to a `MONGODB_URI` environment variable. For example:

```plaintext
MONGODB_URI=mongodb+srv://<username>:<password>@sei-w0kys.azure.mongodb.net/?retryWrites=true
```

> 🚨 Do not use the above connection string in your application, it will not work.

There must be no spaces between `MONGODB_URI`, `=`, and your atlas connection string. It should be written as one continuous string.

This will make the connection string available in our application on the `process.env.MONGODB_URI` property.

Your connection string will default to a generic unnamed database, as indicated by the `/?` towards the end of the connection string. However, you **_must_** update this to your preferred database name.

**In this application, that will be `todos`.**

You can specify the preferred database name by adding it between the `/` and the `?` in the connection string. That will make the full connection string for this app look something like this:

```plaintext
MONGODB_URI=mongodb+srv://<username>:<password>@sei-w0kys.azure.mongodb.net/todos?retryWrites=true
```

> 🚨 Again, do not use the above connection string in your application, it will not work.

### This application builds on previous functionality for performing CRUD operations on a resource called `Todos`.

## Add a `.gitignore`

Create a `.gitignore` file in your project's root directory:

```bash
touch .gitignore
```

A `.gitignore` file is useful when working with Mongoose and MongoDB, as it prevents sensitive files (like your `.env`) from being committed to GitHub. In this application, the `.env` contains our database connection string. We'll add the `.env` file to our `.gitignore` to prevent it from being committed to version control, avoiding the risk of exposing sensitive information online.

Add the following to your `.gitignore` file:

```plaintext
.env
node_modules
```

## Defining a model

Let's create a models directory and a file to define the `todos` resource:

```bash
mkdir models
touch models/todo.js
```

Add the following to `models/todo.js`:

```javascript
// models/todo.js
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  text: String,
  isComplete: Boolean,
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
```

## Query file

Create a `queries.js` file. We'll use this file to execute various Mongoose operations:

```bash
touch queries.js
```

Add the following starter code to `queries.js`:

```javascript
/*------------------------------ Starter Code ------------------------------*/

const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const Todo = require('./models/todo.js');

const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');
  await runQueries();

  await mongoose.disconnect();
  console.log('Disconnected from MongoDB');
  process.exit();
};

connect();

/*----------------------------- Query Functions -----------------------------*/

const createTodo = async () => {
  const todoData = {
    text: 'learn React',
    isComplete: false,
  };
  const todo = await Todo.create(todoData);
  console.log('New todo:', todo);
};

const findTodos = async () => {
  const todos = await Todo.find({});
  console.log('All todos:', todos);
};

/*------------------------------- Run Queries -------------------------------*/

const runQueries = async () => {
  console.log('Queries running.');
  await createTodo();
};
```

This code establishes a connection to MongoDB and provides two functions to **_create_** and **_read_** `todo` resources in our database.

In this lesson we will build on that functionality, by adding additional data and showing how to create a relationship between the new data and the existing `todo` resource.
