<h1>
  <span class="headline">Mongoose Relationships</span>
  <span class="subhead">Updating Embedded Subdocuments</span>
</h1>

**Learning Objective:** By the end of this lesson, students will be able to update embedded subdocuments by `id` in Mongoose.

## Updating subdocuments

There are a few approaches to updating subdocuments in Mongoose. The most straightforward approach involves the following steps:

1. Find the parent document.
2. Locate the desired subdocument within the parent.
3. Modify the properties of the subdocument.
4. Save the parent document to apply the changes.

Here's an example of this process in action:

```javascript
// Find the parent:
const todo = await Todo.findById(todoId);

// Locate the subdocument within the parent:
const subtask = todo.subtasks.id(subtaskId);

// Update the subdocument by marking it complete
subtask.isComplete = true;

// Save the parent document to persist changes:
await todo.save();
```

In the code snippet above, we modify the `isComplete` property of a subdocument like we would a typical JavaScript object. After updating the subdocument, calling `save()` on the parent ensures the changes are reflected in the database.

## Implementing an update

To demonstrate the process in more detail, let's create a function to update a subdocument.

Add the following function to `queries.js` at the bottom of the **Query Functions** section:

```javascript
const updateSubtask = async () => {
  const todoId = '657b25adc8146427465857d7';
  const subtaskId = '6580677cf30bfef697ae046f';

  const todo = await Todo.findById(todoId);
  const subtask = todo.subtasks.id(subtaskId);

  subtask.isComplete = true;
  await todo.save();

  console.log('Updated document:', todo);
};
```

> 🚨 Make sure to replace `todoId` and `subtaskId` with actual `ObjectIds` from your database.

Next, call `updateSubtask` with the `runQueries` function:

```javascript
const runQueries = async () => {
  console.log('Queries running.');
  await updateSubtask();
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
  __v: 1,
  subtasks: [
    {
      text: 'Learn how props work',
      isComplete: true,
      _id: new ObjectId('6580677cf30bfef697ae046f')
    }
  ]
}
```
