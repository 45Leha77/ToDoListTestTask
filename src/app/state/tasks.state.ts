import { Task } from '../models/task.model';

export interface TasksState {
  tasks: Task[];
}

export const initialState: TasksState = {
  tasks: [],
};