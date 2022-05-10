import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import config from './config';

import taskRouter from './routes/taskRouter';
import authRouter from './routes/authRouter';


console.log('🏗️  todo-server is starting up....');

const app = express();

app.use(cors(config.cors));
app.use(cookieParser());

app.use(bodyParser.json({ limit: '25mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '25mb', extended: true }));

await mongoose.connect(config.db.baseUrl, { useNewUrlParser: true }, console.log('📂 Database Connection started'));
mongoose.connection
    .once("open", () => console.log("Database connected 😎"))
    .on("error", error => console.log(error));

app.listen(config.port, console.log(`🚀 Started listening on port: ${config.port}`));

app.use('/tasks', taskRouter);
app.use('/auth', authRouter);
