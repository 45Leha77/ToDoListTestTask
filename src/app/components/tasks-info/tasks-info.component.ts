import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { loadTasks } from 'src/app/state/tasks.actions';
import { AppState } from 'src/app/store/app.state';
import { getTasks } from 'src/app/state/tasks.selector';

@Component({
  selector: 'app-tasks-info',
  templateUrl: './tasks-info.component.html',
  styleUrls: ['./tasks-info.component.scss'],
})
export class TasksInfoComponent implements OnInit, OnDestroy {
  constructor(private store: Store<AppState>) {}

  tasks$!: Subscription;

  tasksInfo = {
    completed: 0,
    incompleted: 0,
    total: 0,
  };

  ngOnInit(): void {
    this.store.dispatch(loadTasks());
    this.tasks$ = this.store.select(getTasks).subscribe((tasks) => {
      this.tasksInfo.completed = tasks.filter(
        (task) => task.completed === true
      ).length;
      this.tasksInfo.incompleted = tasks.filter(
        (task) => task.completed === false
      ).length;
      this.tasksInfo.total = tasks.length;
    });
  }

  ngOnDestroy(): void {
    this.tasks$.unsubscribe();
  }
}
