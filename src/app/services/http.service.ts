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
            tasks.push({ ...data[key], id: key });
          }
          return tasks;
        })
      )
      .pipe(catchError(this.handleError));
  }

  addTask(task: Task): Observable<{ name: string }> {
    return this.http
      .post<{ name: string }>(env.TASKS_URL, task)
      .pipe(catchError(this.handleError));
  }

  deleteTask(id: string) {
    return this.http
      .delete(
        `https://todolist-fc717-default-rtdb.europe-west1.firebasedatabase.app//todos/${id}.json`
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
