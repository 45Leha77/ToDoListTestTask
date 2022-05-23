import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap, take, tap } from 'rxjs';
import { HttpService } from '../services/http.service';
import {
  addTask,
  addTaskSuccess,
  deleteTask,
  deleteTaskSuccess,
  loadTasks,
  loadTasksSuccess,
} from './tasks.actions';
import { Task } from '../models/task.model';
import { Router } from '@angular/router';

@Injectable()
export class TasksEffects {
  constructor(
    private actions$: Actions,
    private httpService: HttpService,
    private router: Router
  ) {}

  loadTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadTasks),
      mergeMap((action) => {
        return this.httpService.getTasks().pipe(
          map((tasks: Task[]) => {
            take(1)
            return loadTasksSuccess({ tasks });
          })
        );
      })
    );
  });

  addTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addTask),
      mergeMap((action) => {
        return this.httpService.addTask(action.task).pipe(
          map((data) => {
            const task = { ...action.task, id: data.name };
            return addTaskSuccess({ task });
          })
        );
      })
    );
  });

  deleteTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteTask),
      switchMap((action) => {
        return this.httpService.deleteTask(action.id).pipe(
          map((data) => {
            return deleteTaskSuccess({ id: action.id });
          })
        );
      })
    );
  });

  taskRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[deleteTaskSuccess, addTaskSuccess]),
        tap(() => {
          this.router.navigate(['/']);
        })
      );
    },
    { dispatch: false }
  );
}
