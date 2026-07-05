const Workspace = require('../models/Workspace');

const getWorkspaces = async (req, res) => {
  try {
    const workspaces = await Workspace.find({ user: req.userId });
    res.json(workspaces.map(w => ({ ...w, owner: { name: 'User', email: 'user@example.com' }})));
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getWorkspace = async (req, res) => {
  try {
    const workspace = await Workspace.findById(req.params.id);
    if (!workspace) {
      return res.status(404).json({ message: 'Workspace not found' });
    }
    res.json({ ...workspace, owner: { name: 'User', email: 'user@example.com' } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createWorkspace = async (req, res) => {
  try {
    const { name, description, type } = req.body;

    if (!name || !type) {
      return res.status(400).json({ message: 'Please provide name and type' });
    }

    const workspace = await Workspace.create({
      name,
      description,
      type,
      owner: req.userId || '1',
      user: req.userId || '1',
      members: [req.userId || '1']
    });

    res.status(201).json({ ...workspace, owner: { name: 'User', email: 'user@example.com' } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateWorkspace = async (req, res) => {
  try {
    const workspace = await Workspace.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!workspace) {
      return res.status(404).json({ message: 'Workspace not found' });
    }

    res.json(workspace);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteWorkspace = async (req, res) => {
  try {
    const workspace = await Workspace.findByIdAndDelete(req.params.id);
    if (!workspace) {
      return res.status(404).json({ message: 'Workspace not found' });
    }
    res.json({ message: 'Workspace deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const joinWorkspace = async (req, res) => {
  try {
    const workspace = await Workspace.findById(req.params.id);
    if (!workspace) {
      return res.status(404).json({ message: 'Workspace not found' });
    }
    workspace.members = workspace.members || [];
    if (!workspace.members.includes(req.userId)) {
      workspace.members.push(req.userId);
    }
    res.json(workspace);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getWorkspaces,
  getWorkspace,
  createWorkspace,
  updateWorkspace,
  deleteWorkspace,
  joinWorkspace
};