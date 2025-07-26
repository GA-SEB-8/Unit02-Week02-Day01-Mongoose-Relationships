<h1>
  <span class="headline">Mongoose Relationships</span>
  <span class="subhead">Locating Embedded Subdocuments</span>
</h1>

**Learning Objective:** By the end of this lesson, students will be able to retrieve embedded subdocuments using an `id` in Mongoose.

## The challenge with embedded documents

While embedding documents in Mongoose has many advantages, it introduces complexity when modifying embedded subdocuments. This is because subdocuments are not compiled into models and therefore lack model methods.

In order to perform database operations on a subdocument, developers must interact with the parent document in which the subdocument is held.

## Finding a subdocument in a document array

Before modifying or removing a subdocument, you first have to find it within the parent document. Mongoose's subdocument arrays have an `id()` method that allows you to find a specific subdocument by its `_id`.

Take a look at this example of the `id()` method using a `todo` and its `subtasks`:

```javascript
const subtask = todo.subtasks.id(subtaskId);
```

Once you have retrieved the specific subdocument, you can perform various operations on it. To save changes, we'll always need to call `save()` on the parent, as the subdocument does not exist in its own collection.

> 🚨 The `id()` method on a document array is different from the `_id` property of a document. Every subdocument still has its own unique `_id`.

## Implementing the `id()` method

Let's create a function to demonstrate finding a subdocument in an array. Add the following to `queries.js` at the bottom of the **Query Functions** section:

```javascript
const findSubtask = async () => {
  // Replace 657b25adc8146427465857d7 with an existing Todo ID
  const todoId = '657b25adc8146427465857d7';
  // Replace 6580677cf30bfef697ae046f with an existing Subtask ID
  const subtaskId = '6580677cf30bfef697ae046f'; 

  const todo = await Todo.findById(todoId);
  const subtask = todo.subtasks.id(subtaskId);

  console.log('Subdocument:', subtask);
};
```

> 🚨 Make sure that you replace `todoId` and `subtaskId` with actual `ObjectIds` from your database.

Next, call upon `findSubtask` within the `runQueries` function:

```javascript
const runQueries = async () => {
  console.log('Queries running.');
  await findSubtask();
};
```

Run the `queries.js` file with the following command:

```bash
node queries.js
```

You should see a similar output in your terminal:

```plaintext
Subdocument: {
  text: 'Learn how props work',
  isComplete: false,
  _id: new ObjectId('6580677cf30bfef697ae046f')
}
```
