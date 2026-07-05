const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
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
} = require('../controllers/taskController');

router.get('/', auth, getTasks);
router.get('/:id', auth, getTask);
router.post('/', auth, createTask);
router.put('/:id', auth, updateTask);
router.delete('/:id', auth, deleteTask);
router.post('/:id/subtasks', auth, addSubtask);
router.patch('/:id/subtasks/:subtaskIndex', auth, toggleSubtask);
router.delete('/:id/subtasks/:subtaskIndex', auth, removeSubtask);
router.post('/:id/attachments', auth, addAttachment);
router.delete('/:id/attachments/:attachmentIndex', auth, removeAttachment);
router.post('/:id/comments', auth, addComment);
router.post('/:id/time-entries', auth, addTimeEntry);

module.exports = router;