import { z } from 'zod';

export const MetaProperties = z.object({
  id: z.string(),
  docType: z.string(),
  isDeleted: z.boolean().default(false),
  isActive: z.boolean().default(true),
  createdBy: z.string(),
  updatedBy: z.string().optional(),
  deletedBy: z.string().optional(),
  dateCreated: z.string(),
  dateUpdated: z.string(),
});
