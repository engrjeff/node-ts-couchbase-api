import { z } from 'zod';
import { validate } from '../../utils/validation';
import { MetaProperties } from '../types';

// export interface Task extends MetaProperties {
//   title: string;
//   description: string;
//   status: 'To Do' | 'In Progress' | 'Done';
// }

export const TaskStatus = ['To Do', 'In Progress', 'Done'] as const;

export const TaskSchema = z.object({
  title: z
    .string({
      required_error: 'Title is required',
    })
    .trim()
    .min(1, 'Title cannot be empty'),
  description: z
    .string({
      required_error: 'Description is required',
    })
    .trim()
    .min(1, 'Description cannot be empty'),
  status: z.enum(TaskStatus),
});

const TaskWithMetaProps = TaskSchema.merge(MetaProperties);

export type Task = z.infer<typeof TaskWithMetaProps>;

// DTO - Data transfer onject
export type CreateTaskDto = z.infer<typeof TaskSchema>;

export const PartialTaskSchema = TaskSchema.partial();

export type UpdateTaskDto = z.infer<typeof PartialTaskSchema>;

export const validateTaskCreate = validate(TaskSchema);

export const validateTaskUpdate = validate(PartialTaskSchema);
