import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './home/user/user.component';
import { OnboardeeComponent } from './home/onboardee/onboardee.component';
import { AddObComponent } from './home/onboardee/add-ob/add-ob.component';
import { EditObComponent } from './home/onboardee/edit-ob/edit-ob.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuardService } from './services/auth-guard.service';
import { TrendsComponent } from './home/onboardee/trends/trends.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', children: [
    { path: '', component: HomeComponent, canActivate: [AuthGuardService]},
    { path: 'user', component: UserComponent, canActivate: [AuthGuardService]},
    { path: 'ob', children: [
      { path: '', component: OnboardeeComponent, canActivate: [AuthGuardService]},
      { path: 'add', component: AddObComponent, canActivate: [AuthGuardService]},
      { path: 'edit', component: EditObComponent, canActivate: [AuthGuardService]},
      { path: 'trends', component: TrendsComponent, canActivate: [AuthGuardService]},
    ]},
  ]},
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
