import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfileComponent} from "./profile.component";
import {RouterModule,Routes} from "@angular/router";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {AuthGuard} from "../auth/auth.guard";


const routes:Routes=[
  {
    path:'',
    component:ProfileComponent,
    canActivate:[AuthGuard]
  }
]
@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class ProfileModule { }
