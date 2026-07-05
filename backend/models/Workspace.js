const mongoose = require('mongoose');

let Workspace;
if (!process.env.SKIP_MONGODB) {
  const workspaceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, default: '' },
    type: { type: String, enum: ['personal', 'team', 'project'], default: 'personal' },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now }
  });
  Workspace = mongoose.model('Workspace', workspaceSchema);
} else {
  let workspaces = [];
  let nextId = 1;
  Workspace = {
    find: (query = {}) => Promise.resolve(workspaces.filter(w => !query.user || w.user == query.user)),
    findById: (id) => Promise.resolve(workspaces.find(w => w._id == id) || null),
    create: (data) => { const workspace = { _id: String(nextId++), ...data, createdAt: new Date() }; workspaces.push(workspace); return Promise.resolve(workspace); },
    findByIdAndUpdate: (id, data, opts) => { const idx = workspaces.findIndex(w => w._id == id); if (idx === -1) return Promise.resolve(null); workspaces[idx] = { ...workspaces[idx], ...data }; return Promise.resolve(workspaces[idx]); },
    findByIdAndDelete: (id) => { const idx = workspaces.findIndex(w => w._id == id); if (idx === -1) return Promise.resolve(null); return Promise.resolve(workspaces.splice(idx, 1)[0]); }
  };
}

module.exports = Workspace;