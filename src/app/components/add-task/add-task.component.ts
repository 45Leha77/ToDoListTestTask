import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addTask } from 'src/app/state/tasks.actions';
import { faClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  addForm!: FormGroup;
  faClose = faClose;
  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.addForm = new FormGroup({
      userId: new FormControl(null, [Validators.required, Validators.min(1)]),
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  onFormSubmit() {
    if (!this.addForm.valid) {
      return;
    }
    const task = this.addForm.value;
    this.store.dispatch(addTask(task));
    this.router.navigate(['/']);
  }
}
