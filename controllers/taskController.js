import * as todoService from '../services/todoService';

export const getAllTasks = async (req, res) => {
    const { userId } = req.query;
    try {
        const response = await todoService.getAllTasks(userId);
        return res.status(200).send({
            userId,
            response,
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'Failed to fetch task.'
        });
    }
}

export const getTaskById = async (req, res) => {
    const { id: taskId } = req.params;
    try {
        const response = await todoService.getTaskById(taskId);
        res.status(200).send({
            taskId,
            response,
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'Failed to fetch task.'
        });
    }
}

export const createTask = async (req, res) => {
    const { userId, task } = req.body;
    const { title, description = "", dueDate, isComplete = false } = task;
    if (!title || typeof title !== "string") {
        return res.status(400).json({
            success: false,
            message: `Failed to create task, Required parameteres missing.`
        })
    }
    const newTask = {
        userId,
        title,
        description,
        dueDate,
        isComplete
    };
    try {
        const response = await todoService.createTask(userId, newTask);
        res.status(200).send({
            userId,
            taskTitle: title,
            response,
        });
    } catch (error) {
        console.error(error);
        res.status(400).send({
            success: false,
            message: 'Failed to create task.'
        });
    }
}
export const updateTask = async (req, res) => {
    const { id: taskId } = req.params;
    const { userId, task } = req.body;
    if (taskId !== task._id) {
        throw new Error('TaskId and task object is having different id.');
    }
    try {
        const response = await todoService.updateTask(userId, task._id, task);
        res.status(200).send({
            taskId: task.id,
            response,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: 'Failed to update task.'
        });
    }
}
export const deleteTask = async (req, res) => {
    const { id: taskId } = req.params;
    const { userId } = req.body;
    try {
        const response = await todoService.deleteTask(userId, taskId);
        res.status(200).send({
            taskId: taskId,
            response,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: 'Failed to delete task.'
        });
    }
};




