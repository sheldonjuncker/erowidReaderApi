import { TagSource } from './TagSource';
import { TagCategory } from './TagCategory';
import { TagPos } from './TagPos';

export type Tag = {
  id: string;
  name: string;
  lemma: string;
  originalWord?: string;
  source: TagSource;
  pos?: TagPos;
  category: TagCategory;
  salience: number;
  metadata?: string;
  sentiment?: number;
  count: number;
};
