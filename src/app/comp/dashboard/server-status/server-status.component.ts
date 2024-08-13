import {
  Component,
  DestroyRef,
  effect,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-server-staus',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css',
})
export class ServerStatusComponent implements OnInit {
  currentStatus = signal<'online' | 'offline' | 'unknown'>('online');
  //private interval?: ReturnType<typeof setInterval>;
  private destroyRef = inject(DestroyRef);

  constructor() {
    effect(() => {
      console.log(this.currentStatus());
    });
    //effect((onCleanup) => {
    // clean before the next effect
    //const tasks = getTasks();
    //const timer = setTimeout(() => {
    //console.log(`Current number of tasks: ${tasks().length}`);
    //}, 1000);
    //onCleanup(() => {
    //  clearTimeout(timer);
    //});
    //});
  }
  ngOnDestroy(): void {}

  ngOnInit() {
    const interval = setInterval(() => {
      const rnd = Math.random(); //0-0.999999
      if (rnd < 0.5) {
        this.currentStatus.set('online');
      } else if (rnd < 0.9) {
        this.currentStatus.set('offline');
      } else {
        this.currentStatus.set('unknown');
      }
    }, 5000);
    this.destroyRef.onDestroy(() => {
      clearInterval(interval);
    });
  }
}
