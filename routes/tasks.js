const express = require('express');
const { 
    getAllTasks, 
    postTask, 
    getSpecificTask, 
    updateTask, 
    deleteTask 
} = require('../controllers/tasks');

const router = express.Router();

router.route('/').get(getAllTasks).post(postTask);

router.route('/:id').get(getSpecificTask).patch(updateTask).delete(deleteTask);

module.exports = router;

