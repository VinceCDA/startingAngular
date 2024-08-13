import { Component, computed, DestroyRef, inject, input } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';
import { ActivatedRoute, ResolveFn, RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent {
  teste = input('');
  userId = input.required<string>();
  order?: 'asc' | 'desc';
  test() {}
  private tasksService = inject(TasksService);
  userTasks = computed(() => {
    console.log(this.order);
    return this.tasksService
      .allTasks()
      .filter((x) => x.userId === this.userId())
      .sort((a, b) => {
        if (this.order === 'desc') {
          return a.id > b.id ? -1 : 1;
        } else {
          return a.id > b.id ? 1 : -1;
        }
      });
  });
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  ngOnInit() {
    const sub = this.activatedRoute.queryParams.subscribe({
      next: (params) => (this.order = params['order']),
    });
    this.destroyRef.onDestroy(() => sub.unsubscribe());
  }
}
export const resolveUserTasks: ResolveFn<Task[]> = (
  activatedRouteSnapshot,
  routerState
) => {
  const order = activatedRouteSnapshot.queryParams['order'];
  const tasksService = inject(TasksService);
  const tasks = tasksService
    .allTasks()
    .filter(
      (task) => task.userId === activatedRouteSnapshot.paramMap.get('userId')
    );

  if (order && order === 'asc') {
    tasks.sort((a, b) => (a.id > b.id ? 1 : -1));
  } else {
    tasks.sort((a, b) => (a.id > b.id ? -1 : 1));
  }

  return tasks.length ? tasks : [];
};
