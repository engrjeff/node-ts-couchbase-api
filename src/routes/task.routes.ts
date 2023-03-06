import { Router } from 'express';

import taskController from '../controllers/task.controller';
import { validateTaskCreate } from '../model/task/task.schema';

const router = Router();

router
  .route('/')
  .get(taskController.getTaskList)
  .post(validateTaskCreate, taskController.createTask);

export default router;
