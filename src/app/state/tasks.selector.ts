import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TasksState } from './tasks.state';
import { Task } from '../models/task.model';

export const TASKS_STATE_NAME = 'tasks';
const getTasksState = createFeatureSelector<TasksState>(TASKS_STATE_NAME);

export const getTasks = createSelector(getTasksState, (state) => {
  return state.tasks;
});

export const getTaskById = createSelector(
  getTasksState,
  (state: any, props: any) => {
    return state.tasks.find(
      (task: Task) => JSON.parse(task.id) === JSON.parse(props.id)
    );
  }
);