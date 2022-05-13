import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import { HttpService } from '../services/http.service';
import { loadTasks, loadTasksSuccess } from './tasks.actions';
import { Task } from '../models/task.model';

@Injectable()
export class TasksEffects {
  constructor(private actions$: Actions, private httpService: HttpService) {}

  loadTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadTasks),
      mergeMap((action) => {
        return this.httpService.getTasks().pipe(
          map((tasks: Task[]) => {
            return loadTasksSuccess({ tasks });
          })
        );
      })
    );
  });
}