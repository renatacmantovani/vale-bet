const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  finished: Boolean,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Referência ao modelo User
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;