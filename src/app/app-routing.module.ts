import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './home/user/user.component';
import { OnboardeeComponent } from './home/onboardee/onboardee.component';
import { AddObComponent } from './home/onboardee/add-ob/add-ob.component';
import { EditObComponent } from './home/onboardee/edit-ob/edit-ob.component';
import { LogoutComponent } from './logout/logout.component';
import { LoginService } from './services/login.service';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', children: [
    { path: '', component: HomeComponent, canActivate: [LoginService]},
    { path: 'user', component: UserComponent, canActivate: [LoginService]},
    { path: 'ob', children: [
      { path: '', component: OnboardeeComponent, canActivate: [LoginService]},
      { path: 'add', component: AddObComponent, canActivate: [LoginService]},
      { path: 'edit', component: EditObComponent, canActivate: [LoginService]},
    ]},
  ]},
  { path: 'logout', component: LogoutComponent, canActivate: [LoginService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
