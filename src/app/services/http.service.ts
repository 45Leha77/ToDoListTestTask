import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http
      .get<Task[]>(env.TASKS_URL)
      .pipe(
        map((data) => {
          const tasks: Task[] = [];
          for (let key in data) {
            if (tasks.length < 20) {
              tasks.push({ ...data[key] });
            }
          }
          return tasks;
        })
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      return throwError(() => new Error('Not found'));
    }
    return throwError(() => new Error('Error happend'));
  }
}
