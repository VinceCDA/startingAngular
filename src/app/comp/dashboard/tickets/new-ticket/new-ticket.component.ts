import {
  AfterViewInit,
  Component,
  EventEmitter,
  output,
  Output,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonComponent } from '../../../shared/button/button.component';
import { ControlComponent } from '../../../shared/control/control.component';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ButtonComponent, ControlComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css',
})
export class NewTicketComponent implements AfterViewInit {
  //@Output() add = new EventEmitter<{title:string;text:string}>();
  private form = viewChild.required<HTMLFormElement>('form');
  add = output<{ title: string; text: string }>();

  enteredTitle = '';
  enteredText = '';
  ngAfterViewInit(): void {
    console.log('AFTER VIEW INIT');
  }
  //@ViewChild('form') private form?: ElementRef<HTMLFormElement>;

  onSubmit() {
    console.log(this.enteredTitle);
    console.log(this.enteredText);
    this.add.emit({ title: this.enteredTitle, text: this.enteredText });
    this.enteredText = '';
    this.enteredTitle = '';
  }
}
