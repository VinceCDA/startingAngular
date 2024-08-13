import {
  AfterContentInit,
  afterNextRender,
  afterRender,
  Component,
  ContentChild,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  Input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'control',
    '(click)': 'onClick()',
  },
})
export class ControlComponent implements AfterContentInit {
  constructor() {
    afterRender(() => {
      console.log('AFTER RENDER'); // called every changes on entire application
    });
    afterNextRender(() => {
      console.log('AFTER NEXT RENDER');
    });
  }
  ngAfterContentInit(): void {
    //
  }
  //@HostBinding('class') className = 'control';
  //@HostListener('click') onClick(){console.log('Clicked!')};
  @Input({ required: true }) label: string = '';
  @ContentChild('input') private control?: ElementRef<
    HTMLInputElement | HTMLTextAreaElement
  >;
  //private control = contentChild<ElementRef<HTMLInputElement | HTMLTextAreaElement>('input');
  private el = inject(ElementRef);

  onClick() {
    console.log('Clicked!');
    console.log(this.control);
    console.log(this.el);
  }
}
