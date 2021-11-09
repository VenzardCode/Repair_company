import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule, Routes } from '@angular/router';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";


const routes: Routes=[
  {
    path:'',
    redirectTo:'main',
    pathMatch:'full'

  },
  {
    path:'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),

  },
  {
    path:'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterModule),

  },
  {
    path:'main',
    loadChildren: () => import('./main/main.module').then(m => m.MainModule),

  }
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
