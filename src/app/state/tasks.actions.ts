import { createAction, props } from '@ngrx/store';
import { Task } from '../models/task.model';

export const LOAD_TASKS = '[Tasks] load tasks';
export const LOAD_TASKS_SUCCESS = '[Tasks] load tasks success';
export const OPEN_TASK = '[Tasks] open task';
export const DELETE_TASK = '[Tasks] delete task';
export const DELETE_TASK_SUCCESS = '[Tasks] delete task success';
export const ADD_TASK = '[Tasks] add task';
export const ADD_TASK_SUCCESS = '[Tasks] add task success';

export const loadTasks = createAction(LOAD_TASKS);
export const loadTasksSuccess = createAction(
  LOAD_TASKS_SUCCESS,
  props<{ tasks: Task[] }>()
);
export const deleteTask = createAction(DELETE_TASK, props<{ id: string }>());
export const deleteTaskSuccess = createAction(
  DELETE_TASK_SUCCESS,
  props<{ id: string }>()
);

export const addTask = createAction(ADD_TASK, props<{ task: Task }>());
export const addTaskSuccess = createAction(
  ADD_TASK_SUCCESS,
  props<{ task: Task }>()
);