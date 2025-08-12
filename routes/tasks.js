const express = require('express');
const router = express.Router();
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  rateTask,
  getTaskStats
} = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

//  Protect all routes
router.use(authMiddleware);

// Use controller methods instead of inline logic
router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.post('/:id/rate', rateTask);
router.get('/stats', getTaskStats);


module.exports = router;
