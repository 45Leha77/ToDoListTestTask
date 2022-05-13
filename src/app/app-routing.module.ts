import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { TasksCardComponent } from './components/tasks-card/tasks-card.component';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';

const routes: Routes = [
  {
    path: '',
    component: TasksListComponent,
    children: [
      {
        path: 'add',
        component: AddTaskComponent,
      },
      {
        path: 'card/:id',
        component: TasksCardComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}