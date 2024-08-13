import { Component, computed, input } from '@angular/core';

import { type User } from './user.model';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  imports: [RouterLink, RouterLinkActive],
  styleUrl: './user.component.css',
})
export class UserComponent {
  user = input.required<User>();

  imagePath = computed(() => 'users/' + this.user().avatar);
}
