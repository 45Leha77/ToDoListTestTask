import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TasksInfoComponent } from './components/tasks-info/tasks-info.component';
import { AppReducer } from './store/app.state';
import { TasksEffects } from './state/tasks.effects';
import { HttpService } from './services/http.service';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { TasksCardComponent } from './components/tasks-card/tasks-card.component';
import { AddTaskComponent } from './components/add-task/add-task.component';

@NgModule({
  declarations: [
    AppComponent,
    TasksInfoComponent,
    TasksListComponent,
    TasksCardComponent,
    AddTaskComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,

    RouterModule,
    FormsModule,
    ReactiveFormsModule,

    StoreModule.forRoot(AppReducer),
    EffectsModule.forRoot([TasksEffects]),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production,
    }),
    BrowserAnimationsModule,
  ],
  providers: [HttpService],
  bootstrap: [AppComponent],
})
export class AppModule {}