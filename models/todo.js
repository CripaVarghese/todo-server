import mongoose from "mongoose";

const { Schema, model } = mongoose;

const TodoStructure = {
    userId: String,
    title: String,
    description: String,
    isComplete: Boolean,
    dueDate: { type: Date },
}

const TodoSchema = new Schema(TodoStructure);

const Todo =  model('todo', TodoSchema);

export default Todo;