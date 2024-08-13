import { Directive, ElementRef, input } from '@angular/core';

@Directive({
  selector: 'a[appSafeLink]',
  standalone: true, //set to false if working with module structure
  host: { '(click)': 'onConfirmLeavePage($event)' },
})
export class SafeLinkDirective {
  private hostElementRef: ElementRef<HTMLAnchorElement>;

  queryParam = input('myapp', { alias: 'appSafeLink' });

  constructor(hostElementRef: ElementRef<HTMLAnchorElement>) {
    this.hostElementRef = hostElementRef;
    console.log('SafeLink directicve is working');
  }

  onConfirmLeavePage(event: MouseEvent) {
    const wantsToLeave = window.confirm('Do you want to leave the app?');
    if (wantsToLeave) {
      this.hostElementRef.nativeElement.href += `?from=${this.queryParam()}`;
      return;
    }

    event?.preventDefault();
  }
}
