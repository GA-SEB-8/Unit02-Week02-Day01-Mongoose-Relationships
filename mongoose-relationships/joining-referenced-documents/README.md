<h1>
  <span class="headline">Mongoose Relationships</span>
  <span class="subhead">Joining Referenced Documents</span>
</h1>

**Learning Objective:** By the end of this lesson, students will be able to retrieve referenced documents using the `populate()` method.

## The `populate()` method

With embedding, a parent document ***contains*** the related sub-documents, but with referencing, a document *only* contains the related document’s `ObjectId`. We can demonstrate this concept if we execute the `findTodos` function.

When you run `findTodos()` you should see something like this in your terminal:

```plaintext
All todos: [
  {
    _id: new ObjectId('657b25adc8146427465857d7'),
    text: 'Learn React',
    isComplete: false,
    __v: 6,
    subtasks: [],
    assignee: new ObjectId('6581d503b8b46a5314295d66')
  }
]
```

Our `todo` document contains a reference to a `user`, but not the actual data. While we could execute another database operation to retrieve the relevant `user` document, Mongoose provides a more streamlined approach with the [`populate()`](https://mongoosejs.com/docs/populate.html#population). method.

In Mongoose, the `populate()` method is a powerful tool that allows you to automatically replace references in a document with the actual data from other collections. Essentially, it can be used to "join" data from different collections in a single query. In its most straightforward implementation, `populate()` accepts a `string` specifying the path in the document that needs to be populated with data.

When you use `populate()`, it looks for the user reference in your `todo` document and then fetches the corresponding user data from the `users` collection. It replaces the reference with the actual user data, so you get a combined document.

Let's take a look at an example:

```javascript
const todos = await Todo.find({}).populate("assignee");
```

In the example above, the `populate()` method is called on a `find()` operation. It specifies that the `ObjectId` held in the `assignee` field should be replaced with the corresponding `user` document. This will apply to all `todos` (assuming they have an active `assignee` field) returned by the `find()` operation.

## Joining documents with `populate()`

Let's use the `populate()` method to join our `todo` and `user` documents.

In `queries.js`, modify the `findTodos` function as shown below:

```javascript
// queries.js
const findTodos = async () => {
  const todos = await Todo.find({}).populate("assignee");
  console.log("All todos:", todos);
};
```

Be sure to call upon `findTodos` within the `runQueries` function:

```javascript
const runQueries = async () => {
  console.log('Queries running.');
  await findTodos();
};
```

Next, run the `queries.js` file with the following command:

```bash
node queries.js
```

You should see something like the following in your terminal:

```plaintext
All todos: [
  {
    _id: new ObjectId('657b25adc8146427465857d7'),
    text: 'Learn React',
    isComplete: false,
    __v: 6,
    subtasks: [],
    assignee: {
      _id: new ObjectId('6581d503b8b46a5314295d66'),
      name: 'Alex',
      email: 'alex@mail.com',
      __v: 0
    }
  }
]
```

Notice how the `ObjectId` has been replaced with an actual document, now stored in the `assignee` property of our `todo`.
