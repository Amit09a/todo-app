const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.createTask = async (req, res) => {
  try {
    const task = new Task({
      title: req.body.title,
      user: req.user._id
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: 'Invalid Data' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { done: req.body.done },
      { new: true }
    );
    if (!task) return res.status(404).json({ error: 'Not found or unauthorized' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });
    if (!task) return res.status(404).json({ error: 'Not found or unauthorized' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.rateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { rating: req.body.rating },
      { new: true }
    );
    if (!task) return res.status(404).json({ error: 'Not found or unauthorized' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};
// /api/tasks/stats
exports.getTaskStats = async (req, res) => {
  try {
    const stats = await Task.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: null,
          totalTasks: { $sum: 1 },
          completedTasks: {
            $sum: { $cond: ['$done', 1, 0] }
          },
          averageRating: { $avg: '$rating' }
        }
      },
      {
        $project: {
          _id: 0,
          totalTasks: 1,
          completedTasks: 1,
          averageRating: {
            $round: ['$averageRating', 1]
          }
        }
      }
    ]);

    res.json(stats[0] || {
      totalTasks: 0,
      completedTasks: 0,
      averageRating: 0
    });
  } catch (err) {
    console.error('Aggregation error:', err);
    res.status(500).json({ error: 'Server Error' });
  }
};
