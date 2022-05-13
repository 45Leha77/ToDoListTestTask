import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Task } from 'src/app/models/task.model';
import { AppState } from 'src/app/store/app.state';
import { getTaskById } from 'src/app/state/tasks.selector';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { deleteTask } from 'src/app/state/tasks.actions';

@Component({
  selector: 'app-tasks-card',
  templateUrl: './tasks-card.component.html',
  styleUrls: ['./tasks-card.component.scss'],
})
export class TasksCardComponent implements OnInit {
  task!: Task;
  taskSubscription$!: Subscription;
  faClose = faClose;
  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.taskSubscription$ = this.store
        .select(getTaskById, { id })
        .subscribe((data) => {
          this.task = data;
        });
    });
  }
  ngOnDestroy(): void {
    if (this.taskSubscription$) {
      this.taskSubscription$.unsubscribe();
    }
  }

  onDelete(id: string) {
    this.store.dispatch(deleteTask({ id }));
    this.router.navigate(['/']);
  }
}
