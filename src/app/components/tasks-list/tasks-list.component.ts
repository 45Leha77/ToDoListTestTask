import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { getTasks } from 'src/app/state/tasks.selector';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
})
export class TasksListComponent implements OnInit {
  constructor(private store: Store<AppState>) {}
  tasks$!: Observable<Task[]>;
  ngOnInit(): void {
    this.tasks$ = this.store.select(getTasks);
  }
}