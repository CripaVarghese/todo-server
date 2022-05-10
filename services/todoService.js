import Todo from "../models/todo";

export const getAllTasks = async (userId) => {
    return Todo.find({ userId });
}

export const getTaskById = async (taskId) => {
    return Todo.findOne(taskId);
}

export const createTask = async (userId, taskData) => {
    const { title, isComplete } = taskData;
    const newTodo = {
        userId,
        title,
        isComplete,
        description: "",
        dueDate: null
    }
    const todoItem = new Todo(newTodo);
    return todoItem.save();
}

export const updateTask = async (userId, taskId, task) => {
    const editTodo = {
        userId,
        title: task.title,
        isComplete: task.isComplete,
        description: task.description,
        dueDate: task.dueDate
    };
    return Todo.updateOne({ _id: taskId }, { ...editTodo });
}
export const deleteTask = async (userId, taskId) => {
    return Todo.deleteOne({ _id: taskId, userId });
}

// POST
// {
//     "userId" : "4",
//         "task": {
//                  "title" : "walking",
//                  "isComplete": false,
//                  "description": "",
//                  "dueDate": null
//          }    
// }



// username":"ok",
// "email":"ok",
// "password":"kkkkkk"