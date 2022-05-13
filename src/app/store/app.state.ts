import { tasksReducer } from '../state/tasks.reducer';
import { TasksState } from '../state/tasks.state';

export interface AppState {
  tasks: TasksState;
}

export const AppReducer = {
  tasks: tasksReducer,
};