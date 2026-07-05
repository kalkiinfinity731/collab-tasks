const Task = require('../models/Task');

const populateUser = (task) => {
  if (task && task.assignee && typeof task.assignee === 'string') {
    return { ...task, assignee: { name: task.assignee, email: '', _id: task.assignee } };
  }
  return task;
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.userId || req.query.user });
    res.json(tasks.map(populateUser));
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(populateUser(task));
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, priority, status, dueDate, startDate, endDate, coordinator, recurring, reminder } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Please provide title' });
    }

    const task = await Task.create({
      title,
      description,
      priority,
      status: status || 'todo',
      dueDate,
      startDate,
      endDate,
      coordinator,
      recurring: recurring || 'none',
      reminder,
      user: req.userId || req.body.user || '1',
      assignee: req.userId || req.body.user || '1'
    });

    res.status(201).json(populateUser(task));
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(populateUser(task));
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const addSubtask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    const { title } = req.body;
    task.subtasks = task.subtasks || [];
    task.subtasks.push({ title, completed: false });
    await task.save();
    res.json(populateUser(task));
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const toggleSubtask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    const subtask = (task.subtasks || [])[req.params.subtaskIndex];
    if (!subtask) return res.status(404).json({ message: 'Subtask not found' });
    subtask.completed = !subtask.completed;
    await task.save();
    res.json(populateUser(task));
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const removeSubtask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    task.subtasks = (task.subtasks || []).filter((_, i) => i != req.params.subtaskIndex);
    await task.save();
    res.json(populateUser(task));
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const addAttachment = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    const { name, url } = req.body;
    task.attachments = task.attachments || [];
    task.attachments.push({ name, url });
    await task.save();
    res.json(populateUser(task));
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const removeAttachment = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    task.attachments = (task.attachments || []).filter((_, i) => i != req.params.attachmentIndex);
    await task.save();
    res.json(populateUser(task));
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const addComment = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    const { text } = req.body;
    task.comments = task.comments || [];
    task.comments.push({ author: req.user?.name || 'User', text, createdAt: new Date() });
    await task.save();
    res.json(populateUser(task));
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const addTimeEntry = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    const { startTime, endTime, duration } = req.body;
    task.timeEntries = task.timeEntries || [];
    task.timeEntries.push({ startTime, endTime, duration });
    task.totalTimeSpent = (task.totalTimeSpent || 0) + (duration || 0);
    await task.save();
    res.json(populateUser(task));
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  addSubtask,
  toggleSubtask,
  removeSubtask,
  addAttachment,
  removeAttachment,
  addComment,
  addTimeEntry
};