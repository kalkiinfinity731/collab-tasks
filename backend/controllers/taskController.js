const Task = require('../models/Task');

const populateUser = (task) => {
  if (task && task.assignee && typeof task.assignee === 'string') {
    return { ...task, assignee: { name: 'User', email: 'user@example.com', _id: task.assignee } };
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
    const { title, description, priority, status, dueDate, startDate, endDate, coordinator } = req.body;

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

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
};