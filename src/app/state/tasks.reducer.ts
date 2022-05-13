import { Action, createReducer, on } from '@ngrx/store';
import { Task } from '../models/task.model';
import { addTask, deleteTask, loadTasksSuccess } from './tasks.actions';
import { initialState, TasksState } from './tasks.state';

const _tasksReducer = createReducer(
  initialState,
  on(loadTasksSuccess, (state, action) => {
    return {
      ...state,
      tasks: action.tasks,
    };
  }),
  on(deleteTask, (state, { id }) => {
    const updatedTasks = state.tasks.filter((task) => {
      return task.id !== id;
    });
    return {
      ...state,
      tasks: updatedTasks,
    };
  }),
  on(addTask, (state, action) => {
    const addedTask: Task = {
      userId: action.userId,
      title: action.title,
      id: String(state.tasks.length + 1),
      completed: false,
    };
    return {
      tasks: [...state.tasks, addedTask],
    };
  })
);

export function tasksReducer(state: TasksState | undefined, action: Action) {
  return _tasksReducer(state, action);
}