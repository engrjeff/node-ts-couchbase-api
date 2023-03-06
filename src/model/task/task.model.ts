import dbClient from '../../db/dbClient';
import { CreateTaskDto, Task } from './task.schema';

const collectionName = 'tasks';
const docType = 'TASK';

const getAll = async () => {
  const queryStr = `SELECT meta(t).id, t.*
                    FROM ${collectionName} t
                    WHERE t.docType = $docType`;

  const tasks = await dbClient.query<Task>(queryStr, { parameters: { docType } });

  return tasks;
};

const getById = async (id: string) => {
  return await dbClient.findOne<Task>(collectionName, id);
};

const insert = async (taskData: CreateTaskDto) => {
  const newTask = await dbClient.insert(collectionName, taskData);
  return newTask;
};

const update = async () => {
  return 'updateed';
};

const remove = async () => {
  return 'remove';
};

const TaskModel = {
  getAll,
  getById,
  insert,
  update,
  remove,
};

export default TaskModel;
