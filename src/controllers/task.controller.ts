import { RequestHandler } from 'express';

import TaskModel from '../model/task/task.model';

const getTaskList: RequestHandler = async (req, res, next) => {
  try {
    const tasks = await TaskModel.getAll();

    res.status(200).json({
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

const createTask: RequestHandler = async (req, res, next) => {
  try {
    const newTask = await TaskModel.insert(req.body);

    res.status(201).json({
      data: newTask,
    });
  } catch (error) {
    next(error);
  }
};

const taskController = {
  getTaskList,
  createTask,
};

export default taskController;
