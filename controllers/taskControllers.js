import fs from 'fs';
 
const tasks = JSON.parse(fs.readFileSync('./data.json')); 



const getAllTasks = (req, res) => {
    res.json({
        status: 'success',
        results: tasks.length,
        data: {
            tasks
        }
    })
}

const getTask = (req, res) => {
    const paramsId = req.params.id
     const task = tasks.find(task => task.id === Number(paramsId))


    if (!task) {
        return res.status(404).json(
            {
                status: 'fail',
                message: 'Bad request: Invalid ID'
            }
        )
    }
    
     
    res.status(200).json({
        status: 'success',
        data: {
            task
        }
    })
}

const createTask = (req, res) => {
     const newTasksId =
  tasks.length === 0
    ? 1
    : Number(tasks[tasks.length - 1].id) + 1;
    const newTask = Object.assign({id: newTasksId}, req.body )

    tasks.push(newTask)
    fs.writeFile('./data.json', JSON.stringify(tasks), (err) => {
    if (err) {
        return res.status(500).json({
            status: 'fail',
            message: 'Could not create task'
        });
    }

    res.status(201).json({
        status: 'success',
        data: {
            task: newTask
        }
    });
});
}

 

const updateTask = (req, res) => {
    const paramsId = req.params.id
     const task = tasks.find(task => task.id === Number(paramsId))

    if (!task) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.status = req.body.status || task.status;
    task.dueDate = req.body.dueDate || task.dueDate;

    fs.writeFile('./data.json', JSON.stringify(tasks), (err) => {
    if (err) {
        return res.status(500).json({
            status: 'fail',
            message: 'Could not update task'
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            task
        }
    });
});
}

const deleteTask = (req, res) => {
     const paramsId = Number(req.params.id);

    const taskIndex = tasks.findIndex(task => task.id === paramsId);

    if (taskIndex === -1) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }

    const deletedTask = tasks.splice(taskIndex, 1);

    fs.writeFile('./data.json', JSON.stringify(tasks), (err) => {
        if (err) {
            return res.status(500).json({
                status: 'fail',
                message: 'Could not delete task'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                task: deletedTask[0]
            }
        });
    });
}



export {getAllTasks, getTask, createTask, updateTask, deleteTask}
