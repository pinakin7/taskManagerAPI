const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../Errors/custom-error');


const getAllTasks = asyncWrapper ( async (req,res)=>{
    
    const tasks = await Task.find({});
    res.status(201).json({tasks:tasks})
        
});

const postTask = asyncWrapper( async (req,res)=>{

    const task = await Task.create(req.body);
    res.status(201).json({task});
    
});

const getSpecificTask = asyncWrapper( async (req,res)=>{
    
    const task = await Task.findById(req.params.id);
    if(task === null){
        return next(createCustomError(`No such task with id: ${req.params.id} exists`,404))
        res.status(404).send(`No such task with id: ${req.params.id} exists`);
    }
    else{
        res.status(201).json({task});
    }
    
});

const updateTask = asyncWrapper( async (req,res,next)=>{
    
    const task = await Task.findByIdAndUpdate(req.params.id,req.body);
    if(task===null){
        return next(createCustomError(`No such task with id: ${req.params.id} exists`,404))
        res.status(404).send(`No such task with id: ${req.params.id} exists`);
    }
    else{
        res.status(201).send(`Successfully updated task with id: ${req.params.id}`);
    }

});

const deleteTask = asyncWrapper( async (req,res)=>{
    
    const task = await Task.findByIdAndDelete(req.params.id);
    if(task === null){
        return next(createCustomError(`No such task with id: ${req.params.id} exists`,404))
        res.status(404).send(`No such task with id: ${req.params.id} exists`);
    }
    else{
        res.status(201).send(`Successfully deleted task with id: ${req.params.id} `);
    }
    
});

module.exports = {getAllTasks, postTask, getSpecificTask, updateTask,deleteTask};


// app.get('/api/v1/tasks',(req,res)=>{
//     res.send(' Get All Tasks ');
// });

// app.post('/api/v1/tasks',(req,res)=>{
//     res.send(' Create new task ');
// });

// app.get('/api/v1/tasks/:id',(req,res)=>{
//     res.send(' View specific task ');
// });

// app.patch('/api/v1/tasks/:id',(req,res)=>{
//     res.send(' Update specific task ');
// });

// app.delete('/api/v1/tasks/:id', (req,res)=>{
//     res.send(' Delete specific task ');
// });