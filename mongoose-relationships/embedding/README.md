<h1>
  <span class="headline">Mongoose Relationships</span>
  <span class="subhead">Embedding</span>
</h1>

**Learning objective:** By the end of this lesson, students will understand how to embed subdocuments in a Mongoose schema.

## What is embedding?

Embedding is the practice of storing related data within a single document. This is achieved by nesting *sub-documents* or arrays of sub-documents inside a parent document.

Here’s an example of what a document with embedded data looks like (assume a document from a people collection):

```shell
{
  _id: ObjectId("5099803df3f4948bd2e983a4"),
  name: "Joe Smith",
  contacts: [
    {
      _id: ObjectId("5099803df3f4948bd2e98fff"),
      type: "mobile",
      contact: "(555) 555-5555"
    },
    {
      _id: ObjectId("5099803df3f4948bd2e99005"),
      type: "email",
      contact: "joe@smith.com"
    }
  ]
}
```

This document represents **one** record in a MongoDB database. It shows a primary document for an individual named "Joe Smith," identified by a unique `_id`. Embedded within this document is an array named `contacts`, containing sub-documents for different types of contact information.

Each contact entry is a sub-document with its own `_id`, indicating that it is a distinct entity within the array. There are two types of contact information provided for Joe Smith:

- A mobile number: (555) 555-5555
- An email address: joe@smith.com

Notice that each contact object has a set of properties that are not the same as the parent object.

```javascript
{
  _id: ObjectId("5099803df3f4948bd2e98fff"),
  type: "mobile",
  contact: "(555) 555-5555"
}
```

This means that subdocuments, in this case contacts, will have their own unique schema.

> 💡 A sub-document is a document nested within another document. Sub-documents are very similar to regular documents - the difference is that they are not saved individually, but as a group when the parent object is saved.

## Why use embedding

Embedding connected data in a single document can reduce the number of read operations required to obtain data. In general, you should structure your schema so your application receives all of its required information in a single read operation.

## Embedding sub-documents for `Todos`

Let's say we want to let users create sub-tasks under each `Todo` in our application. For instance, if a user created a `Todo` called "Pack for Vacation", they could have associated sub-tasks like "Toothbrush", "Swimsuit", and "Laptop".

In this scenario, we have a one-to-many relationship where each `Todo` can include multiple items, but each item is specific to only one `Todo`. Therefore, it's logical to embed these items directly within the `Todo`. This approach is more organized, making it easier to manage and access the items associated with each `Todo`. This will help reduce the number of read operations required to obtain our data.

First, we'll create a new schema for our sub-tasks. They will need a `text` field and an `isComplete` field:

```javascript
const mongoose = require('mongoose');

// new
const subtaskSchema = new mongoose.Schema({
  text: String,
  isComplete: Boolean,
});

const todoSchema = new mongoose.Schema({
  text: String,
  isComplete: Boolean,
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
```

> 💡 Sub-documents have their own **schema**, but since sub-documents are not saved to their own collection, we **do not compile a sub-document’s schema into a Model**.

Now that we have two schemas, the next step is to give them a relationship.

To associate this data, we nest our `subtaskSchema` in our `todoSchema`.

Mongoose represents an array of sub-documents as an embedded schema wrapped in square brackets `[schema]`. This indicates that subtasks will be an array whose elements conform to the `subtaskSchema`.

```javascript
const mongoose = require('mongoose');

const subtaskSchema = new mongoose.Schema({
  text: String,
  isComplete: Boolean,
});

const todoSchema = new mongoose.Schema({
  text: String,
  isComplete: Boolean,
  subtasks: [subtaskSchema], // embedded subtask schema
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
```

> 🏆 As with normal JavaScript conventions, the field name for this array should be a pluralized version of the elements it contains. In this case, it makes sense to refer to an array full of individual subtask elements as `subtasks`.

## Adding a `subtask`

Let's create a new function for creating subtasks at the bottom of the **Query Functions** section in the `queries.js` file, under our existing functions:

```javascript
const createSubtask = async () => {
  // Assume that the todo we want to create a
  // sub-task for has the following id:
  const todoId = "657b25adc8146427465857d7";
  // Look up the todo by id, assign the returned object to `todo`
  const todo = await Todo.findById(todoId);

  const subtaskData = {
    text: "Learn how props work",
    isComplete: false,
  };

  // Push the new sub-task data into the subtasks array on the todo:
  const subtask = todo.subtasks.push(subtaskData);
  // Save the parent document:
  await todo.save();
  console.log("Modified todo:", todo);
};
```

Test your new `createSubtask` function and review the `todo` logged to the console. You can test the functions in the `queries.js` file using node. Run this command in your terminal:

```bash
node queries.js
```

```javascript
// queries.js

const runQueries = async () => {
  console.log("Queries running.");
  await createSubtask();
};
```

You should see an embedded sub-document in the `todo.subtasks` array.

```plaintext
Modified todo: {
  _id: new ObjectId('657b25adc8146427465857d7'),
  text: 'Learn React',
  isComplete: false,
  __v: 1,
  subtasks: [
    {
      text: 'Learn how props work',
      isComplete: false,
      _id: new ObjectId('6580677cf30bfef697ae046f')
    }
  ]
}
```
