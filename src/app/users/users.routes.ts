import { Routes } from '@angular/router';
import { resolveUserTasks, TasksComponent } from '../tasks/tasks.component';
import {
  canLeaveEditPage,
  NewTaskComponent,
} from '../tasks/new-task/new-task.component';
import { TasksService } from '../tasks/tasks.service';

export const routes: Routes = [
  {
    path: '',
    providers: [TasksService],
    children: [
      {
        path: '', //<your-domain>/users/<uid>/tasks
        redirectTo: 'tasks',
        pathMatch: 'prefix',
      },
      {
        path: 'tasks', //<your-domain>/users/<uid>/tasks
        component: TasksComponent,
        runGuardsAndResolvers: 'always',
        resolve: {
          userTasks: resolveUserTasks,
        },
      },
      {
        path: 'tasks/new', //<your-domain>/users/<uid>/tasks
        component: NewTaskComponent,
        canDeactivate: [canLeaveEditPage],
      },
    ],
  },
];
