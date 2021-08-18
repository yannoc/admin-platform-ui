import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';


@NgModule({
  declarations: [
    UserComponent,
    RoleComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
