<h1>
  <span class="headline">Mongoose Relationships</span>
  <span class="subhead">Removing Embedded Subdocuments</span>
</h1>

**Learning Objective:** By the end of this lesson, students will be able to remove embedded subdocuments by `id` in Mongoose.

## Removing subdocuments

Similar to adding subdocuments with the `push()` method, Mongoose provides a method for removal called `pull()`. Once a subdocument has been pulled, we must call `save()` on the parent to reflect those changes in the database.

Take a look at the example below:

```javascript
const todo = await Todo.findById(todoId);

todo.subtasks.pull(subtaskId); 
await todo.save();
```

> Note: If a non-existent `ObjectId` is provided, the `pull()` method will not throw an error. If the method is unable to locate the subdocument in the document array, the parent document simply goes unmodified.

## Implementing a Delete Operation

Let's build out a function to remove a specific `subtask`. Add the following function to `queries.js` at the bottom of the **Query Functions** section:

```javascript
const removeSubtask = async () => {
  const todoId = '657b25adc8146427465857d7';
  const subtaskId = '6580677cf30bfef697ae046f';

  const todo = await Todo.findById(todoId);
  todo.subtasks.pull(subtaskId);
  await todo.save();

  console.log('Updated document:', todo);
};
```

> 🚨 Make sure to replace `todoId` and `subtaskId` with actual `ObjectIds` from your database.

Next, call `removeSubtask` with the `runQueries` function:

```javascript
const runQueries = async () => {
  console.log('Queries running.');
  await removeSubtask();
};
```

Run the `queries.js` file with the following command:

```bash
node queries.js
```

You should see a similar output in your terminal:

```plaintext
Updated document: {
  _id: new ObjectId('657b25adc8146427465857d7'),
  text: 'Learn React',
  isComplete: false,
  __v: 2,
  subtasks: []
}
```
