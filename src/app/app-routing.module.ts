import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './home/user/user.component';
import { OnboardeeComponent } from './home/onboardee/onboardee.component';
import { AddObComponent } from './home/onboardee/add-ob/add-ob.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', children: [
    { path: '', component: HomeComponent},
    { path: 'user', component: UserComponent},
    { path: 'ob', children: [
      { path: '', component: OnboardeeComponent},
      { path: 'add', component: AddObComponent},
    ]},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
