import {
  Component,
  computed,
  EventEmitter,
  Input,
  input,
  output,
  Output,
} from '@angular/core';
import { type User } from './user.model';

function formatImagePath(imageName: string | undefined): string {
  return 'assets/users/' + imageName;
}

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  //@Input({ required: true }) avatar!: string;
  //@Input({ required: true }) name!: string;
  user = input<User>();
  //id = input.required<string>();
  //avatar = input.required<string>();
  //name = input.required<string>();
  imagePath = computed(() => formatImagePath(this.user()?.avatar));
  selected = output<string | undefined>();
  isSelected = input.required<boolean>();
  //@Output() selected = new EventEmitter<string>();
  //get imagePath() {
  //  return 'assets/users/' + this.avatar;
  //}

  onSelectUser() {
    console.log('Clicked!');
    this.selected.emit(this.user()?.id);
  }
}

//selectedUser = signal(DUMMY_USERS[getRandomIndex()]);
//this.selectedUser.set(DUMMY_USERS[getRandomIndex()]);
//imagePath = computed(() => formatImagePath(this.selectedUser().avatar));
// function getRandomIndex():number{
//   return Math.floor(Math.random() * DUMMY_USERS.length);
// }
