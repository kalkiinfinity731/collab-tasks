const mongoose = require('mongoose');

let Task;
if (!process.env.SKIP_MONGODB) {
  const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, default: '' },
    status: { type: String, enum: ['todo', 'in_progress', 'under_review', 'completed'], default: 'todo' },
    priority: { type: String, enum: ['low', 'medium', 'high', 'urgent'], default: 'medium' },
    assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    dueDate: { type: Date },
    startDate: { type: Date },
    endDate: { type: Date },
    coordinator: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  taskSchema.pre('save', function(next) { this.updatedAt = Date.now(); next(); });
  Task = mongoose.model('Task', taskSchema);
} else {
  let tasks = [];
  let nextId = 1;
  Task = {
    find: (query = {}) => Promise.resolve(tasks.filter(t => !query.user || t.user == query.user).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))),
    findById: (id) => Promise.resolve(tasks.find(t => t._id == id) || null),
    create: (data) => { const task = { _id: String(nextId++), ...data, createdAt: new Date(), updatedAt: new Date() }; tasks.push(task); return Promise.resolve(task); },
    findByIdAndUpdate: (id, data) => { const idx = tasks.findIndex(t => t._id == id); if (idx === -1) return Promise.resolve(null); tasks[idx] = { ...tasks[idx], ...data, updatedAt: new Date() }; return Promise.resolve(tasks[idx]); },
    findByIdAndDelete: (id) => { const idx = tasks.findIndex(t => t._id == id); if (idx === -1) return Promise.resolve(null); return Promise.resolve(tasks.splice(idx, 1)[0]); }
  };
}

module.exports = Task;