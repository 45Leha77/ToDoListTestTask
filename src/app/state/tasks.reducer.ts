import { Action, createReducer, on } from '@ngrx/store';
import { Task } from '../models/task.model';
import {
  addTaskSuccess,
  deleteTaskSuccess,
  loadTasksSuccess,
} from './tasks.actions';
import { initialState, TasksState } from './tasks.state';

const _tasksReducer = createReducer(
  initialState,
  on(loadTasksSuccess, (state, action) => {
    return {
      ...state,
      tasks: action.tasks,
    };
  }),
  on(deleteTaskSuccess, (state, { id }) => {
    const updatedTasks = state.tasks.filter((task) => {
      return task.id !== id;
    });
    return {
      ...state,
      tasks: updatedTasks,
    };
  }),
  on(addTaskSuccess, (state, action) => {
    const addedTask: Task = {
      ...action.task,
    };
    return {
      ...state,
      tasks: [...state.tasks, addedTask],
    };
  })
);

export function tasksReducer(state: TasksState | undefined, action: Action) {
  return _tasksReducer(state, action);
}
