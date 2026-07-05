const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getWorkspaces,
  getWorkspace,
  createWorkspace,
  updateWorkspace,
  deleteWorkspace,
  joinWorkspace
} = require('../controllers/workspaceController');

router.get('/', auth, getWorkspaces);
router.get('/:id', auth, getWorkspace);
router.post('/', auth, createWorkspace);
router.put('/:id', auth, updateWorkspace);
router.delete('/:id', auth, deleteWorkspace);
router.post('/:id/join', auth, joinWorkspace);

module.exports = router;