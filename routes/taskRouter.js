import { Router as createRouter } from 'express';
import * as taskController from '../controllers/taskController';
import * as auth from '../middleware/auth';

const router = createRouter();

router.get('/',
    auth.isAuthenticated,
    taskController.getAllTasks
);

router.post('/',
    auth.isAuthenticated,
    taskController.createTask
);

router.get('/:id',
    auth.isAuthenticated,
    taskController.getTaskById);

router.patch('/:id',
    auth.isAuthenticated,
    taskController.updateTask);

router.delete('/:id',
    auth.isAuthenticated,
    taskController.deleteTask);

export default router;