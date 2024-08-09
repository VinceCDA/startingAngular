import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { HeaderComponent } from './app/header/header.component';
import { UserComponent } from './app/user/user.component';
import { SharedModule } from './app/shared/shared.module';
import { TasksModule } from './app/tasks/tasks.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent, UserComponent], //non standalone component
  bootstrap: [AppComponent],
  imports: [BrowserModule, SharedModule, TasksModule], //standalone component and other module
})
export class AppModule {}
